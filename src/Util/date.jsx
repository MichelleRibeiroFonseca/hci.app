const meses = [
  "",
  "JANEIRO",
  "FEVEREIRO",
  "MARÇO",
  "ABRIL",
  "MAIO",
  "JUNHO",
  "JULHO",
  "AGOSTO",
  "SETEMBRO",
  "OUTUBRO",
  "NOVEMBRO",
  "DEZEMBRO",
];
export function StrToDate(data) {
  if (data.length < 10) return "";
  const dados = data.split("/");
  const dataFinal = `${dados[2]}-${dados[1]}-${dados[0]}T00:00:00`;
  return new Date(dataFinal);
}
export function DateToStr(data) {
  const day = data.getDate().toString().padStart(2, "0");
  const month = (data.getMonth() + 1).toString().padStart(2, "0");
  const year = data.getFullYear();
  const dataFinal = `${day}/${month}/${year}`;
  return dataFinal;
}

export function addDays(date, days) {
  date.setDate(date.getDate() + days);
  return date;
}

export function DateToControl(data) {
  const day = data.getDate().toString().padStart(2, "0");
  const month = (data.getMonth() + 1).toString().padStart(2, "0");
  const year = data.getFullYear();
  const dataFinal = `${year}-${month}-${day}`;
  return dataFinal;
}

export function ControlToStr(data) {
  if (data.length < 10) return "";
  const dados = data.split("-");
  const dataFinal = `${dados[2]}/${dados[1]}/${dados[0]}`;
  return dataFinal;
}

export function ControlToDate(data) {
  if (data.length < 10) return "";
  const dados = data.split("-");
  const dataFinal = `${dados[2]}/${dados[1]}/${dados[0]}`;
  return dataFinal;
}

export function getMonth(data) {
  const newDate = new Date(data);
  const month = newDate.getMonth() + 1;
  return month;
}

export function getYear(data) {
  const newDate = new Date(data);
  const year = newDate.getFullYear();
  return year;
}

export function getPeriodo(data) {
  const month = getMonth(data);
  const year = getYear(data);
  return `${meses[month]}/${year} `;
}

export function getMesAtual(data) {
  const month = getMonth(data).toString().padStart(2, "0");
  const year = getYear(data);
  const day = "01";
  const newDate = new Date(`${year}-${month}-${day}T00:00:00`);
  return newDate;
}

export function addMonth(data, meses) {
  let ano = getYear(data);
  let month = getMonth(data);
  let newDate = null;
  if (meses < 0) {
    if (month === 1) {
      month = 12;
      ano--;
    } else month--;
  } else {
    if (month === 12) {
      month = 1;
      ano++;
    } else month++;
  }
  newDate = new Date(`${ano}-${month.toString().padStart(2, "0")}-01T00:00:00`);
  return newDate;
}

export function DataAtual() {
  const data = new Date();
  const day = data.getDate().toString().padStart(2, "0");
  const month = (data.getMonth() + 1).toString().padStart(2, "0");
  const year = data.getFullYear();
  const dataFinal = `${day}/${month}/${year}`;
  return StrToDate(dataFinal);
}
