import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUsers, faBox, faUser } from "@fortawesome/free-solid-svg-icons";
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
        <Link className="flex items-center mb-4" to="/clientes">
          <FontAwesomeIcon icon={faUsers} className="mr-2" />
          <div className="flex-1">Clientes</div>
        </Link>

        {/* Produtos */}
        <Link className="flex items-center mb-4" to="/produtos">
          <FontAwesomeIcon icon={faBox} className="mr-2" />
          <div className="flex-1">Produtos</div>
        </Link>

        {/* Usuarios */}
        <Link className="flex items-center" to="/usuarios">
          <FontAwesomeIcon icon={faUser} className="mr-2" />
          <div className="flex-1">Usuarios</div>
        </Link>
      </div>
    </>
  );
}
