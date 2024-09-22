import * as serviceOrcamento from '../service/serviceOrcamento';

export function useOrcamento() {
  async function getOrcamentos(descricao) {
    try {
      if (descricao) {
        const listaOrcamento = await serviceOrcamento.getByDescricao(descricao);
        return listaOrcamento;
      }
    } catch (erro) {
      throw Error(erro.message);
    }
  }

  async function getById(id_orcamento) {
    try {
      const listaOrcamento = await serviceOrcamento.getById(id_orcamento);
      return listaOrcamento[0];
    } catch (erro) {
      throw Error(erro.message);
    }
  }
  async function updateOrcamento(orcamento) {
    try {
      const retorno = await serviceOrcamento.updateOrcamento(orcamento);
      return retorno;
    } catch (erro) {
      throw Error(erro.message);
    }
  }
  async function addOrcamento(orcamento) {
    try {
      const retorno = await serviceOrcamento.addOrcamento(orcamento);
      return retorno;
    } catch (erro) {
      throw Error(erro.message);
    }
  }

  async function excluirOrcamento(id_orcamento) {
    try {
      const retorno = await serviceOrcamento.excluirOrcamento(id_orcamento);
      return retorno;
    } catch (erro) {
      throw Error(erro.message);
    }
  }

  async function getPDF(id_orcamento) {
    try {
      const pdf = await serviceOrcamento.getPDF(id_orcamento);
      return pdf;
    } catch (erro) {
      throw Error(erro.message);
    }
  }

  return {
    getOrcamentos,
    updateOrcamento,
    addOrcamento,
    excluirOrcamento,
    getById,
    getPDF,
  };
}
