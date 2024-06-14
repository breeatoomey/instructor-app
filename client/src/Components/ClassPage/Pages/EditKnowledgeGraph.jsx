import TextField from '@mui/material/TextField'
import { useState } from 'react'
import { useEffect } from 'react'

const EditKnowledgeGraph = () => {
  const [input, setInput] = useState('== Level 1 ==\nA --> B\nA --> C\n== Level 2 ==\nB --> C')
  const [nodes, setNodes] = useState([])
  const [edges, setEdges] = useState([])

  const parseInput = input => {
    const nodesFromInput = new Set()
    const edgesFromInput = new Set()
    input.forEach(line => {
      if (!line.includes('==')) {
        const edge = line.split(' --> ')
        nodesFromInput.add(edge[0])
        nodesFromInput.add(edge[1])
        edgesFromInput.add(edge)
      }
    })
    setNodes(Array.from(nodesFromInput))
    setEdges(Array.from(edgesFromInput))
    console.log('nodesFromInput', nodesFromInput)
    console.log('edgesFromInput', edgesFromInput)
  }

  const submitForm = event => {
    event.preventDefault()
    console.log(input)
    const lines = input.split('\n').filter(line => line !== '')
    console.log('lines', lines)
    parseInput(lines)
    /**
     * call api here to update the knowledge graph
     * just hardcode the class name/id for now
     * after api call:
     * reset relevant states
     * construct the graph if one if not already constructed
     * if constructed, update the graph
     */
  }

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
    </div>
  )
}

export default EditKnowledgeGraph
