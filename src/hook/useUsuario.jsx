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
  async function validarLogins(data) {
    try {
      if (data) {
        debugger;
        const listaUsuarioFiltro = await serviceUsuario.validarLogin(data);
        return listaUsuarioFiltro;
      }
    } catch (erro) {
      throw Error(erro.message);
    }
  }

  async function getAll() {
    try {
      debugger;
      const listaUsuarioFiltro = await serviceUsuario.getAll();
      return listaUsuarioFiltro;
    } catch (erro) {
      throw Error(erro.message);
    }
  }

  async function getByDescricao() {
    try {
      const listaUsuarioFiltro = await serviceUsuario.getByDescricao();
      return listaUsuarioFiltro;
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

  async function deleteUsuario(id_usuario) {
    try {
      const retorno = await serviceUsuario.deleteUsuario(id_usuario);
      return retorno;
    } catch (erro) {
      throw Error(erro.message);
    }
  }

  async function getUsuarioByNome(nome_usuario) {
    try {
      if (nome_usuario) {
        const listaUsuarioFiltro = await serviceUsuario.getUsuarioByNome(
          nome_usuario
        );
        return listaUsuarioFiltro;
      } else {
        const listaUsuarioFiltro = await serviceUsuario.getAll();
        return listaUsuarioFiltro;
      }
    } catch (erro) {
      throw Error(erro.message);
    }
  }
  return {
    getAll,
    addUsuario,
    validarLogins,
    deleteUsuario,
    getByDescricao,
  };
}
