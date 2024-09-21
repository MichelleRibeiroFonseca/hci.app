import React, { useState } from "react";
import logo from "./logo_hci.jpg";
import TextInput from "./components/controles/TextInput";
import Button from "./components/controles/Button";
import { useUsuario } from "./hook/useUsuario";

function Login({ onLogin }) {
  const { getUsuarios } = useUsuario();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [erroGeral, setErroGeral] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [isUsernameFocused, setIsUsernameFocused] = useState(false);
  const handleSubmit = async (event) => {
    debugger;
    event.preventDefault();
    console.log("Username:", username);
    console.log("Password:", password);
    if (username === "admin" && password === "123") {
      onLogin();
    } else {
      await validarLogin(); // Chamando a função validar login no caso de erro
    }
  };

  async function validarLogin() {
    const data = {
      nome_usuario: username,
      senha: password,
    };
    setErroGeral("");
    try {
      setIsProcessing(true);
      const listaClientesFiltro = await getUsuarios(data);
      if (listaClientesFiltro.length === 0) {
        setErroGeral("Nenhum usuário encontrado.");
      } else {
        onLogin();
      }
    } catch (erro) {
      setIsProcessing(false);
      setErroGeral(erro.message);
    }
  }

  return (
    <div className="login-container center">
      <img src={logo} className="App-logo" alt="logo" />
      <p></p>
      <form onSubmit={handleSubmit}>
        {/* <div>
          <TextInput
            labelDescription="Login"
            inputValue={username}
            autoFocus
            onInputChange={(valor) => setUsername(valor)}
            className="text-sm md:text-lg"
          />
        </div>
        <div>
          <TextInput
            labelDescription="Senha"
            inputValue={password}
            autoFocus
            onInputChange={(valor) => setPassword(valor)}
            className="text-black"
            disabled={false}
            allowNull={false}
            style={{
              backgroundColor: isUsernameFocused ? "black" : "black",
              color: isUsernameFocused ? "black" : "black", // Ajustando a cor do texto ao focar
              padding: "10px",
              borderRadius: "5px",
              backgroundColor: "black",
            }}
          />
        </div> */}
        <div>
          <label htmlFor="username">Login</label>
        </div>
        <div>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            autoFocus
            className="text-black"
            style={{
              backgroundColor: isUsernameFocused ? "black" : "white",
              color: isUsernameFocused ? "white" : "black",
              padding: "10px",
              borderRadius: "5px",
            }}
          />
        </div>
        <div>
          <label htmlFor="password">Senha</label>
        </div>
        <div>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoFocus
            className="text-black"
            style={{
              backgroundColor: isUsernameFocused ? "black" : "white",
              color: isUsernameFocused ? "white" : "black",
              padding: "10px",
              borderRadius: "5px",
            }}
            required
          />
        </div>
        {/* <button type="submit">Entrar</button> */}
        <Button colorClass="bg-green-700 w-32" type="submit">
          Entrar
        </Button>
      </form>
    </div>
  );
}

export default Login;
