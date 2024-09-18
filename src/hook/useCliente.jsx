import React, { useEffect, useState } from "react";
import {
  DateToStr,
  ControlToStr,
  getMonth,
  getPeriodo,
  getYear,
} from "../Util/date";
import * as serviceCliente from "../service/serviceCliente";

export function useCliente() {
  async function getClientes(filtroNome) {
    try {
      if (filtroNome) {
        const listaClientesFiltro = await serviceCliente.getByNome(filtroNome);
        return listaClientesFiltro;
      } else {
        const listaClientesFiltro = await serviceCliente.getAll();
        return listaClientesFiltro;
      }
    } catch (erro) {
      throw Error(erro.message);
    }
  }

  async function updateCliente(cliente) {
    try {
      const retorno = await serviceCliente.updateCliente(cliente);
      return retorno;
    } catch (erro) {
      throw Error(erro.message);
    }
  }
  async function addCliente(cliente) {
    try {
      const retorno = await serviceCliente.addCliente(cliente);
      return retorno;
    } catch (erro) {
      throw Error(erro.message);
    }
  }

  async function cadastrarSenha(cliente) {
    try {
      const retorno = await serviceCliente.updateSenhaCliente(cliente);
      return retorno;
    } catch (erro) {
      throw Error(erro.message);
    }
  }

  async function validarCheckIn(cliente) {
    try {
      const retorno = await serviceCliente.validarCheckIn(cliente);
      return retorno;
    } catch (erro) {
      throw Error(erro.message);
    }
  }

  async function solicitarSenhaCliente(id_cliente) {
    try {
      const retorno = await serviceCliente.solicitarSenhaCliente(id_cliente);
      return retorno;
    } catch (erro) {
      throw Error(erro.message);
    }
  }

  return {
    getClientes,
    updateCliente,
    addCliente,
    cadastrarSenha,
    validarCheckIn,
    solicitarSenhaCliente,
  };
}
