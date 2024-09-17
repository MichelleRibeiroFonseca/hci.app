import ReactModal from "react-modal";
import Button from "../controles/Button";
import { useState } from "react";

export default function Mensagem({
  mensagem,
  closeFunction,
  openModal,
  textButton = "",
  onClickTextButton = null,
}) {
  const [isOpen, seIsOpen] = useState(openModal);

  const handleCloseModal = () => {
    seIsOpen(false);
    if (closeFunction) closeFunction();
  };

  const handleTextButton = () => {
    if (onClickTextButton) onClickTextButton();
  };

  return (
    <ReactModal
      isOpen={isOpen}
      contentLabel={mensagem}
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
          bottom: "auto",
          border: "2px solid #ccc",
          background: "#fff",
          overflow: "auto",
          WebkitOverflowScrolling: "touch",
          borderRadius: "4px",
          outline: "none",
        },
      }}
      ariaHideApp={
        true
        /* Boolean indicating if the appElement should be hidden */
      }
    >
      <div>
        <h1 className=" h-12 text-center  text-2xl border-b-4">Mensagem</h1>
      </div>
      <div className="mt-5 font-bold">{mensagem}</div>
      <div className="flex bottom-6 mt-10 border-t-4">
        <p className="flex-1"></p>
        {textButton && (
          <Button onButtonClick={handleTextButton}>{textButton}</Button>
        )}
        <Button onButtonClick={handleCloseModal}>Fechar</Button>
      </div>
      {/* <button onClick={this.handleCloseModal}>Close Modal</button> */}
    </ReactModal>
  );
}
