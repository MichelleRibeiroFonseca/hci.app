import { _post, _get, _put, _delete } from './httpService';

export async function getByDescricao(descricao) {
  try {
    const retorno = await _get(`/orcamento/byfilter/${descricao}`);
    return retorno;
  } catch (erro) {
    throw erro;
  }
}

export async function getById(id_orcamento) {
  try {
    const retorno = await _get(`/orcamento/ById/${id_orcamento}`);
    return retorno;
  } catch (erro) {
    throw erro;
  }
}

export async function getPDF(id_orcamento) {
  try {
    const retorno = await _get(`/orcamento/PDF/${id_orcamento}`);
    return retorno;
  } catch (erro) {
    throw erro;
  }
}

export async function addOrcamento(data) {
  try {
    const retorno = await _post('/orcamento', data);
    return retorno;
  } catch (erro) {
    throw erro;
  }
}

export async function updateOrcamento(data) {
  try {
    const retorno = await _put('/orcamento', data);
    return retorno;
  } catch (erro) {
    throw erro;
  }
}
export async function excluirOrcamento(id_orcamento) {
  try {
    var retorno = await _delete(`/orcamento/${id_orcamento}`);
    retorno = { sucesso: true, mensagem: 'Excluído com sucesso' };
    return retorno;
  } catch (erro) {
    retorno = { sucesso: false, mensagem: 'Erro ao Excluir' };
    throw erro;
  }
}

export async function excluirOrcamentoItem(id_orcamento_item) {
  try {
    var retorno = await _delete(`/orcamentoItem/${id_orcamento_item}`);
    retorno = { sucesso: true, mensagem: 'Excluído com sucesso' };
    return retorno;
  } catch (erro) {
    retorno = { sucesso: false, mensagem: 'Erro ao Excluir' };
    throw erro;
  }
}
