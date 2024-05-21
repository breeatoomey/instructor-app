// import logo from './logo.svg';
import axios from 'axios';
import './App.css';

//data will be the string we send from our server
const apiCall = () => {
  axios.get('https://backend-58xtxw1gn-breea-toomeys-projects.vercel.app').then((data) => {
    //this console.log will be in our frontend console
    console.log(data)
  })
}

function App() {
  return (
    <div className="App">
      <header className="App-header">

        <p>Test Deployment 2</p>

      </header>
    </div>
  );
}

export default App;
