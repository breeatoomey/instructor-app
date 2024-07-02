import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Login from './Components/Login/Login.js'
import Dashboard from './Components/DashBoard/Dashboard.js'
import Home from './Components/DashBoard/DashboardComponents/Home.tsx'
import StudentPerformance from './Components/DashBoard/DashboardComponents/StudentPerformance.js'
import Setting from './Components/DashBoard/DashboardComponents/Setting.js'
// import Navbar from './Components/DashBoard/Navbar.jsx'
import React from 'react'
// import Sidebar from './Components/ClassPage/Sidebar.jsx'
import Lessons from './Components/ClassPage/Pages/Lessons.jsx'
import AddLessons from './Components/ClassPage/Pages/AddLessons.jsx'
import EditKnowledgeGraph from './Components/ClassPage/Pages/EditKnowledgeGraph.jsx'
import Roster from './Components/ClassPage/Pages/roster.jsx'
import ClassroomSettings from './Components/ClassPage/Pages/ClassroomSettings.jsx'

// stuff using MUI
import Navbar from './Components/NewNavbar.jsx'
import SideMenu from './Components/ClassPage/SideMenu/SideMenu.jsx'

const items = [
  {
    id: 'cmsi-1010',
    title: 'CMSI 1010 - 02',
    backgroundImage: 'class1.jpg',
  },
  {
    id: 'cmsi-2120',
    title: 'CMSI 2120 - 01',
    backgroundImage: 'class2.jpg',
  },
  {
    id: 'cmsi-3801',
    title: 'CMSI 3801 - 01',
    backgroundImage: 'class3.jpg',
  },
]
const handleSelectItem = (item: { id: string; title: string; backgroundImage: string }) => {
  console.log(item)
}
//const items = [];

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <SideMenu />
        <Routes>
          {/* <Route path="/" element={<Dashboard />}></Route> */}
          <Route path="/" element={<Login />} />
          <Route
            path="/home"
            element={<Home items={items} heading="My Classes" onSelectItem={handleSelectItem} />}
          />
          <Route path="/class-performance" element={<StudentPerformance />}></Route>
          <Route path="/setting" element={<Setting />}></Route>
          <Route path="/lessons" element={<Lessons />}></Route>
          <Route path="/addLessons" element={<AddLessons />}></Route>
          <Route path="/knowledge-graph" element={<EditKnowledgeGraph />}></Route>
          <Route path="/roster" element={<Roster />}></Route>
          <Route path="/class-settings" element={<ClassroomSettings />}></Route>
        </Routes>
      </Router>
    </div>
  )
}

export default App
