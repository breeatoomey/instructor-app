import { TextField, Stack } from '@mui/material'
import { useState, useEffect } from 'react'
import KnowledgeGraph from './Graph'

const EditKnowledgeGraph = () => {
  const [input, setInput] = useState(
    '== Level 1 ==\nTypes --> Variables\nExpressions --> Conditionals\nScope --> Lists\n== Level 2 ==\nVariables --> Iteration\nConditionals --> Iteration\nLists --> Random Access\n== Level 3 ==\nIteration\nRandom Access\n'
  )
  const [nodesFromInput, setNodesFromInput] = useState([])
  const [edgesFromInput, setEdgesFromInput] = useState([])

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
   * @returns {Array<Array<string>>} - An array of arrays, where each sub-array contains the nodes at each level.
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
          console.log('Success:', result)
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

  const parsedNodes = getNodesAtEachLevel(input).map(level => Array.from(new Set(level)))
  console.log('NODES TO DISPLAY')
  console.log(parsedNodes)

  return (
    <div className="editKnowledgeGraph">
      <h1> Edit Knowledge Graph </h1>
      <Stack direction="row" justifyContent="center" spacing={10}>
        {/* add Info icon for user input */}
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
        <KnowledgeGraph nodesInLevels={parsedNodes ? parsedNodes : ''} />
      </Stack>
    </div>
  )
}

export default EditKnowledgeGraph
