import React from "react";
import { Link } from "react-router-dom";

export default function Menu() {
  return (
    <>
      <div
        style={{
          color: "black",
          fontFamily: "Arial Black",
          fontSize: "18px",
          // backgroundColor: "lightgray",
          padding: "10px",
        }}
      >
        <Link className="flex" to="/clientes">
          <div className="flex-1">Clientes</div>
        </Link>
        <div>
          <p></p>
        </div>
        <Link className="flex" to="/produtos">
          <div className="flex-1">Produtos</div>
        </Link>
        <Link className="flex" to="/usuarios">
          <div className="flex-1">Usuarios</div>
        </Link>
      </div>
    </>
  );
}
