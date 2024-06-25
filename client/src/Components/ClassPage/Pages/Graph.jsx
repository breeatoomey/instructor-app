import { useState, useEffect } from 'react'
import ReactFlow from 'reactflow'
import 'reactflow/dist/style.css'

const KnowledgeGraph = () => {
  const [nodes, setNodes] = useState([])
  const [edges, setEdges] = useState([])
  //   const [nodes, setNodes] = useState(initialNodes)
  //   const [edges, setEdges] = useState(initialEdges)
  const [responseCode, setResponseCode] = useState(404)

  const formatNodes = nodes => {
    let xPos = 100
    let yPos = 100
    return nodes.map(node => {
      xPos += 100
      yPos += 50
      const id = node
      //   const type = 'input'
      const data = { label: node }
      const position = { x: xPos, y: yPos }
      return { id, data, position }
    })
  }

  const formatEdges = edges => {
    return edges.map(edge => {
      const id = `e${edge[0]}-${edge[1]}`
      const source = `${edge[0]}`
      const target = `${edge[1]}`
      return { id, source, target, animated: true }
    })
  }

  useEffect(() => {
    const fetchGraph = async () => {
      try {
        const response = await fetch('http://localhost:5000/classes/CS-101/average-graph')
        setResponseCode(response.status)
        const data = await response.json()
        setNodes(formatNodes(data['nodes']))
        setEdges(formatEdges(data['edges']))
        console.log('Success:', data)
      } catch (error) {
        console.error('error', error)
      }
    }
    fetchGraph()
  }, [])

  console.log('NODES')
  console.log(nodes)
  console.log('EDGES')
  console.log(edges)
  if (!nodes || !edges) {
    return <div>Loading...</div>
  }
  return (
    <div id="better-graph" style={{ backgroundColor: 'aquamarine', height: 750, width: 750 }}>
      <h3>React Flow Graph</h3>
      <ReactFlow nodes={nodes} edges={edges} fitView />
    </div>
  )
}

export default KnowledgeGraph
