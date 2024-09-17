import { useState } from "react";
import Menu from "../telas/Menu";
// import MenuMobile from "../telas/MenuMobile";

import { FiMenu } from "react-icons/fi";

export default function Header({ submenu }) {
  const [abrirMenu, setAbrirMenu] = useState(false);
  function onAbrirMenu() {
    setAbrirMenu(!abrirMenu);
  }

  return (
    <>
      <div className="m-5 rounded-xl mt-5 border-2 p-2 text-left font-semibold">
        <div className="flex">
          <div className="flex-1">STUDIO INFINITY</div>
          <div className="md:hidden flex">
            <FiMenu onClick={onAbrirMenu}></FiMenu>
          </div>
          <div className="hidden md:flex flex-1">
            <Menu></Menu>
          </div>
        </div>

        {/* <div className="flex-1" style={{ fontSize: 0.5 + 'rem' }}>
          {' '}
          {process.env.REACT_APP_VERSION}
        </div> */}
        {/* <div className="flex-1">
          <MenuMobile
            openMenu={abrirMenu}
            closeMenu={() => setAbrirMenu(false)}
          ></MenuMobile>
        </div> */}
        {submenu && (
          <div className="hidden md:flex text-left bg-cyan-600 text-sm rounded-sm pl-2 text-white ">
            {submenu}
          </div>
        )}
      </div>
    </>
  );
}
