import { Box, Paper, TextField } from '@mui/material'
import { useState, useEffect } from 'react'

const EditKnowledgeGraph = () => {
  const [input, setInput] = useState('== Level 1 ==\nA --> B\nA --> C\n== Level 2 ==\nB --> C')
  const [nodes, setNodes] = useState([])
  const [edges, setEdges] = useState([])

  const submitForm = event => {
    event.preventDefault()
    console.log(input)
    const nodesFromInput = new Set()
    const edgesFromInput = new Set()
    // parsing input
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
          nodesFromInput.add(edge[1])
          edgesFromInput.add(edge)
        }
      })
    console.log('nodesFromInput', nodesFromInput)
    console.log('edgesFromInput', edgesFromInput)
    setNodes(Array.from(nodesFromInput))
    setEdges(Array.from(edgesFromInput))
    console.log('nodes', nodes)
    console.log('edges', edges)
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

  console.log('nodes', nodes)
  console.log('edges', edges)
  return (
    <div className="editKnowledgeGraph">
      <h1> Edit Knowledge Graph </h1>
      <form onSubmit={submitForm}>
        <TextField
          label="Overview"
          value={input}
          onChange={event => setInput(event.target.value)}
          multiline
          rows={8}
        />
        <input type="submit" value="Update" />
      </form>
      <div id="graph">graph goes here</div>
    </div>
  )
}

export default EditKnowledgeGraph
