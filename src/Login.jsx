import React, { useState } from "react";
import logo from "./logo_hci.jpg";
import TextInput from "./components/controles/TextInput";
function Login({ onLogin }) {
  const [username, setUsername] = useState("admin");
  const [password, setPassword] = useState("123");

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Username:", username);
    console.log("Password:", password);
    if (username === "admin" && password === "123") {
      onLogin();
    } else {
      alert("Login inválido");
    }
  };

  return (
    <div className="login-container">
      <img src={logo} className="App-logo" alt="logo" />
      <p></p>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Login:</label>
          <TextInput
            // type="text"
            // id="username"
            // value={username}
            // onChange={(e) => setUsername(e.target.value)}
            labelDescription="Login"
            inputValue={username}
            autoFocus
            onInputChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password">Senha:</label>
          <TextInput
            // type="password"
            // id="password"
            // value={password}
            // onChange={(e) => setPassword(e.target.value)}
            labelDescription="Senha"
            inputValue={password}
            autoFocus
            onInputChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;
