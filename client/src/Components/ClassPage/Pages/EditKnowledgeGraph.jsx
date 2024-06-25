import { TextField, Stack } from '@mui/material'
import { useState, useEffect } from 'react'

const EditKnowledgeGraph = () => {
  const [input, setInput] = useState(
    '== Level 1 ==\nTypes --> Variables\nExpressions --> Conditionals\nA --> B\n== Level 2 ==\nVariables --> Iteration\nConditionals --> Iteration\nB --> C\n== Level 3 ==\nIteration\nC'
  )
  const [nodes, setNodes] = useState([])
  const [edges, setEdges] = useState([])

  /**
   * Parses the user's input and returns an array of arrays, where each sub-array represents a level in the graph.
   * Each element in a sub-array is a parent node of the elements in the subsequent sub-arrays.
   * [EXAMPLE INPUT]:
   *    ==Level 1==
   *    A --> B
   *    C --> D
   *    ==Level 2==
   *    B --> E
   *    D --> F
   *   ==Level 3==
   *    E
   *    F
   *
   * [EXAMPLE RESULT]:
   *   [[A, C], [B, D], [E, F]]
   *
   */
  const getNodesAtEachLevel = input => {
    const regex = /==\s*Level\s*\d+\s*==/
    return input
      .split(regex)
      .map(line => line.trim().split('\n'))
      .filter(arr => !arr.includes(''))
      .map(arr => arr.map(line => line.split(' --> ')))
      .map(level => level.map((nodes, index, level) => level[index][0]))
  }

  const parseInput = input => {
    const nodesFromInput = new Set()
    const edgesFromInput = new Set()
    input
      .split('\n')
      .filter(line => line !== '' && line !== ' ')
      .forEach(line => {
        if (!line.includes('==')) {
          const edge = line
            .trim()
            .split(' --> ')
            .filter(edge => edge !== ' ')
          nodesFromInput.add(edge[0])
          if (edge[1] !== undefined) {
            nodesFromInput.add(edge[1])
            edgesFromInput.add(edge)
          }
        }
      })
    return [nodesFromInput, edgesFromInput]
  }
  const submitForm = event => {
    event.preventDefault()
    const [nodesFromInput, edgesFromInput] = parseInput(input)
    setNodes(Array.from(nodesFromInput))
    setEdges(Array.from(edgesFromInput))
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
              nodes: nodes,
              edges: edges,
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
    updateAndPostGraph(nodes, edges)
    // resetting states
    if (nodes.length > 0 && edges.length > 0) {
      setNodes([])
      setEdges([])
    }
  }, [nodes, edges])

  const nodesToDisplay = getNodesAtEachLevel(input).map(level => Array.from(new Set(level)))

  // console.log(nodesToDisplay)

  return (
    <div className="editKnowledgeGraph">
      <h1> Edit Knowledge Graph </h1>
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
      <div id="graph">
        <Stack alignItems="center" spacing={2}>
          {nodesToDisplay.map((level, index) => {
            return (
              <Stack direction="row" id={`Level ${index + 1}`} spacing={8} key={index}>
                {level.map((node, index) => (
                  <div id={`${node}`} key={index}>
                    {node}
                  </div>
                ))}
              </Stack>
            )
          })}
        </Stack>
      </div>
    </div>
  )
}

export default EditKnowledgeGraph
