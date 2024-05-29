import { Routes, Route } from "react-router-dom";
import Login from "./Components/Login/Login.js";
import Dashboard from "./Components/DashBoard/Dashboard.js";
import Home from "./Components/DashBoard/DashboardComponents/Home.tsx";
// import StudentPerformance from "./Components/Dashboard/DashboardComponents/StudentPerformance.js";
// import Setting from "./Components/Dashboard/DashboardComponents/Setting.js";
import Navbar from "./Components/DashBoard/Navbar.js";
import React from "react";

const items = [
  {
    id: "cmsi-1010",
    title: "CMSI 1010 - 02",
    backgroundImage: "class1.jpg",
  },
  {
    id: "cmsi-2120",
    title: "CMSI 2120 - 01",
    backgroundImage: "class2.jpg",
  },
  {
    id: "cmsi-3801",
    title: "CMSI 3801 - 01",
    backgroundImage: "class3.jpg",
  },
];
const handleSelectItem = (item: { id: string; title: string; backgroundImage: string }) => {
  console.log(item);
};
//const items = [];

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/Dashboard" element={<Dashboard />}></Route>
        {/* <Route path="/home" element={<Home />}></Route> */}
        <Route path="/Home" element={<Home items={items} heading="My Classes" onSelectItem={handleSelectItem} />} />
        {/* <Route path="/StudentPerformance" element={<StudentPerformance />}></Route>
        <Route path="/Setting" element={<Setting />}></Route> */}
      </Routes>
    </div>
  );
}

export default App;
