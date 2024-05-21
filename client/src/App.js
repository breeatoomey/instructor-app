import axios from "axios";
import "./App.css";

function App() {
  const apiCall = () => {
    axios.get("http://localhost:3000").then((data) => {
      console.log(data);
    });
  };

  return (
    <div className="App">
      <header className="App-header">
        <button onClick={apiCall}>Make API Call</button>
      </header>
    </div>
  );
}

export default App;
