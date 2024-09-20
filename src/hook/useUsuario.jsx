import React, { useEffect, useState } from "react";
import {
  DateToStr,
  ControlToStr,
  getMonth,
  getPeriodo,
  getYear,
} from "../Util/date";
import * as serviceUsuario from "../service/serviceUsuario";

export function useUsuario() {
  async function getUsuarios(data) {
    try {
      if (data) {
        const listaClientesFiltro = await serviceUsuario.validarLogin(data);
        return listaClientesFiltro;
      }
    } catch (erro) {
      throw Error(erro.message);
    }
  }

  async function getUsuarios() {
    try {
      const listaClientesFiltro = await serviceUsuario.getAll();
      return listaClientesFiltro;
    } catch (erro) {
      throw Error(erro.message);
    }
  }

  async function addUsuario(data) {
    try {
      const retorno = await serviceUsuario.addUsuario(data);
      return retorno;
    } catch (erro) {
      throw Error(erro.message);
    }
  }

  return {
    getUsuarios,
    addUsuario,
  };
}
