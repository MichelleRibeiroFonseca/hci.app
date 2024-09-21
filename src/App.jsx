import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import logo from "./logo_hci.jpg";
import "./App.css";
import Login from "./Login";
import Home from "./Home";
import ClientesPage from "./page/ClientesPage";
import ProdutosPage from "./page/ProdutosPage";
import UsuariosPage from "./page/UsuariosPage";
import MainPage from "./page/MainPage";
import Menu from "./components/Menu";
function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };
  const handleLogout = () => {
    setIsAuthenticated(false);
  };
  return (
    <div className="App">
      <header className="App-header">
        {}

        {isAuthenticated ? (
          <BrowserRouter>
            <Routes>
              {/* <Route path="/" Component={Menu}></Route> */}
              <Route
                path="/"
                element={<MainPage handleLogout={handleLogout} />}
              />
              <Route
                path="/clientes"
                element={<ClientesPage handleLogout={handleLogout} />}
              />
              <Route
                path="/produtos"
                element={<ProdutosPage handleLogout={handleLogout} />}
              />
              <Route
                path="/usuarios"
                element={<UsuariosPage handleLogout={handleLogout} />}
              />
            </Routes>
          </BrowserRouter>
        ) : (
          <Login onLogin={handleLogin} />
        )}
      </header>
    </div>
  );
}

export default App;
