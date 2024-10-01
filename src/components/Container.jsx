import Menu from "./Menu";
import logo from "../logo_hci.jpg";
import { useEffect } from "react";
import { MdLogout } from "react-icons/md";

export default function Container(props) {
  const { handleLogout } = props;

  useEffect(() => {
    // Definir o fundo branco para o body
    document.body.style.backgroundColor = "#fff";
    return () => {
      document.body.style.backgroundColor = null;
    };
  }, []);

  return (
    <div className="flex flex-col min-h-screen w-full bg-white box-border">
      {/* Cabeçalho */}
      <div className="flex items-center justify-between p-5 h-20 border-b-2 border-gray-300 bg-gray-100">
        {/* Logo */}
        <img
          src={logo}
          alt="logo"
          className="h-16 object-contain  mt-2"
          ml-20
        />

        {/* Título no centro */}
        <div className="font-black text-1xl text-black text-center flex-1 ml-20">
          Gestão de Orçamentos
        </div>

        {/* Botão de Logout */}
        <button
          onClick={handleLogout}
          className="w-24 h-24 border-none bg-transparent flex justify-center items-center cursor-pointer"
          title="Clique aqui para sair"
        >
          <MdLogout
            //className="text-red-600 text-5xl"
            src={logo}
            alt="logo"
            className="h-16 object-contain  mt-2 text-red-600 text-3xl 
            ml-10"
          />
        </button>
      </div>

      {/* Corpo da página com Menu e Conteúdo */}
      <div className="flex flex-col md:flex-row flex-1">
        {/* Menu à esquerda */}
        <div className="md:w-1/10 p-2 border-r-2 border-gray-300 text-left bg-gray-100">
          <Menu />
        </div>

        {/* Conteúdo à direita */}
        <div className="flex-1 p-5 md:ml-5 md:mt-5">{props.children}</div>
      </div>
    </div>
  );
}
