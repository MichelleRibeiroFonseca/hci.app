import React, { useEffect, useState } from "react";

export default function Sucesso({ children: message, callback }) {
  const [exibir, setExibir] = useState(false);
  useEffect(() => {
    if (exibir) {
      const interval = setInterval(() => {
        setExibir(false);
        if (callback) callback();
      }, 1000);
      return () => {
        clearInterval(interval);
      };
    }
  }, [exibir]);

  useEffect(() => {
    if (message) setExibir(true);
  }, [message]);

  return (
    exibir && (
      <div className="bg-green-300 text-green-900 font-semibold p-2">
        {message}
      </div>
    )
  );
}
