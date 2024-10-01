import { _post, _get, _put, _delete } from "./httpService";

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

export async function updateUsuario(data) {
  try {
    debugger;
    var retorno = await _put("/usuario", data);
    debugger;
    return retorno;
  } catch (erro) {
    throw erro;
  }
}

export async function getAll() {
  try {
    debugger;
    const retorno = await _get(`/usuario`);
    return retorno;
  } catch (erro) {
    throw erro;
  }
}

export async function deleteUsuario(id_usuario) {
  try {
    debugger;
    var retorno = await _delete(`/usuario/${id_usuario}`);
    retorno = { sucesso: true, mensagem: "Excluído com sucesso" };
    return retorno;
  } catch (erro) {
    retorno = { sucesso: false, mensagem: "Erro ao Excluir" };
    throw erro;
  }
}
export async function getByDescricao(descricao) {
  try {
    debugger;
    const retorno = await _post(`/usuario/ByFilter/${descricao}`);
    return retorno;
  } catch (erro) {
    throw erro;
  }
}

export async function getUsuarioByNome(nome_usuario) {
  try {
    debugger;
    const retorno = await _get(`/usuario/ByNome/${nome_usuario}`);
    return retorno;
  } catch (erro) {
    throw erro;
  }
}
