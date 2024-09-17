import React from "react";
import ReactModal from "react-modal";
import NomeTela from "../telas/NomeTela";

export default function ModalEdicao({
  titulo = "Titulo",
  isOpenEdicao = false,
  children,
}) {
  return (
    <div>
      <ReactModal
        ariaHideApp={false}
        isOpen={isOpenEdicao}
        style={{
          overlay: {
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "silver",
          },
          content: {
            position: "absolute",
            top: "10px",
            left: "10px",
            right: "10px",
            bottom: "10px",
            border: "2px solid #ccc",
            background: "#fff",
            overflow: "auto",
            WebkitOverflowScrolling: "touch",
            borderRadius: "4px",
            outline: "none",
          },
        }}
      >
        <NomeTela>{titulo}</NomeTela>
        {children}
      </ReactModal>
    </div>
  );
}
