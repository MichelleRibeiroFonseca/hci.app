import React, { useEffect, useState } from "react";

export default function Error({
  children: errorMessage,
  exibirMensagem = false,
}) {
  const [exibir, setExibir] = useState(exibirMensagem);
  useEffect(() => {
    if (exibir) {
      const interval = setInterval(() => {
        setExibir(false);
      }, 5000);
      return () => {
        clearInterval(interval);
      };
    }
  }, [exibir]);

  useEffect(() => {
    if (errorMessage) setExibir(true);
  }, [errorMessage]);

  return (
    exibir && (
      <div className="bg-red-400 text-red-900 font-semibold p-2">
        {errorMessage}
      </div>
    )
  );
}
