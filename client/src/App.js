import axios from "axios";
import "./App.css";

function App() {
  const apiCall = () => {
    axios.get("https://server-ivory-pi.vercel.app/").then((data) => {
      console.log(data);
    });
  };

  return (
    <div className="App">
      <header className="App-header">
        <button onClick={apiCall}>Make API Call</button>
        <p>Deployment Test 2</p>
      </header>
    </div>
  );
}

export default App;
