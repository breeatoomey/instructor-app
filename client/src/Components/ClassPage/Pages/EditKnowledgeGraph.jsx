import { TextField } from '@mui/material'
import { useState, useEffect } from 'react'

const EditKnowledgeGraph = () => {
  const [input, setInput] = useState(
    '== Level 1 ==\nTypes --> Variables\nExpressions --> Conditionals\n== Level 2 ==\nVariables --> Iteration\nConditionals --> Iteration\n== Level 3 ==\nIteration'
  )
  const [nodes, setNodes] = useState([])
  const [edges, setEdges] = useState([])

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
          console.log('edge')
          console.log(edge)
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
    console.log(nodesFromInput)
    console.log(edgesFromInput)
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

  const regex = /==\s*Level\s*\d+\s*==/
  const nodesAtEachLevel = input
    .split(regex)
    .map(line => line.trim().split('\n'))
    .filter(arr => !arr.includes(''))
    .map(arr => arr.map(line => line.split(' --> ')))
    .map(arr => {
      const [firstInnerArr, secondInnerArr] = arr
      const firstNode = firstInnerArr[0]
      const secondNode = secondInnerArr ? secondInnerArr[0] : null
      return [firstNode, secondNode]
    })

  console.log(nodesAtEachLevel)
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
        <h1>testing displaying nodes first</h1>
        {nodesAtEachLevel.map((nodes, index) => (
          <div key={index}>
            {nodes[0]} {nodes[1]}
          </div>
        ))}
      </div>
    </div>
  )
}

export default EditKnowledgeGraph
