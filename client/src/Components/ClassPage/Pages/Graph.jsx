import { useState, useEffect } from 'react'
import ReactFlow from 'reactflow'
import 'reactflow/dist/style.css'

const KnowledgeGraph = ({ nodesInLevels }) => {
  const [nodes, setNodes] = useState([])
  const [edges, setEdges] = useState([])
  // const [formattedNodes, setFormattedNodes] = useState([])
  const [responseCode, setResponseCode] = useState(404)

  // console.log('nodesInLevels')
  // console.log(nodesInLevels)
  const initialPostions = () => {
    let y = -25
    return nodesInLevels.map(() => {
      const x = 100
      y += 100
      return { x, y }
    })
  }

  const formatNodes = nodes => {
    let initialLevelPositions = initialPostions()
    return nodesInLevels.flatMap((level, levelIndex) =>
      level.map((node, index) => {
        // at root level
        if (levelIndex === 0) {
          const id = node
          const type = 'input'
          const data = { label: node }
          initialLevelPositions[levelIndex].x += (initialLevelPositions[levelIndex].x % 2) + 200
          const position = {
            x: initialLevelPositions[levelIndex].x,
            y: initialLevelPositions[levelIndex].y,
          }
          return { id, type, data, position }
        }
        // at last level
        if (levelIndex === nodesInLevels.length - 1) {
          const id = node
          const type = 'output'
          const data = { label: node }
          initialLevelPositions[levelIndex].x += (initialLevelPositions[levelIndex].x % 2) + 200
          const position = {
            x: initialLevelPositions[levelIndex].x,
            y: initialLevelPositions[levelIndex].y,
          }
          return { id, type, data, position }
        }
        // at other levels
        const id = node
        const data = { label: node }
        initialLevelPositions[levelIndex].x += (initialLevelPositions[levelIndex].x % 2) + 200
        const position = {
          x: initialLevelPositions[levelIndex].x,
          y: initialLevelPositions[levelIndex].y,
        }
        return { id, data, position }
      })
    )
  }

  const formatEdges = edges => {
    if (edges) {
      return edges.map(edge => {
        const id = `e${edge[0]}-${edge[1]}`
        const source = `${edge[0]}`
        const target = `${edge[1]}`
        return { id, source, target, animated: true }
      })
    }
  }

  useEffect(() => {
    const fetchGraph = async () => {
      try {
        const response = await fetch('http://localhost:5000/classes/CS-101/average-graph') // hardcoding class name for now
        setResponseCode(response.status)
        const data = await response.json()
        setNodes(formatNodes(data['nodes']))
        setEdges(formatEdges(data['edges']))
        // console.log('Success:', data)
      } catch (error) {
        console.error('error', error)
      }
    }
    fetchGraph()
  }, [nodesInLevels])

  // console.log('nodes')
  // console.log(nodes)
  if (nodes.length === 0 || edges.length === 0) {
    return <h1>Loading...</h1>
  }
  return (
    <div id="knowledge-graph" style={{ backgroundColor: '#EAECE9', height: 700, width: 800 }}>
      {responseCode === 404 ? (
        <h1 id="error">Graph not found</h1>
      ) : (
        <>
          {/* <h2>Class Graph</h2> */}
          <ReactFlow nodes={nodes} edges={edges} fitView />
        </>
      )}
    </div>
  )
}

export default KnowledgeGraph
