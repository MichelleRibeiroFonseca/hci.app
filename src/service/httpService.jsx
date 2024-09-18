import axios from "axios";

const BASE_URL = "https://api-infinity-pilates.onrender.com/";
// process.env.NODE_ENV === 'development'
//   ? 'https://api-infinity-pilates.onrender.com/'
//   : 'https://api-infinity-pilates.onrender.com/';

// process.env.NODE_ENV === 'development'
//   ? 'http://localhost:3000/'
//   : 'https://api-infinity-pilates.onrender.com/';

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 30000,
});

const axiosInstanceToken = axios.create({
  baseURL: BASE_URL,
  timeout: 30000,
  headers: {
    Authorization: "Token token=d5191901578238ecebc9aa05544a51b1",
  },
});

export async function _getCEP(url) {
  const { data } = await axiosInstanceToken.get(url).catch((erro) => {
    console.error(erro);
    throw erro;
  });
  return data;
}

export async function _get(url) {
  const { data } = await axiosInstance.get(url).catch((erro) => {
    console.error(erro);
    throw erro;
  });
  return data;
}

export async function _delete(url) {
  await axiosInstance.delete(url);
}

export async function _post(url, object) {
  const { data } = await axiosInstance.post(url, object);
  return data;
}

export async function _put(url, object) {
  const { data } = await axiosInstance.put(url, object);
  return data;
}
