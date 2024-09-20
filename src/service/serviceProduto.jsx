import { _post, _get, _put, _delete } from "./httpService";

export async function getByDescricao(nome) {
  try {
    const retorno = await _get(`/produto/byfilter/${nome}`);
    return retorno;
  } catch (erro) {
    throw erro;
  }
}

export async function getById(id_Produto) {
  try {
    const retorno = await _get(`/produto/ById/${id_Produto}`);
    return retorno;
  } catch (erro) {
    throw erro;
  }
}
export async function getAll() {
  try {
    const retorno = await _get(`/produto`);
    return retorno;
  } catch (erro) {
    throw erro;
  }
}

export async function addProduto(data) {
  try {
    debugger;
    const retorno = await _post("/produto", data);
    return retorno;
  } catch (erro) {
    throw erro;
  }
}

export async function deteProduto(id) {
  try {
    debugger;
    const retorno = await _delete("/produto", id);
    return retorno;
  } catch (erro) {
    throw erro;
  }
}

export async function updateProduto(data) {
  try {
    const retorno = await _put("/produto", data);
    return retorno;
  } catch (erro) {
    throw erro;
  }
}
