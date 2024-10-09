import React, { useEffect, useState } from 'react';
import TextInput from '../components/controles/TextInput';
import Button from '../components/controles/Button';
import Container from '../components/Container';
import { useOrcamento } from '../hook/useOrcamento';
import { useCliente } from '../hook/useCliente';
import { useProduto } from '../hook/useProduto';
import ItemLista from '../components/telas/ItemLista';
import ModalEdicao from '../components/telas/ModalEdicao';
import Error from '../components/telas/Error';
import Sucesso from '../components/telas/Sucesso';
import Loading from '../components/telas/Loading';
import Mensagem from '../components/telas/Mensagem';
import { MdArrowBackIos, MdSave, MdDelete } from 'react-icons/md';

import TextAutocomplete from '../components/controles/TextAutocomplete';
import DateInput from '../components/controles/DateInput';
import SelectInput from '../components/controles/SelectInput';
import { excluirOrcamentoItem } from '../service/serviceOrcamento';
import { DateToControl, DateToStr } from '../Util/date';
import { maskValor } from '../Util/mascara';
import OpenPDF from '../components/telas/OpenPDF';

export default function OrcamentosPage({ handleLogout }) {
  const [listaOrcamentos, setListaOrcamentos] = useState([]);
  const { getClientes } = useCliente();
  const { getProdutos } = useProduto();

  const [idOrcamento, setIdOrcamento] = useState();
  const [idCliente, setIdCliente] = useState();
  const [cliente, setCliente] = useState();
  const [codigoOrcamento, setCodigoOrcamento] = useState();
  const [dataValidade, setDataValidade] = useState(new Date());
  const [formaPagamento, setFormaPagmento] = useState();
  const [formaEnvio, setFormaEnvio] = useState();
  const [statusOrcamento, setStatusOrcamento] = useState();
  const [listaItensOrcamento, setListaItensOrcamento] = useState([]);
  const [totalOrcamento, setTotalOrcamento] = useState('');
  const [acao, setAcao] = useState('');

  const [orcamentoSelect, setOrcamentoSelect] = useState();
  const [key, setKey] = useState(0);
  const [nome, setNome] = useState('');

  const [listaClientes, setListaClientes] = useState([]);
  const [listaProdutos, setListaProdutos] = useState([]);
  const [pdfBase64, setPdfBase64] = useState();

  useEffect(() => {
    const getDadosClientes = async () => {
      const listaClientes = await getClientes();
      listaClientes.forEach(function (cliente) {
        cliente['id'] = cliente.id_cliente;
        cliente['label'] = cliente.nome_cliente;
      });
      setListaClientes(listaClientes);
    };
    const getDadosProdutos = async () => {
      const listaProdutos = await getProdutos();
      listaProdutos.forEach(function (produto) {
        produto['id'] = produto.id_produto;
        produto[
          'label'
        ] = `${produto.descricao} - ${produto.unidade} - ${produto.altura} X ${produto.largura} X ${produto.comprimento} `;
      });
      setListaProdutos(listaProdutos);
    };
    getDadosClientes();
    getDadosProdutos();
  }, []);

  const onHandleCliente = value => {
    setCliente(value);
    setIdCliente(value.id_cliente);
  };

  const onHandleProduto = (index, value) => {
    // debugger;
    // const jaSelecionado = listaItensOrcamento.filter(
    //   x => x.id_produto === value.id_produto
    // );
    // if (jaSelecionado.length > 0) {
    //   setErroMensage('Item já selecionado');
    //   return;
    // }

    const listaItensOrcamentoNew = listaItensOrcamento;
    listaItensOrcamentoNew[index].quantidade = 1;
    listaItensOrcamentoNew[index].valor_unitario = parseFloat(
      value.valor_venda
    );

    listaItensOrcamentoNew[index].id_produto = value.id_produto;
    listaItensOrcamentoNew[index].descricao = value.descricao;
    listaItensOrcamentoNew[index].unidade = value.unidade;
    listaItensOrcamentoNew[index].volume = value.volume;

    listaItensOrcamentoNew[index].total = maskValor(
      (
        listaItensOrcamentoNew[index].quantidade *
        listaItensOrcamentoNew[index].valor_unitario
      ).toString()
    );
    setListaItensOrcamento(listaItensOrcamentoNew);
    const total = getTotalItens(listaItensOrcamentoNew);

    setTotalOrcamento(total);
    setKey(key + 1);
    console.log(value);
  };

  const {
    getOrcamentos,
    updateOrcamento,
    addOrcamento,
    excluirOrcamento,
    getById,
    getPDF,
  } = useOrcamento();

  const [nomeFiltro, setNomeFiltro] = useState('');

  async function handleBuscar() {
    if (!nomeFiltro) return;
    setErroGeral('');
    try {
      setIsProcessing(true);
      const listaOrcamentoFiltro = await getOrcamentos(nomeFiltro);

      setListaOrcamentos(listaOrcamentoFiltro);
      setKey(key + 1);
      setIsProcessing(false);
    } catch (erro) {
      setIsProcessing(false);
      setErroGeral(erro.message);
    }
  }

  const [erroGeral, setErroGeral] = useState('');
  const [erroMensage, setErroMensage] = useState('');
  const [mensageSucesso, setMensageSucesso] = useState('');

  const [isProcessing, setIsProcessing] = useState(false);

  const [validado, setValidado] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [isOpenMensagem, setIsOpenMensagem] = useState(false);

  async function handleItemClick(index) {
    const itemSelected = listaOrcamentos[index];
    openOrcamento(itemSelected.id_orcamento);
  }

  async function openOrcamento(id_orcamento) {
    const orcamento = await getById(id_orcamento);

    limparDados();

    console.log(orcamento);

    setListaItensOrcamento(orcamento.itens);
    //setOrcamentoSelect(itemSelected);
    setIdOrcamento(orcamento.id_orcamento);
    setIdCliente(orcamento.id_cliente);
    setCodigoOrcamento(orcamento.codigo_orcamento);
    setDataValidade(DateToControl(new Date(orcamento.data_validade)));
    setFormaPagmento(orcamento.forma_pagamento);
    setFormaEnvio(orcamento.forma_envio);
    setStatusOrcamento(orcamento.status_orcamento);
    setTotalOrcamento(getTotalItens(orcamento.itens));
    setNome(orcamento.nome_cliente);
    setOpenModal(true);
    setKey(key + 1);
  }

  function getTotalItens(lista) {
    const total = lista.reduce((resultado, quantidade) => {
      return (
        parseFloat(resultado) +
        parseFloat(quantidade.valor_unitario) * parseInt(quantidade.quantidade)
      );
    }, 0);

    return maskValor(total.toString());
  }

  function handleNovo() {
    limparDados();
    setOpenModal(true);
  }
  async function handleExluir() {
    setAcao('E');
    setErroMensage('');
    setIsProcessing(true);
    try {
      if (idOrcamento > 0) {
        const retorno = await excluirOrcamento(idOrcamento);

        processaRetorno(retorno);
      }
    } catch (erro) {
      setIsProcessing(false);

      setErroMensage(erro.message);
    }
  }

  function limparDados() {
    setValidado(false);
    setIdOrcamento(0);
    setIdCliente(0);
    setCodigoOrcamento('');
    setDataValidade('');
    setFormaPagmento('');
    setFormaEnvio('');
    setStatusOrcamento('');
    setListaItensOrcamento([]);
    setNome('');
    setTotalOrcamento(maskValor('0'));
  }

  function handleFecharModal() {
    setMensageSucesso('');
    if (acao == 'E') setOpenModal(false);
    handleBuscar();
  }
  async function handleSalvar() {
    setErroMensage('');
    setAcao('A');
    setIsProcessing(true);
    if (dadosValidos()) {
      const orcamento = {
        id_orcamento: idOrcamento,
        id_cliente: idCliente,
        data_validade: dataValidade,
        forma_pagamento: formaPagamento,
        forma_envio: formaEnvio,
        status_orcamento: statusOrcamento,
        itens: listaItensOrcamento,
      };
      try {
        if (idOrcamento > 0) {
          const retorno = await updateOrcamento(orcamento);
          processaRetorno(retorno);
        } else {
          const retorno = await addOrcamento(orcamento);

          processaRetorno(retorno);
          openOrcamento(retorno.Orcamento[0].id_orcamento);
        }
      } catch (erro) {
        setIsProcessing(false);

        setErroMensage(erro.message);
      }
    } else setIsProcessing(false);
    setValidado(true);
  }

  async function handleGerarPDF() {
    setErroMensage('');
    setIsProcessing(true);
    try {
      if (idOrcamento > 0) {
        const retorno = await getPDF(idOrcamento);
        setPdfBase64(retorno);
        setIsProcessing(false);
      }
    } catch (erro) {
      setIsProcessing(false);

      setErroMensage(erro.message);
    }
  }

  function handleCancelar() {
    setOpenModal(false);
  }

  function processaRetorno(retorno) {
    setIsProcessing(false);
    if (!retorno.sucesso) setErroMensage(retorno.mensagem);
    else {
      setMensageSucesso(retorno.mensagem);
    }
  }

  function dadosValidos() {
    setValidado(true);

    return idCliente > 0;
    //   email.trim().length > 5 &&
    //   cpf.trim().length === 14
    //   //telefone.trim().length === 15
  }

  function handleCloseMensagem() {
    setIsOpenMensagem(false);
    setOpenModal(true);
    setKey(key + 1);
  }

  function renderFormaEnvio() {
    const forma = ['', 'TRANSPORTADORA', 'RETIRA'];
    return forma.map((F, index) => {
      return (
        <option key={index} value={F}>
          {F}
        </option>
      );
    });
  }

  function renderFormaPagamento() {
    const forma = ['', 'BOLETO', 'CRÉDITO', 'DÉBITO', 'PIX'];
    return forma.map((F, index) => {
      return (
        <option key={index} value={F}>
          {F}
        </option>
      );
    });
  }

  function renderStatus() {
    const forma = ['', 'ABERTO', 'FECHADO', 'PERDIDO'];
    return forma.map((F, index) => {
      return (
        <option key={index} value={F}>
          {F}
        </option>
      );
    });
  }

  function setQtdeItem(index, value) {
    const listaItensOrcamentoNew = listaItensOrcamento;
    listaItensOrcamentoNew[index].quantidade = value;
    listaItensOrcamentoNew[index].total = maskValor(
      (
        listaItensOrcamentoNew[index].quantidade *
        listaItensOrcamentoNew[index].valor_unitario
      ).toString()
    );
    setListaItensOrcamento(listaItensOrcamentoNew);
    const total = getTotalItens(listaItensOrcamentoNew);

    setTotalOrcamento(total);
    setKey(key + 1);
  }

  const handleAdicionarProduto = () => {
    const listaItensOrcamentoNew = listaItensOrcamento;
    const novoObjeto = {
      id_orcamento_item: 0,
      id_produto: 0,
      descricao: '',
      dimensao: '',
      altura: '',
      largura: '',
      comprimento: '',
      unidade: '',
      quantidade: 0,
      valor_unitario: 0,
      total: 0,
    };
    listaItensOrcamentoNew.push(novoObjeto);
    setListaItensOrcamento(listaItensOrcamentoNew);
    setKey(key + 1);
  };

  const handleExcluirItem = async index => {
    const listaItensOrcamentoOld = listaItensOrcamento;
    const id_orcamento_item = listaItensOrcamentoOld[index].id_orcamento_item;
    if (id_orcamento_item) {
      const retorno = await excluirOrcamentoItem(id_orcamento_item);
      if (retorno.sucesso) {
        const listaItensOrcamentoNova = listaItensOrcamento.filter(
          x => x.id_orcamento_item !== id_orcamento_item
        );
        setListaItensOrcamento(listaItensOrcamentoNova);
        setTotalOrcamento(getTotalItens(listaItensOrcamentoNova));
        setKey(key + 1);
      }
    } else {
      const listaItensOrcamentoNova = listaItensOrcamento;
      listaItensOrcamentoNova.splice(index, 1);
      setListaItensOrcamento(listaItensOrcamentoNova);
      setTotalOrcamento(getTotalItens(listaItensOrcamentoNova));
      setKey(key + 1);
    }
  };

  return (
    <>
      <Container handleLogout={handleLogout}>
        {/* <TextAutocomplete
          lista={names}
          labelDescription={'Cliente'}
          inputValue={idCliente}
          onInputChange={onHandleCliente}
        ></TextAutocomplete> */}
        {isProcessing && <Loading />}
        <Error>{erroGeral}</Error>
        {
          <div className="hidden md:flex text-left bg-cyan-600 text-sm rounded-sm pl-2 text-white"></div>
        }
        <div className="ml-5 mr-5 rounded-xl border-2 pl-6 pr-6 border-gray-600">
          <TextInput
            labelDescription="Nome"
            placeholder="Nome do Cliente ou numero do pedido"
            inputValue={nomeFiltro}
            autoFocus
            onInputChange={valor => setNomeFiltro(valor)}
          />
          <Button
            colorClass="bg-blue-600 w-30 md:w-40"
            onButtonClick={handleBuscar}
          >
            Buscar
          </Button>
          <Button
            colorClass="bg-green-600 w-30 md:w-50"
            onButtonClick={handleNovo}
          >
            CRIAR ORÇAMENTO
          </Button>
        </div>
        <div className="hidden md:flex text-left bg-cyan-600 text-sm rounded-sm pl-2 text-white"></div>
        <div style={{ height: '50px' }}></div>
        {listaOrcamentos.length > 0 && (
          <div className="w-full">
            {listaOrcamentos.map((orcamento, index) => {
              return (
                <ItemLista
                  key={index}
                  onItemClick={handleItemClick}
                  item={index}
                >
                  <div className="flex">
                    <div className="flex-2 pl-2">
                      <p className="text-sm">{orcamento.codigo_orcamento}</p>
                    </div>
                    <div className="flex-1 pl-2">
                      <p className="text-sm">{orcamento.nome_cliente}</p>
                    </div>
                    <div className="flex-2 pl-2">
                      <p className="text-sm">
                        {DateToStr(new Date(orcamento.data_validade))}
                      </p>
                    </div>
                  </div>
                </ItemLista>
              );
            })}
          </div>
        )}
        <ModalEdicao titulo="Orçamento" isOpenEdicao={openModal}>
          <div className="p-3">
            <div className="container shadow-lg shadow-black rounded-xl mt-5 border-2 md:p-6 p-3 border-gray-600 text-center">
              <div className="grid grid-cols-3 gap-4">
                <div className="col-span-1">
                  <TextInput
                    key={key}
                    labelDescription="CODIGO"
                    inputValue={codigoOrcamento}
                    autoFocus
                    disabled={true}
                    allowNull={false}
                  />
                </div>
                <div className="col-span-2">
                  <TextAutocomplete
                    lista={listaClientes}
                    inputValue={nome}
                    onInputChange={value => onHandleCliente(value)}
                    labelDescription="Cliente"
                    disabled={idOrcamento > 0}
                  ></TextAutocomplete>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="col-span-1">
                  <TextInput
                    labelDescription="Data Validade"
                    type="date"
                    inputValue={dataValidade}
                    onInputChange={valor => setDataValidade(valor)}
                  />
                </div>
                <div className="col-span-1">
                  <SelectInput
                    labelDescription="PAGAMENTO"
                    inputValue={formaPagamento}
                    onInputChange={valor => setFormaPagmento(valor)}
                  >
                    {renderFormaPagamento()}
                  </SelectInput>
                </div>
                <div className="col-span-1">
                  <SelectInput
                    labelDescription="ENVIO"
                    inputValue={formaEnvio}
                    onInputChange={valor => setFormaEnvio(valor)}
                  >
                    {renderFormaEnvio()}
                  </SelectInput>
                </div>

                <div className="col-span-1">
                  <SelectInput
                    labelDescription="STATUS"
                    inputValue={statusOrcamento}
                    onInputChange={valor => setStatusOrcamento(valor)}
                  >
                    {renderStatus()}
                  </SelectInput>
                </div>

                <div className="col-span-1"></div>

                <div className="col-span-1" key={key}>
                  <TextInput
                    labelDescription="TOTAL"
                    inputValue={totalOrcamento}
                    disabled={true}
                  ></TextInput>
                </div>
              </div>

              <div className="w-full">
                <div className="grid grid-cols-10">
                  <div className=" col-span-6 pl-10 font-bold text-left">
                    Produto - Un - Alt x Larg x Comp
                  </div>
                  <div className="font-bold text-center">QTDE</div>
                  <div className="font-bold text-right">Valor Unitário</div>

                  <div className="font-bold text-center">Total</div>
                  <div className="font-bold">
                    <p className="text-sm"></p>
                  </div>
                </div>
                <div key={key}>
                  {listaItensOrcamento.map((item, index) => {
                    return (
                      <ItemLista
                        key={index}
                        //onItemClick={handleItemClick}
                        item={index}
                      >
                        <div className="grid grid-cols-10">
                          <div className=" col-span-6">
                            <TextAutocomplete
                              lista={listaProdutos}
                              inputValue={`${item.descricao} - ${item.unidade} - ${item.altura} X ${item.largura} X ${item.comprimento} `}
                              onInputChange={value =>
                                onHandleProduto(index, value)
                              }
                              noDescription
                              labelDescription=""
                            ></TextAutocomplete>
                          </div>

                          <div className="">
                            <TextInput
                              inputValue={item.quantidade}
                              onInputBlur={value => setQtdeItem(index, value)}
                              noDescription
                              isNumero
                            ></TextInput>
                          </div>

                          <div className="text-sm text-right">
                            {maskValor(item.valor_unitario.toString())}
                          </div>

                          <div className="text-sm text-right">
                            {maskValor(item.total.toString())}
                          </div>

                          <div className=" ">
                            <Button
                              colorClass="bg-red-700"
                              onButtonClick={() => handleExcluirItem(index)}
                            >
                              <MdDelete />
                            </Button>
                          </div>
                        </div>
                      </ItemLista>
                    );
                  })}
                </div>
                <div>
                  <Button
                    colorClass="bg-green-700 w-50"
                    onButtonClick={handleAdicionarProduto}
                  >
                    ADICIONAR PRODUTO
                  </Button>
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
                    {idOrcamento > 0 && (
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

                    {idOrcamento > 0 && (
                      <Button
                        colorClass="bg-blue-700 w-32"
                        onButtonClick={handleGerarPDF}
                      >
                        GERAR PDF
                      </Button>
                    )}
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
        <OpenPDF base64String={pdfBase64} />,
      </Container>
    </>
  );
}
