import { _post, _get, _put } from "./httpService";

export async function getByDescricao(nome) {
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

export async function addProduto(data) {
  try {
    debugger;
    const retorno = await _post("/cliente", data);
    return retorno;
  } catch (erro) {
    throw erro;
  }
}

export async function updateProduto(data) {
  try {
    const retorno = await _put("/cliente", data);
    return retorno;
  } catch (erro) {
    throw erro;
  }
}
