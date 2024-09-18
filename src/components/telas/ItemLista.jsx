import React from "react";

export default function ItemLista({ children, onItemClick, item }) {
  const color = item % 2 === 0 ? "bg-gray-500" : " bg-gray-400";
  function handleItemClick() {
    if (onItemClick) onItemClick(item);
  }

  return (
    <div
      className={`itemLista pl-5 pr-5 pb-2 pt-2 ml-5 mr-2 border text-white ${color}  border-gray-300`}
      onClick={handleItemClick}
    >
      {children}
    </div>
  );
}
