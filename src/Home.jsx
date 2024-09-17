import React from "react";
import Menu from "./components/Menu";
import "./css/Home.css";

function Home() {
  return (
    <div className="home-container">
      <Menu />
      <div className="main-content">
        <h3>GESTÃO DE PROJETOS</h3>
      </div>
      <div className="right-section">
        <img src="logo_hci.jpg" alt="Logo" className="logo" />
      </div>
    </div>
  );
}

export default Home;
