import React, { useEffect, useState } from "react";
import {
  DateToStr,
  ControlToStr,
  getMonth,
  getPeriodo,
  getYear,
} from "../Util/date";
import * as serviceProduto from "../service/serviceProduto";

export function useProduto() {
  async function getProdutos(filtroNome) {
    try {
      if (filtroNome) {
        const listaProdutoFiltro = await serviceProduto.getByDescricao(
          filtroNome
        );
        return listaProdutoFiltro;
      } else {
        const listaProdutoFiltro = await serviceProduto.getAll();
        return listaProdutoFiltro;
      }
    } catch (erro) {
      throw Error(erro.message);
    }
  }

  async function updateProduto(produto) {
    try {
      const retorno = await serviceProduto.updateProduto(produto);
      return retorno;
    } catch (erro) {
      throw Error(erro.message);
    }
  }
  async function addProduto(produto) {
    try {
      const retorno = await serviceProduto.addProduto(produto);
      return retorno;
    } catch (erro) {
      throw Error(erro.message);
    }
  }

  return {
    getProdutos,
    updateProduto,
    addProduto,
  };
}
