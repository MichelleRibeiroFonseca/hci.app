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

export const maskCelular = (v) => {
  v = v.replace(/\D/g, "");

  if (v.length <= 11) {
    v = v.replace(/(\d{2})(\d)/, "($1) $2");
    v = v.replace(/(\d{5})(\d{1,4})$/, "$1-$2");
  }
  return v;
};
