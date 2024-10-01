export const maskCPF = (v) => {
  v = v.replace(/\D/g, "");

  if (v.length <= 11) {
    v = v.replace(/(\d{3})(\d)/, "$1.$2");
    v = v.replace(/(\d{3})(\d)/, "$1.$2");
    v = v.replace(/(\d{3})(\d{1,2})$/, "$1-$2");
  }
  return v;
};

export const maskCEP = (v) => {
  v = v.replace(/\D/g, "");

  if (v.length <= 9) {
    v = v.replace(/(\d{5})(\d{1,3})$/, "$1-$2");
  }
  return v;
};

export const maskValor = (v) => {
  if (v.indexOf(".") === -1 && v.indexOf(",") === -1) {
    v = v + ".00";
  }
  // Remove caracteres não numéricos
  v = v.replace(/\D/g, "");

  // Converte para float e formata como moeda
  if (v) {
    v = (parseFloat(v) / 100).toFixed(2); // Divide por 100 para tratar centavos
    v = v.replace(".", ","); // Substitui ponto por vírgula
    // Adiciona separadores de milhar
    v = v.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    return `R$ ${v}`; // Adiciona o símbolo de real
  }

  return "";
};

// export const maskCelular = v => {
//   v = v.replace(/\D/g, '');

//   if (v.length <= 11) {
//     v = v.replace(/(\d{2})(\d)/, '($1) $2');
//     v = v.replace(/(\d{5})(\d{1,4})$/, '$1-$2');
//   }
//   return v;
// };

export const maskCelular = (v) => {
  v = v.replace(/\D/g, ""); // Remove tudo que não for número

  if (v.length <= 10) {
    // Telefone fixo (10 dígitos)
    v = v.replace(/(\d{2})(\d)/, "($1) $2");
    v = v.replace(/(\d{4})(\d{1,4})$/, "$1-$2");
  } else if (v.length <= 11) {
    // Celular (11 dígitos)
    v = v.replace(/(\d{2})(\d)/, "($1) $2");
    v = v.replace(/(\d{5})(\d{1,4})$/, "$1-$2");
  }

  return v;
};
