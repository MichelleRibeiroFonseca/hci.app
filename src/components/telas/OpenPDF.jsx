import React, { useEffect } from 'react';

function OpenPdfInNewWindow({ base64String }) {
  useEffect(() => {
    // Função para converter Base64 para Blob
    const base64ToBlob = base64 => {
      const byteCharacters = atob(base64);
      const byteNumbers = new Array(byteCharacters.length);
      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      return new Blob([byteArray], { type: 'application/pdf' });
    };

    if (base64String) {
      // Remove o prefixo 'data:application/pdf;base64,' se presente
      const base64 = base64String.split(',')[1] || base64String;
      const blob = base64ToBlob(base64);
      const url = URL.createObjectURL(blob);

      // Abre o PDF em uma nova janela
      const newWindow = window.open(url, '_blank');
      if (newWindow) {
        newWindow.focus();
      }

      // Limpa o URL do objeto quando o componente é desmontado
      return () => URL.revokeObjectURL(url);
    }
  }, [base64String]);

  return null;
}

export default OpenPdfInNewWindow;
