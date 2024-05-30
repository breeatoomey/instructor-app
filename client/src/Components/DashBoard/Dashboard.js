// import Navbar from "./Navbar";

// import Student_Performance from "./dashboard_pages/Student_Performance";
// import Setting from "./dashboard_pages/Setting";
// import Home from "./dashboard_pages/Home";
// import "./Dashboard.css";
// let items = ["CMSI-1010", "CMSI-2120", "CMSI-3801"];
let items = [];
// const getMessage = () => {
// could use function for different messages respective to different events.
// }
const message = items.length === 0 ? <p> No Item Found</p> : null;

function Dashboard() {
  return (
    <>
      <h1>Dashboard</h1>
      {message}
      <ul className="container">
        {items.map((item) => (
          <li key={item}>{item}</li> // API use item.id for key = '', but otherwise Item
        ))}
      </ul>
    </>
  );
}

export default Dashboard;
