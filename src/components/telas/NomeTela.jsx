import React from "react";

export default function NomeTela({ children }) {
  return (
    <div className=" mb-5 text-center text-sm md:text-3xl underline">
      {children}
    </div>
  );
}
