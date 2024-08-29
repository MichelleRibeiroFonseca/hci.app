import logo from "./logo_hci.jpg";
import "./App.css";
import Login from "./Login";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        {/* <h1>Bem-vindo ao Meu App</h1> */}
        <Login />
      </header>
    </div>
  );
}

export default App;
