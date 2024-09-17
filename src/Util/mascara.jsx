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

export const maskCelular = (v) => {
  v = v.replace(/\D/g, "");

  if (v.length <= 11) {
    v = v.replace(/(\d{2})(\d)/, "($1) $2");
    v = v.replace(/(\d{5})(\d{1,4})$/, "$1-$2");
  }
  return v;
};
