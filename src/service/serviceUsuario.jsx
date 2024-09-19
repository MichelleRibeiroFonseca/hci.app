import { _post, _get, _put } from "./httpService";

export async function validarLogin(data) {
  try {
    const retorno = await _get("/usuario/Login/", data);
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
