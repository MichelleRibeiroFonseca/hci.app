import React, { useEffect, useState } from "react";
import TextInput from "../components/controles/TextInput";
import Button from "../components/controles/Button";
import Container from "../components/Container";
import { useProduto } from "../hook/useProduto";
import ItemLista from "../components/telas/ItemLista";
import ModalEdicao from "../components/telas/ModalEdicao";
import Error from "../components/telas/Error";
import Sucesso from "../components/telas/Sucesso";
import Loading from "../components/telas/Loading";
import Mensagem from "../components/telas/Mensagem";
import {
  MdArrowBackIos,
  MdSave,
  MdSchedule,
  MdOutlinePassword,
} from "react-icons/md";

export default function ProdutosPage() {
  const { getProdutos, updateProduto, addProduto } = useProduto();

  const [nomeFiltro, setNomeFiltro] = useState("");

  const [erroGeral, setErroGeral] = useState("");
  const [erroMensage, setErroMensage] = useState("");
  const [mensageSucesso, setMensageSucesso] = useState("");

  const [isProcessing, setIsProcessing] = useState(false);
  const [listaProdutos, setListaProdutos] = useState([]);
  const [key, setKey] = useState(0);
  const [nome, setNome] = useState("");
  const [valorCusto, setValorCusto] = useState("");
  const [valorVenda, setValorVenda] = useState("");
  const [fornecedor, setFornecedor] = useState("");
  const [quantidade, setQuantidade] = useState("");
  const [unidade, setUnidade] = useState("");
  const [ean, setEan] = useState("");
  const [dimensao, setDimensao] = useState("");
  const [peso, setPeso] = useState("");
  const [idProduto, setIdProduto] = useState(0);
  const [validado, setValidado] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [openModalAgenda, setOpenModalAgenda] = useState(false);
  const [clienteSelected, setClienteSelect] = useState();
  const [isOpenMensagem, setIsOpenMensagem] = useState(false);

  function handleItemClick(index) {
    const itemSelected = listaProdutos[index];
    limparDados();

    setClienteSelect(itemSelected);
    setNome(itemSelected.nome);
    setValorVenda(itemSelected.valorVenda);
    setValorCusto(itemSelected.valorCusto);
    setFornecedor(itemSelected.fornecedor);
    setQuantidade(itemSelected.quantidade);
    setUnidade(itemSelected.unidade);
    setDimensao(itemSelected.dimensao);
    setPeso(itemSelected.peso);
    setEan(itemSelected.ean);
    setIdProduto(itemSelected.idProduto);
    setOpenModal(true);
  }

  async function handleBuscar() {
    setErroGeral("");
    try {
      setIsProcessing(true);
      const listaProdutosFiltro = await getProdutos(nomeFiltro);
      setListaProdutos(listaProdutosFiltro);
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
      const listaProdutosFiltro = await getProdutos(nomeFiltro);
      setListaProdutos(listaProdutosFiltro);
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
    setValorVenda("");
    setValorCusto("");
    setFornecedor("");
    setQuantidade("");
    setUnidade("");
    setDimensao("");
    setPeso("");
    setEan("");
    setIdProduto(0);
    setClienteSelect();
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
      const produto = {
        nome_cliente: nome,
        valorVenda: valorVenda,
        valorCusto: valorCusto,
        fornecedor: fornecedor,
        quantidade: quantidade,
        unidade: unidade,
        dimensao: dimensao,
        peso: peso,
        ean: ean,
        idProduto: idProduto,
      };
      try {
        if (idProduto > 0) {
          const retorno = await updateProduto(produto);
          processaRetorno(retorno);
        } else {
          const retorno = await addProduto(produto);
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

    // return (
    //   nome.trim().length > 5 &&
    //   email.trim().length > 5 &&
    //   cpf.trim().length === 14
    //   //telefone.trim().length === 15
    // );
  }

  function handleCloseMensagem() {
    setIsOpenMensagem(false);
    setOpenModal(true);
    setKey(key + 1);
  }
  return (
    <>
      <Container>
        {isProcessing && <Loading />}
        <Error>{erroGeral}</Error>

        <Mensagem
          key={key}
          mensagem={"Confirma a solicitação da senha?"}
          closeFunction={handleCloseMensagem}
          openModal={isOpenMensagem}
          textButton={"Confirmar"}
        />
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
            Novo Produto
          </Button>
        </div>
        <div className="hidden md:flex text-left bg-cyan-600 text-sm rounded-sm pl-2 text-white"></div>
        <div style={{ height: "50px" }}></div>
        <div className="w-full">
          {listaProdutos.map((cliente, index) => {
            return (
              <ItemLista key={index} onItemClick={handleItemClick} item={index}>
                <div className="flex">
                  <div className="flex-1">
                    <p>{cliente.nome_cliente}</p>
                    <p className="md:hidden flex">{cliente.descricao}</p>
                    <p className="md:hidden flex">{cliente.codigo}</p>
                  </div>

                  <div className="hidden md:flex w-60">{cliente.descricao}</div>
                  <div className="hidden md:flex w-60">{cliente.codigo}</div>
                </div>
              </ItemLista>
            );
          })}
        </div>
        <ModalEdicao titulo="Cadastro de Produtos" isOpenEdicao={openModal}>
          <div className="p-3">
            <div className="container shadow-lg shadow-black rounded-xl mt-5 border-2 md:p-6 p-3 border-gray-600 text-center">
              <div className="grid grid-cols-3 gap-4">
                <div className="col-span-1">
                  <TextInput
                    labelDescription="CODIGO"
                    inputValue={idProduto}
                    autoFocus
                    onInputChange={(valor) => setIdProduto(valor)}
                    disabled={true}
                    allowNull={true}
                  />
                </div>

                <div className="col-span-1">
                  <TextInput
                    labelDescription="Descricao"
                    inputValue={nome}
                    onInputChange={(valor) => setNome(valor)}
                    validado={validado}
                    maxLength={14}
                    allowNull={false}
                  />
                </div>

                <div className="col-span-1">
                  <TextInput
                    labelDescription="Valor Venda"
                    inputValue={valorVenda}
                    onInputChange={(valor) => setValorVenda(valor)}
                    validado={validado}
                    allowNull={false}
                  />
                </div>
                <div className="col-span-1">
                  <TextInput
                    labelDescription="Valor Venda"
                    inputValue={valorCusto}
                    onInputChange={(valor) => setValorCusto(valor)}
                    validado={validado}
                    allowNull={false}
                  />
                </div>
                <div className="col-span-1">
                  <TextInput
                    labelDescription="Fornecedor"
                    inputValue={fornecedor}
                    onInputChange={(valor) => setFornecedor(valor)}
                    validado={validado}
                    allowNull={false}
                  />
                </div>

                <div className="col-span-1">
                  <TextInput
                    labelDescription="Quantidade"
                    inputValue={quantidade}
                    onInputChange={(valor) => setQuantidade(valor)}
                    validado={validado}
                    maxLength={15}
                    allowNull={false}
                  />
                </div>

                <div className="col-span-1">
                  <TextInput
                    labelDescription="Unidade"
                    inputValue={unidade}
                    onInputChange={(valor) => setUnidade(valor)}
                    validado={validado}
                    maxLength={250}
                    allowNull={false}
                  />
                </div>

                <div className="col-span-1">
                  <TextInput
                    labelDescription="DIMENSÕES"
                    inputValue={dimensao}
                    onInputChange={(valor) => setDimensao(valor)}
                    validado={validado}
                    maxLength={150}
                    disabled={false}
                    allowNull={false}
                  />
                </div>
                <div className="w-32 text-left">
                  <TextInput
                    labelDescription="PESO"
                    inputValue={peso}
                    onInputChange={(valor) => setPeso(valor)}
                    validado={validado}
                    maxLength={15}
                    allowNull={false}
                  />
                </div>
                <div className="col-span-1">
                  <TextInput
                    labelDescription="EAN"
                    inputValue={ean}
                    onInputChange={(valor) => setEan(valor)}
                    validado={validado}
                    maxLength={50}
                    allowNull={false}
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
                    <div className="flex-1">
                      {idProduto > 0 && (
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
