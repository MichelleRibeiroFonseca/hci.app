import React, { useEffect, useState } from "react";
import TextInput from "../components/controles/TextInput";
import Button from "../components/controles/Button";
// import Header from "../components/telas/Header";
import ItemLista from "../components/telas/ItemLista";
import ModalEdicao from "../components/telas/ModalEdicao";
import Error from "../components/telas/Error";
import Sucesso from "../components/telas/Sucesso";
import Loading from "../components/telas/Loading";
import Mensagem from "../components/telas/Mensagem";
import { getCEP } from "../service/apiService";
import Container from "../components/Container";
import { useCliente } from "../hook/useCliente";
import {
  MdArrowBackIos,
  MdSave,
  MdSchedule,
  MdOutlinePassword,
} from "react-icons/md";

export default function ClientesPage({ handleLogout }) {
  const {
    getClientes,
    updateCliente,
    addCliente,
    solicitarSenhaCliente,
    excluirCliente,
  } = useCliente();

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

  useEffect(() => {
    if (CEP && CEP.length === 9 && CEP !== CEPAtual) {
      async function obterCEP() {
        try {
          setIsProcessing(true);
          const listaCEP = await getCEP(CEP);
          debugger;
          if (!listaCEP.erro) {
            debugger;
            if (listaCEP && listaCEP.logradouro) {
              setLogradouro(listaCEP.logradouro);
            }
            console.log("lista", listaCEP);
            //setLogradouro(listaCEP.logradouro);
            setBairro(listaCEP.bairro);
            setUf(listaCEP.uf);
            setCidade(listaCEP.localidade);
            setCEPAtual(CEP);
            setKey(key + 1);
          } else {
            setLogradouro("");
            setBairro("");
            setUf("");
            setCidade("");
          }
          setIsProcessing(false);
        } catch {
          setIsProcessing(false);
        }
      }
      obterCEP();
    }
  }, [CEP, CEPAtual]);

  function handleItemClick(index) {
    const itemSelected = listaClientes[index];
    limparDados();

    setClienteSelect(itemSelected);
    setNome(itemSelected.nome_cliente);
    setEmail(itemSelected.email);
    setTelefone(itemSelected.telefone);
    setCpf(itemSelected.documento);
    setLogradouro(itemSelected.endereco);
    setCEP(itemSelected.cep);
    setNumero(itemSelected.numero);
    setComplemento(itemSelected.complemento);
    setCidade(itemSelected.cidade);
    setBairro(itemSelected.bairro);
    setUf(itemSelected.uf);

    setIdCliente(itemSelected.id_cliente);
    setOpenModal(true);
  }

  async function handleBuscar() {
    setErroGeral("");
    try {
      setIsProcessing(true);
      const listaClientesFiltro = await getClientes(nomeFiltro);
      setListaClientes(listaClientesFiltro);
      setKey(key + 1);
      setIsProcessing(false);
    } catch (erro) {
      setIsProcessing(false);
      setErroGeral(erro.message);
    }
  }

  async function handleBuscar() {
    setErroGeral("");
    try {
      setIsProcessing(true);
      const listaClientesFiltro = await getClientes(nomeFiltro);
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
    setNomeFiltro("");
  }

  function handleFecharModal() {
    setMensageSucesso("");
    setOpenModal(false);
    handleBuscar();
  }

  async function handleExluir() {
    setErroMensage("");
    setIsProcessing(true);
    const id_cliente = idCliente;
    try {
      if (idCliente > 0) {
        debugger;
        const retorno = await excluirCliente(id_cliente);

        processaRetorno(retorno);
      }
    } catch (erro) {
      setIsProcessing(false);

      setErroMensage(erro.message);
    }
  }

  async function handleSalvar() {
    debugger;
    setErroMensage("");
    setIsProcessing(true);
    if (dadosValidos()) {
      const cliente = {
        nome_cliente: nome,
        email: email,
        telefone: telefone,
        documento: cpf,
        contato: "Teste",
        cep: CEP,
        endereco: logradouro,
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
        setNomeFiltro("");
      } catch (erro) {
        setIsProcessing(false);
        setErroMensage(erro.message);
        setNomeFiltro("");
      }
    } else setIsProcessing(false);
    setValidado(true);
    setNomeFiltro("");
  }
  function handleCancelar() {
    setOpenModal(false);
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

  function handleCloseMensagem() {
    setIsOpenMensagem(false);
    setOpenModal(true);
    setKey(key + 1);
  }

  function dadosValidos() {
    let message = "";
    setErroMensage(""); // Limpa a mensagem de erro inicialmente
    setValidado(true); // Assume que os dados são válidos no começo

    // Verifica o nome
    if (nome.trim().length <= 4) {
      message = "O nome deve ter pelo menos 4 caracteres.";
      setErroMensage(message);
      setValidado(false);
      return false;
    }

    // Verifica o email
    if (email != "") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Regex simples para validar email
      if (!emailRegex.test(email)) {
        message = "O email deve conter '@' e um domínio como '.com'.";
        setErroMensage(message);
        setValidado(false);
        return false;
      }
    }

    // Verifica o CPF
    if (cpf != "") {
      const cleanValue = cpf.replace(/\D/g, ""); // Remove caracteres não numéricos

      if (cleanValue.length === 11) {
        if (!validarCPF(cleanValue)) {
          setErroMensage("CPF inválido");
          return false;
        }
      } else if (cleanValue.length === 14) {
        if (!validarCNPJ(cleanValue)) {
          setErroMensage("CNPJ inválido");
          return false;
        }
      } else {
        setErroMensage("CPF ou CNPJ inválido");
        return false;
      }
    }

    // Verifica o telefone (aceitando celular e fixo)
    const telefoneRegex = /^\(\d{2}\)\s?(\d{4,5})-\d{4}$/;
    if (!telefoneRegex.test(telefone.trim())) {
      message =
        "O telefone deve estar no formato (XX) XXXX-XXXX ou (XX) 9XXXX-XXXX.";
      setErroMensage(message);
      setValidado(false);
      return false;
    }

    // Se passar por todas as validações, retorna true
    return true;
  }

  function validarCPF(cpf) {
    cpf = cpf.replace(/\D/g, ""); // Remove caracteres não numéricos

    if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) return false; // Verifica tamanho e repetição de dígitos

    let soma = 0;
    let resto;

    // Validação do primeiro dígito verificador
    for (let i = 1; i <= 9; i++)
      soma += parseInt(cpf.substring(i - 1, i)) * (11 - i);
    resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) resto = 0;
    if (resto !== parseInt(cpf.substring(9, 10))) return false;

    // Validação do segundo dígito verificador
    soma = 0;
    for (let i = 1; i <= 10; i++)
      soma += parseInt(cpf.substring(i - 1, i)) * (12 - i);
    resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) resto = 0;
    if (resto !== parseInt(cpf.substring(10, 11))) return false;

    return true;
  }

  function validarCNPJ(cnpj) {
    cnpj = cnpj.replace(/\D/g, ""); // Remove caracteres não numéricos

    if (cnpj.length !== 14 || /^(\d)\1+$/.test(cnpj)) return false; // Verifica tamanho e repetição de dígitos

    let tamanho = cnpj.length - 2;
    let numeros = cnpj.substring(0, tamanho);
    let digitos = cnpj.substring(tamanho);
    let soma = 0;
    let pos = tamanho - 7;

    // Validação do primeiro dígito verificador
    for (let i = tamanho; i >= 1; i--) {
      soma += numeros.charAt(tamanho - i) * pos--;
      if (pos < 2) pos = 9;
    }
    let resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
    if (resultado !== parseInt(digitos.charAt(0))) return false;

    // Validação do segundo dígito verificador
    tamanho = tamanho + 1;
    numeros = cnpj.substring(0, tamanho);
    soma = 0;
    pos = tamanho - 7;
    for (let i = tamanho; i >= 1; i--) {
      soma += numeros.charAt(tamanho - i) * pos--;
      if (pos < 2) pos = 9;
    }
    resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
    if (resultado !== parseInt(digitos.charAt(1))) return false;

    return true;
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
        {
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
              Consultar Clientes
            </div>
          </div>
        }

        <div className="ml-5 mr-5 rounded-xl border-2 pl-6 pr-6 border-gray-600">
          <TextInput
            labelDescription="Nome"
            placeholder="Nome do Cliente"
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
            Novo Cliente
          </Button>
        </div>
        <div className="hidden md:flex text-left bg-cyan-600 text-sm rounded-sm pl-2 text-white"></div>
        <div style={{ height: "50px" }}></div>
        <div className="w-full">
          {listaClientes.map((cliente, index) => {
            return (
              <ItemLista key={index} onItemClick={handleItemClick} item={index}>
                <div className="flex">
                  <div className="flex-1">
                    <p className="text-sm">{cliente.nome_cliente}</p>
                    <p className="md:hidden flex-1 text-sm">{cliente.email}</p>
                    <p className="md:hidden flex-1 text-sm">
                      {cliente.telefone}
                    </p>
                  </div>

                  <div className="hidden md:flex w-60 text-sm">
                    {cliente.email}
                  </div>
                  <div className="hidden md:flex w-60 text-sm">
                    {cliente.telefone}
                  </div>
                </div>
              </ItemLista>
            );
          })}
        </div>
        <ModalEdicao titulo="Cadastro de Cliente" isOpenEdicao={openModal}>
          <div className="p-3">
            <div className="container shadow-lg shadow-black rounded-xl mt-5 border-2 md:p-6 p-3 border-gray-600 text-center">
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
                    labelDescription="CPF/CNPJ"
                    isCPF={true}
                    inputValue={cpf}
                    onInputChange={(valor) => setCpf(valor)}
                    validado={validado}
                    maxLength={20}
                    allowNull={true}
                  />
                </div>

                <div className="col-span-1">
                  <TextInput
                    labelDescription="E-mail"
                    inputValue={email}
                    onInputChange={(valor) => setEmail(valor)}
                    validado={validado}
                    allowNull={true}
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
                    value={logradouro}
                    key={key}
                  />
                </div>
                <div className="w-32 text-left">
                  <TextInput
                    labelDescription="Número"
                    inputValue={numero}
                    onInputChange={(valor) => setNumero(valor)}
                    validado={validado}
                    maxLength={10}
                    allowNull={true}
                  />
                </div>
                <div className="col-span-1">
                  <TextInput
                    labelDescription="Complemento"
                    inputValue={complemento}
                    onInputChange={(valor) => setComplemento(valor)}
                    validado={validado}
                    maxLength={50}
                    allowNull={true}
                  />
                </div>

                <div className="col-span-1">
                  <TextInput
                    labelDescription="Bairro"
                    inputValue={bairro || ""}
                    onInputChange={(valor) => setBairro(valor)}
                    validado={validado}
                    maxLength={50}
                    disabled={true}
                    allowNull={true}
                    className="rounded-md border p-2 text-black bg-gray-400"
                    key={key}
                  />
                </div>
                <div className="flex-1 text-left">
                  <TextInput
                    labelDescription="Cidade"
                    inputValue={cidade}
                    onInputChange={(valor) => setCidade(valor)}
                    validado={validado}
                    maxLength={50}
                    disabled={true}
                    allowNull={true}
                    key={key}
                  />
                </div>
                <div className="col-span-1">
                  <TextInput
                    labelDescription="Estado"
                    inputValue={uf}
                    onInputChange={(valor) => setUf(valor)}
                    validado={validado}
                    maxLength={50}
                    disabled={true}
                    allowNull={true}
                    key={key}
                  />
                </div>
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
                    <div className="flex-1"></div>
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
                    {idCliente > 0 && (
                      <Button
                        colorClass="bg-red-700 w-32"
                        onButtonClick={handleExluir}
                      >
                        Excluir
                      </Button>
                    )}

                    {/* {idCliente > 0 && (
                    <>
                      <Button
                        colorClass="bg-blue-700 w-64"
                        onButtonClick={handleSolicitarSenha}
                      >
                        SOLICITAR SENHA
                      </Button>

                      <Button
                        colorClass="bg-blue-700 w-64"
                        onButtonClick={handleAgenda}
                      >
                        AGENDA
                      </Button>
                    </>
                  )} */}

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
