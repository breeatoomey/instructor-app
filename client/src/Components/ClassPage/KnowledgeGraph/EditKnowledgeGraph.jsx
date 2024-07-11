import { TextField, Stack, IconButton, Box } from '@mui/material'
import { Card, CardContent, Tooltip } from '@mui/material'
import HelpIcon from '@mui/icons-material/Help'
import { useState, useEffect } from 'react'
import KnowledgeGraph from './Graph'
import SideMenu from '../SideMenu/SideMenu'

const EditKnowledgeGraph = () => {
  const [input, setInput] = useState(
    '== Level 1 ==\nTypes --> Variables\nExpressions --> Conditionals\nScope --> Lists\n== Level 2 ==\nVariables --> Iteration\nConditionals --> Iteration\nLists --> Random Access\n== Level 3 ==\nIteration\nRandom Access\n'
  )
  const [nodesFromInput, setNodesFromInput] = useState([])
  const [edgesFromInput, setEdgesFromInput] = useState([])
  const [parsedNodes, setParsedNodes] = useState([[]])
  const [isHelpOpen, setIsHelpOpen] = useState(false)

  /**
   * Parses the user's input and returns an array of arrays, where each sub-array represents a level in the graph.
   * Each element in a sub-array is a parent node of the elements in the subsequent sub-arrays.
   *
   * Example Input:
   *    ==Level 1==
   *    A --> B
   *    C --> D
   *    ==Level 2==
   *    B --> E
   *    D --> F
   *    ==Level 3==
   *    E
   *    F
   *
   * Example Result:
   *   [[A, C], [B, D], [E, F]]
   *
   * @param {string} input - The user's input string representing the levels and nodes.
   * @returns {Array<Array<string>>} - An array of arrays, where each sub-array represents a level and contains the nodes within.
   */
  const getNodesAtEachLevel = input => {
    const regex = /==\s*Level\s*\d+\s*==/
    return input
      .split(regex)
      .map(line => line.trim().split('\n'))
      .filter(arr => arr.length && !arr.includes(''))
      .map(arr => arr.map(line => line.split(' --> ')))
      .map(level => level.map((nodes, index, level) => level[index][0]))
  }

  const parseInput = input => {
    const nodes = new Set()
    const edges = new Set()
    input
      .split('\n')
      .filter(line => line !== '' && line !== ' ')
      .forEach(line => {
        if (!line.includes('==')) {
          const edge = line
            .trim()
            .split(' --> ')
            .filter(edge => edge !== ' ')
          nodes.add(edge[0])
          if (edge[1] !== undefined) {
            nodes.add(edge[1])
            edges.add(edge)
          }
        }
      })
    return [nodes, edges]
  }

  const submitForm = event => {
    event.preventDefault()
    const [nodes, edges] = parseInput(input)
    setNodesFromInput(Array.from(nodes))
    setEdgesFromInput(Array.from(edges))
    setParsedNodes(getNodesAtEachLevel(input).map(level => Array.from(new Set(level))))
  }

  // posting graph to knowledge graph datastore
  useEffect(() => {
    const updateAndPostGraph = async (nodes, edges) => {
      if (nodes.length > 0 && edges.length > 0) {
        try {
          const response = await fetch('http://localhost:5000/store-kg', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              nodes: nodesFromInput,
              edges: edgesFromInput,
              class_name: 'CS-101',
              graph_name: 'class_avg_kg',
            }),
          })
          const result = await response.json()
          // console.log('Success:', result)
        } catch (error) {
          console.error('error', error)
        }
      }
    }
    updateAndPostGraph(nodesFromInput, edgesFromInput)

    // resetting states
    if (nodesFromInput.length > 0 && edgesFromInput.length > 0) {
      setNodesFromInput([])
      setEdgesFromInput([])
    }
  }, [nodesFromInput, edgesFromInput])

  const helperCard = (
    <Box
      id="help-container"
      sx={{
        display: 'flex',
        justifyContent: 'flex-start',
        '& > :not(style)': {
          m: 0,
          // padding: 1,
          width: '40ch',
        },
      }}
    >
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <IconButton onClick={() => setIsHelpOpen(!isHelpOpen)}>X</IconButton>
          <h2>How to Input Your Knowledge Graph</h2>
        </Box>

        <h3>Input Format:</h3>
        <ol>
          <li>Levels: Indicate each level using '== Level X ==', where X is the level number.</li>
          <li>
            {`Nodes and Relationships: Specify relationships between nodes using '-->'
                      symbol.`}
          </li>
        </ol>
        <h3>Steps to Input Your Knowledge Graph</h3>
        <ol>
          <li>Start with Level 1: List nodes and their relationships within each level.</li>
          <li>
            Continue with Subsequent Levels: Define nodes and their relationships for each
            subsequent level.
          </li>
          <li>Ensure there are no cycles within your knowledge graph</li>
        </ol>
      </CardContent>
    </Box>
  )

  return (
    <Box
      id="edit-knowledge-graph-container"
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '90vh',
      }}
    >
      <SideMenu page="Knowledge Graph" />
      <Box
        id="user-input"
        sx={{
          display: 'flex',
          justifyContent: 'flex-start',
          alignItems: 'flex-start',
          padding: 2,
        }}
      >
        {isHelpOpen ? (
          <Card variant="outlined" sx={{ backgroundColor: '#EAECE9' }}>
            {helperCard}
          </Card>
        ) : (
          <Tooltip title="Help" arrow>
            <IconButton onClick={() => setIsHelpOpen(!isHelpOpen)}>
              <HelpIcon id="help-button" color="info" />
            </IconButton>
          </Tooltip>
        )}
        <form id="graph-input" onSubmit={submitForm}>
          <TextField
            label="Knowledge Graph"
            value={input}
            onChange={event => setInput(event.target.value)}
            multiline
            rows={8}
          />
          <input type="submit" value="Update" />
        </form>
      </Box>
      <Box
        id="knowledge-graph"
        sx={{
          display: 'flex',
          justifyContent: 'center',
          padding: 2,
        }}
      >
        <KnowledgeGraph nodesInLevels={parsedNodes ? parsedNodes : ''} />
      </Box>
    </Box>
  )
}

export default EditKnowledgeGraph
