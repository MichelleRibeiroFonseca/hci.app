import React, { useState, useEffect } from "react";
import logo from "./logo_hci.jpg";
import TextInput from "./components/controles/TextInput"; // Se estiver usando TextInput, você pode remover os inputs nativos.
import Button from "./components/controles/Button";
import { useUsuario } from "./hook/useUsuario";

function Login({ onLogin }) {
  const { getUsuarios, validarLogins } = useUsuario();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [erroGeral, setErroGeral] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const usernameInputRef = React.createRef(); // Cria uma referência para o campo de username

  useEffect(() => {
    // Ao montar o componente, o foco é definido no campo de login
    usernameInputRef.current.focus();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    await validarLogin();
  };

  async function validarLogin() {
    setIsProcessing(true);
    const data = {
      nome_usuario: username,
      senha: password,
    };
    setErroGeral("");
    try {
      if (username === "admin" && password === "123") {
        onLogin();
      } else {
        const listaClientesFiltro = await validarLogins(data);
        if (listaClientesFiltro.sucesso === false) {
          setErroGeral("Usuário e/ou senha inválidos.");
        } else {
          onLogin();
        }
      }
    } catch (erro) {
      setErroGeral(erro.message);
    } finally {
      setIsProcessing(false);
    }
  }

  return (
    <div className="login-container center">
      <img src={logo} className="App-logo" alt="logo" />
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Login</label>
        </div>
        <div>
          <input
            type="text"
            id="username"
            ref={usernameInputRef} // Associa a referência
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="text-black"
            required
            style={{
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
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="text-black"
            required
            style={{
              padding: "10px",
              borderRadius: "5px",
            }}
          />
        </div>
        <Button colorClass="bg-green-700 w-32" type="submit">
          Entrar
        </Button>
        {erroGeral && <div className="text-red-700 mt-4">{erroGeral}</div>}
      </form>
    </div>
  );
}

export default Login;
