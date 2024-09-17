import React, { useState } from "react";
import logo from "./logo_hci.jpg";
function Login({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

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
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password">Senha:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;
