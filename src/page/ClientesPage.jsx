import React, { useEffect, useState } from "react";
import TextInput from "../components/controles/TextInput";
import Button from "../components/controles/Button";
// import Header from "../components/telas/Header";
// import ItemLista from "../components/telas/ItemLista";
import ModalEdicao from "../components/telas/ModalEdicao";
import Error from "../components/telas/Error";
import Sucesso from "../components/telas/Sucesso";
import Loading from "../components/telas/Loading";
import Mensagem from "../components/telas/Mensagem";
// import { getCEP } from "../services/apiService";

import {
  MdArrowBackIos,
  MdSave,
  MdSchedule,
  MdOutlinePassword,
} from "react-icons/md";

export default function ClientesPage() {
  const { getClientes, updateCliente, addCliente, solicitarSenhaCliente } = ""; //useCliente();

  const [nomeFiltro, setNomeFiltro] = useState("");

  const [erroGeral, setErroGeral] = useState("");
  const [erroMensage, setErroMensage] = useState("");
  const [mensageSucesso, setMensageSucesso] = useState("");

  const [isProcessing, setIsProcessing] = useState(false);
  const [listaClientes, setListaClientes] = useState([]);
  const [key, setKey] = useState(0);
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");
  const [cpf, setCpf] = useState("");
  const [CEP, setCEP] = useState("");
  const [CEPAtual, setCEPAtual] = useState("");
  const [bairro, setBairro] = useState("");
  const [cidade, setCidade] = useState("");
  const [complemento, setComplemento] = useState("");
  const [logradouro, setLogradouro] = useState("");
  const [numero, setNumero] = useState("");
  const [uf, setUf] = useState("");
  const [idCliente, setIdCliente] = useState(0);

  const [validado, setValidado] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [openModalAgenda, setOpenModalAgenda] = useState(false);
  const [clienteSelected, setClienteSelect] = useState();
  const [isOpenMensagem, setIsOpenMensagem] = useState(false);

  async function handleBuscar() {
    setErroGeral("");
    try {
      setIsProcessing(true);
      const listaClientesFiltro = ""; //await getClientes(nomeFiltro);
      setListaClientes(listaClientesFiltro);
      setKey(key + 1);
      setIsProcessing(false);
    } catch (erro) {
      setIsProcessing(false);
      setErroGeral(erro.message);
    }
  }
  function handleNovo() {
    limparDados();
    setOpenModal(true);
  }

  function limparDados() {
    setValidado(false);
    setNome("");
    setEmail("");
    setTelefone("");
    setCpf("");
    setCEP("");
    setBairro("");
    setCidade("");
    setComplemento("");
    setLogradouro("");
    setNumero("");
    setUf("");
    setIdCliente(0);
    setClienteSelect();
  }

  function handleFecharModal() {
    setMensageSucesso("");
    setOpenModal(false);
    handleBuscar();
  }
  async function handleSalvar() {
    setErroMensage("");
    setIsProcessing(true);
    if (dadosValidos()) {
      const cliente = {
        nome: nome,
        cpf: cpf,
        email: email,
        celular: telefone,
        CEP: CEP,
        logradouro: logradouro,
        numero: numero,
        complemento: complemento,
        cidade: cidade,
        bairro: bairro,
        uf: uf,
        id_cliente: idCliente,
      };
      try {
        if (idCliente > 0) {
          const retorno = await updateCliente(cliente);
          processaRetorno(retorno);
        } else {
          const retorno = await addCliente(cliente);
          processaRetorno(retorno);
        }
      } catch (erro) {
        setIsProcessing(false);

        setErroMensage(erro.message);
      }
    } else setIsProcessing(false);
    setValidado(true);
  }
  function handleCancelar() {
    setOpenModal(false);
  }

  function processaRetorno(retorno) {
    setIsProcessing(false);
    if (!retorno.sucesso) setErroMensage(retorno.mensagem);
    else {
      setMensageSucesso(retorno.mensagem);
      //setOpenSucesso(true);
    }
  }
  function handleSolicitarSenha() {
    setOpenModal(false);
    setIsOpenMensagem(true);
    setKey(key + 1);
  }

  function handleAgenda() {
    setOpenModal(false);
    // setOpenModalAgenda(true);
    // handleListarAgenda();
  }

  function handleSolicitarSenha() {
    setOpenModal(false);
  }

  function dadosValidos() {
    setValidado(true);

    return (
      nome.trim().length > 5 &&
      email.trim().length > 5 &&
      cpf.trim().length === 14
      //telefone.trim().length === 15
    );
  }
  return (
    <>
      {/* <Header submenu="Clientes"></Header> */}
      {
        <div className="hidden md:flex text-left bg-cyan-600 text-sm rounded-sm pl-2 text-white"></div>
      }
      <div className="ml-5 mr-5 rounded-xl border-2 pl-6 pr-6 border-gray-600">
        <TextInput
          labelDescription="Nome"
          inputValue={nomeFiltro}
          autoFocus
          onInputChange={(valor) => setNomeFiltro(valor)}
        />
        <Button
          colorClass="bg-blue-600 w-30 md:w-40"
          onButtonClick={handleBuscar}
        >
          Buscar
        </Button>
        <Button
          colorClass="bg-green-600 w-30 md:w-40"
          onButtonClick={handleNovo}
        >
          Novo Cliente
        </Button>
      </div>
      <ModalEdicao titulo="Cadastro de Cliente" isOpenEdicao={openModal}>
        <div className="grid grid-cols-3 gap-4">
          <div className="col-span-1">
            <TextInput
              labelDescription="Nome"
              inputValue={nome}
              autoFocus
              onInputChange={(valor) => setNome(valor)}
              validado={validado}
            />
          </div>

          <div className="col-span-1">
            <TextInput
              labelDescription="CPF"
              isCPF={true}
              inputValue={cpf}
              onInputChange={(valor) => setCpf(valor)}
              validado={validado}
              maxLength={14}
            />
          </div>

          <div className="col-span-1">
            <TextInput
              labelDescription="E-mail"
              inputValue={email}
              onInputChange={(valor) => setEmail(valor)}
              validado={validado}
            />
          </div>

          <div className="col-span-1">
            <TextInput
              labelDescription="Telefone"
              inputValue={telefone}
              onInputChange={(valor) => setTelefone(valor)}
              validado={validado}
              maxLength={15}
              isCelular={true}
            />
          </div>

          <div className="col-span-1">
            <TextInput
              labelDescription="CEP"
              inputValue={CEP}
              onInputChange={(valor) => setCEP(valor)}
              validado={validado}
              maxLength={9}
              allowNull={true}
              isCEP={true}
            />
          </div>

          <div className="col-span-1">
            <TextInput
              labelDescription="Logradouro"
              inputValue={logradouro}
              onInputChange={(valor) => setLogradouro(valor)}
              validado={validado}
              maxLength={100}
              disabled={true}
              allowNull={true}
            />
          </div>

          {/* Continue adicionando mais campos da mesma forma */}
        </div>
      </ModalEdicao>
    </>
  );
}
