import { _post, _get, _put } from "./httpService";

export async function validarLogin(data) {
  debugger;
  try {
    const retorno = await _post("/usuario/login/", data);
    return retorno;
  } catch (erro) {
    throw erro;
  }
}

export async function addUsuario(data) {
  try {
    debugger;
    const retorno = await _post("/usuario", data);
    return retorno;
  } catch (erro) {
    throw erro;
  }
}

export async function getAll() {
  try {
    const retorno = await _get(`/usuario`);
    return retorno;
  } catch (erro) {
    throw erro;
  }
}
