import Menu from "./Menu";
import logo from "../logo_hci.jpg";
import { useEffect } from "react";

export default function Container(props) {
  useEffect(() => {
    // Adicionar o fundo branco ao body
    document.body.style.backgroundColor = "#fff";

    // Limpar o estilo quando o componente desmontar
    return () => {
      document.body.style.backgroundColor = null;
    };
  }, []);
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "flex-start",
        width: "100%",
        minHeight: "100vh",
        padding: "0 20px", // Adicionar padding de 20px nas laterais
        boxSizing: "border-box", // Garantir que o padding seja incluído no tamanho total
        backgroundColor: "white",
      }}
    >
      {/* Menu */}
      <div style={{ width: "20%", marginTop: "10px", textAlign: "left" }}>
        <Menu />
      </div>

      {/* Conteúdo principal */}
      <div
        style={{
          flex: 1,
          margin: "10px 20px",
          textAlign: "center",
          fontFamily: "Arial Black",
          width: "90%",
        }}
      >
        <div style={{ height: "100px" }}></div>
        <div className="flex-1" style={{ color: "black" }}>
          Gestão de Orçamentos
        </div>

        <div className="mt-10">{props.children}</div>
      </div>

      {/* Logo */}
      <div style={{ width: "20%", textAlign: "right", marginTop: "10px" }}>
        <img
          src={logo}
          alt="logo"
          style={{ width: "auto", height: "100px", objectFit: "contain" }}
        />
      </div>
    </div>
  );
}
