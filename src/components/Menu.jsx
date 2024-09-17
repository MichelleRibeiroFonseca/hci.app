import React from "react";
import { Link } from "react-router-dom";

export default function Menu() {
  return (
    <>
      <Link className="menu" to="/clientes">
        <div className="flex-1">Clientes</div>
      </Link>
      <Link className="menu" to="/produtos">
        <div className="flex-1">Produtos</div>
      </Link>
      <Link className="menu" to="/usuarios">
        <div className="flex-1">Usuarios</div>
      </Link>
    </>
  );
}
