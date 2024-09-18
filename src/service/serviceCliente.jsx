import { _post, _get, _put } from "./httpService";

export async function getByNome(nome) {
  try {
    const retorno = await _get(`/cliente/ByNome/${nome}`);
    return retorno;
  } catch (erro) {
    throw erro;
  }
}

export async function getById(id_cliente) {
  try {
    const retorno = await _get(`/cliente/ById/${id_cliente}`);
    return retorno;
  } catch (erro) {
    throw erro;
  }
}
export async function getAll() {
  try {
    const retorno = await _get(`/cliente`);
    return retorno;
  } catch (erro) {
    throw erro;
  }
}

export async function addCliente(data) {
  try {
    debugger;
    const retorno = await _post("/cliente", data);
    return retorno;
  } catch (erro) {
    throw erro;
  }
}

export async function updateCliente(data) {
  try {
    const retorno = await _put("/cliente", data);
    return retorno;
  } catch (erro) {
    throw erro;
  }
}

export async function updateSenhaCliente(data) {
  try {
    const retorno = await _put("/cliente/senha", data);
    return retorno;
  } catch (erro) {
    throw erro;
  }
}

export async function validarCheckIn(data) {
  try {
    const retorno = await _put("/cliente/senhaValidar", data);
    return retorno;
  } catch (erro) {
    throw erro;
  }
}

export async function solicitarSenhaCliente(id_cliente) {
  try {
    const data = { id_cliente };
    const retorno = await _put("/cliente/limparSenha", data);
    return retorno;
  } catch (erro) {
    throw erro;
  }
}
