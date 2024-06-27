import { useState, useEffect } from 'react'
import ReactFlow from 'reactflow'
import 'reactflow/dist/style.css'

const KnowledgeGraph = ({ nodesInLevels }) => {
  const [nodes, setNodes] = useState([])
  const [edges, setEdges] = useState([])
  const [responseCode, setResponseCode] = useState(404)

  const formatNodes = nodes => {
    // FIXME: hardcoding positions for now
    let xPosLevel1 = 100
    let yPosLevel1 = 25
    let xPosLevel2 = 100
    let yPosLevel2 = 100
    let xPosLevel3 = 100
    let yPosLevel3 = 175

    return nodesInLevels.flatMap((level, levelIndex) =>
      level.map((node, index) => {
        // at root level
        if (levelIndex === 0) {
          xPosLevel1 += (xPosLevel1 % 2) + 200
          const id = node
          const type = 'input'
          const data = { label: node }
          const position = { x: xPosLevel1, y: yPosLevel1 }
          return { id, type, data, position }
        }
        // at last level
        if (levelIndex === nodesInLevels.length - 1) {
          xPosLevel3 += (xPosLevel3 % 2) + 200
          const id = node
          const type = 'output'
          const data = { label: node }
          const position = { x: xPosLevel3, y: yPosLevel3 + 250 }
          return { id, type, data, position }
        }
        // at other levels
        xPosLevel2 += (xPosLevel2 % 2) + 200
        const id = node
        const data = { label: node }
        const position = { x: xPosLevel2, y: yPosLevel2 + 125 }
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
        console.log('Success:', data)
      } catch (error) {
        console.error('error', error)
      }
    }
    fetchGraph()
  }, [])

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
