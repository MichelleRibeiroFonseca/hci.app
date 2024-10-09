import React, { useEffect, useState } from "react";
import TextInput from "../components/controles/TextInput";
import Button from "../components/controles/Button";
import ItemLista from "../components/telas/ItemLista";
import ModalEdicao from "../components/telas/ModalEdicao";
import Error from "../components/telas/Error";
import Sucesso from "../components/telas/Sucesso";
import Loading from "../components/telas/Loading";
import Mensagem from "../components/telas/Mensagem";
import Container from "../components/Container";
import { useUsuario } from "../hook/useUsuario";
import {
  MdArrowBackIos,
  MdSave,
  MdSchedule,
  MdOutlinePassword,
} from "react-icons/md";
import {
  deleteUsuario,
  getUsuarioByNome,
  updateUsuario,
} from "../service/serviceUsuario";

export default function UsuariosPage({ handleLogout }) {
  const { getAll, addUsuario, deleteUsuario } = useUsuario();

  const [nomeFiltro, setNomeFiltro] = useState("");

  const [erroGeral, setErroGeral] = useState("");
  const [erroMensage, setErroMensage] = useState("");
  const [mensageSucesso, setMensageSucesso] = useState("");

  const [isProcessing, setIsProcessing] = useState(false);
  const [listaUsuario, setListaUsuarios] = useState([]);
  const [key, setKey] = useState(0);
  const [nome, setNome] = useState("");
  const [senha, setSenha] = useState("");
  const [idUsuario, setIdUsuario] = useState(0);
  const [validado, setValidado] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [openModalAgenda, setOpenModalAgenda] = useState(false);
  const [clienteSelected, setClienteSelect] = useState();
  const [isOpenMensagem, setIsOpenMensagem] = useState(false);
  const [listaUsuarioFiltro, setListaUsuario] = useState([]);
  function handleItemClick(index) {
    debugger;
    const itemSelected = listaUsuario[index];
    limparDados();

    setClienteSelect(itemSelected);
    setNome(itemSelected.nome_usuario);
    setSenha(itemSelected.senha);
    setIdUsuario(itemSelected.id_usuario);
    setOpenModal(true);
  }

  // async function handleBuscar() {
  //   setErroGeral("");
  //   try {
  //     setIsProcessing(true);
  //     if nomeFiltro =""{}
  //     const listaUsuarioFiltro = await getUsuarios(nomeFiltro);
  //     setListaUsuarios(listaUsuarioFiltro);
  //     setKey(key + 1);
  //     setIsProcessing(false);
  //   } catch (erro) {
  //     setIsProcessing(false);
  //     setErroGeral(erro.message);
  //   }
  // }

  async function handleBuscar() {
    debugger;
    setErroGeral("");
    try {
      setIsProcessing(true);

      let listaUsuarios; // Variável para armazenar os dados temporariamente

      if (nomeFiltro === "") {
        listaUsuarios = await getAll(); // Chama getAll para pegar todos os usuários
      } else {
        listaUsuarios = await getUsuarioByNome(nomeFiltro); // Chama getUsuarioByNome
      }

      setListaUsuarios(listaUsuarios); // Usa o setter para atualizar o estado corretamente
      setKey((prevKey) => prevKey + 1);
    } catch (erro) {
      setErroGeral(erro.message);
    } finally {
      setIsProcessing(false); // Garante que o estado de processamento é atualizado
    }
  }

  function handleNovo() {
    limparDados();
    setOpenModal(true);
  }

  function limparDados() {
    setValidado(false);
    setNome("");
    setSenha("");
    setIdUsuario(0);
    setClienteSelect();
    setNomeFiltro("");
  }

  function handleFecharModal() {
    setMensageSucesso("");
    setOpenModal(false);
    handleBuscar();
  }
  async function handleSalvar() {
    debugger;
    setErroMensage("");
    setIsProcessing(true);
    if (dadosValidos()) {
      const cliente = {
        nome_usuario: nome,
        senha: senha,
        //idUsuario: idUsuario,
      };
      try {
        if (idUsuario > 0) {
          const usuUpdate = {
            nome_usuario: nome,
            id_usuario: idUsuario,
          };
          const retorno = await updateUsuario(usuUpdate);
          processaRetorno(retorno);
        } else {
          const retorno = await addUsuario(cliente);
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

  async function handleExluir() {
    debugger;
    setErroMensage("");
    setIsProcessing(true);
    try {
      if (idUsuario > 0) {
        const retorno = await deleteUsuario(idUsuario);

        processaRetorno(retorno);
      }
    } catch (erro) {
      setIsProcessing(false);

      setErroMensage(erro.message);
    }
  }

  function processaRetorno(retorno) {
    debugger;
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
      nome.trim().length > 2
      //telefone.trim().length === 15
    );
  }

  function handleCloseMensagem() {
    setIsOpenMensagem(false);
    setOpenModal(true);
    setKey(key + 1);
  }

  return (
    <>
      <Container handleLogout={handleLogout}>
        {isProcessing && <Loading />}
        <Error>{erroGeral}</Error>
        {/* <ModalEdicao
        titulo="AGENDA CLIENTE"
        isOpenEdicao={isOpenMensagem}
      ></ModalEdicao> */}
        <Mensagem
          key={key}
          mensagem={"Confirma a solicitação da senha?"}
          closeFunction={handleCloseMensagem}
          openModal={isOpenMensagem}
          textButton={"Confirmar"}
        />
        {/* <Header submenu="Clientes"></Header> */}
        <div
          className="col-span-1"
          style={{
            textAlign: "center",
            display: "flex",
            justifyContent: "center", // Centraliza horizontalmente
            alignItems: "center", // Centraliza verticalmente

            marginTop: "20px", // Espaçamento superior para distanciar do cabeçalho, se necessário
            color: "black",
          }}
        >
          <div
            className="col-span-1"
            style={{
              textAlign: "center",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              color: "black",
              fontSize: "24px",
            }}
          >
            Consultar Usuários
          </div>
        </div>

        <div className="ml-5 mr-5 rounded-xl border-2 pl-6 pr-6 border-gray-600">
          <TextInput
            labelDescription="Nome"
            placeholder="Nome do Usuário"
            inputValue={nomeFiltro}
            autoFocus
            onInputChange={(valor) => setNomeFiltro(valor)}
          />
          <Button
            colorClass="bg-blue-600 w-30 md:w-40"
            onButtonClick={handleBuscar}
          >
            Consultar
          </Button>
          <Button
            colorClass="bg-green-600 w-30 md:w-40"
            onButtonClick={handleNovo}
          >
            Novo Usuário
          </Button>
        </div>
        <div className="hidden md:flex text-left bg-cyan-600 text-sm rounded-sm pl-2 text-white"></div>
        <div style={{ height: "50px" }}></div>
        <div className="w-full">
          {listaUsuario.map((cliente, index) => {
            return (
              <ItemLista key={index} onItemClick={handleItemClick} item={index}>
                <div className="flex">
                  <div className="flex-1">
                    <p className="text-sm">{cliente.id_usuario}</p>
                    <p className="md:hidden flex text-sm">
                      {cliente.nome_usuario}
                    </p>
                    <p className="md:hidden flex text-sm">{cliente.senha}</p>
                  </div>

                  <div className="hidden md:flex w-60 text-sm">
                    {cliente.nome_usuario}
                  </div>
                  <div className="hidden md:flex w-60 text-sm">
                    {cliente.id_usuario}
                  </div>
                </div>
              </ItemLista>
            );
          })}
        </div>
        <ModalEdicao titulo="Cadastro de Usuario" isOpenEdicao={openModal}>
          <div className="p-3">
            <div className="container shadow-lg shadow-black rounded-xl mt-5 border-2 md:p-6 p-3 border-gray-600 text-center">
              <div className="grid grid-cols-3 gap-4">
                <div className="col-span-1">
                  <TextInput
                    labelDescription="Codigo"
                    inputValue={idUsuario}
                    autoFocus
                    onInputChange={(valor) => setIdUsuario(valor)}
                    validado={validado}
                    disabled={true}
                    allowNull={true}
                  />
                </div>
                <div className="col-span-1">
                  <TextInput
                    labelDescription="Nome"
                    inputValue={nome}
                    autoFocus
                    onInputChange={(valor) => setNome(valor)}
                    validado={validado}
                    allowNull={false}
                  />
                </div>
                {idUsuario == 0 && (
                  <div className="col-span-1">
                    <TextInput
                      labelDescription="Senha"
                      inputValue={senha}
                      onInputChange={(valor) => setSenha(valor)}
                      validado={validado}
                      maxLength={14}
                      allowNull={false}
                    />
                  </div>
                )}
              </div>

              {!isProcessing && (
                <>
                  <div className="flex md:hidden">
                    <div>
                      <Button
                        colorClass="bg-red-700"
                        onButtonClick={handleCancelar}
                      >
                        <MdArrowBackIos />
                      </Button>
                    </div>
                    <div className="flex-1">
                      {idUsuario > 0 && (
                        <>
                          <Button
                            colorClass="bg-blue-700"
                            onButtonClick={handleSolicitarSenha}
                          >
                            <MdOutlinePassword />
                          </Button>

                          <Button
                            colorClass="bg-blue-700"
                            onButtonClick={handleAgenda}
                          >
                            <MdSchedule />
                          </Button>
                        </>
                      )}
                    </div>
                    <div>
                      <Button
                        colorClass="bg-green-700"
                        onButtonClick={handleSalvar}
                      >
                        <MdSave />
                      </Button>
                    </div>
                  </div>

                  <div className="hidden md:flex">
                    <Button
                      colorClass="bg-red-700 w-32"
                      onButtonClick={handleCancelar}
                    >
                      CANCELAR
                    </Button>

                    {idUsuario > 0 && (
                      <Button
                        colorClass="bg-red-700 w-32"
                        onButtonClick={handleExluir}
                      >
                        Excluir
                      </Button>
                    )}
                    <Button
                      colorClass="bg-green-700 w-32"
                      onButtonClick={handleSalvar}
                    >
                      SALVAR
                    </Button>
                  </div>
                </>
              )}
              {isProcessing && <Loading />}
              <div>
                <Error>{erroMensage}</Error>
                <Sucesso callback={handleFecharModal}>{mensageSucesso}</Sucesso>
              </div>
            </div>
          </div>
        </ModalEdicao>
      </Container>
    </>
  );
}
