// import { getNewId } from "../../services/idService";
import { useState } from "react";
import {
  maskCPFCNPJ,
  maskCEP,
  maskCelular,
  maskValor,
} from "../../Util/mascara";

export default function TextInput({
  labelDescription = "Descrição do Label",
  inputValue = "Valor padrao do input",
  onInputChange = null,
  onInputBlur = null,
  id = 0, //getNewId(),
  autoFocus = false,
  error = "",
  validado = false,
  allowNull = false,
  maxLength = 100,
  type = "text",
  minValue = 0,
  disabled = false,
  isCPF = false,
  isCEP = false,
  isCelular = false,
  isValor = false,
  isNumero = false,
  exibirMobile = true,
  title = "",
  placeholder = "",
  noDescription = false,
}) {
  const [valor, setValor] = useState(inputValue);

  function handleInputChange({ currentTarget }) {
    let newValue = currentTarget.value;

    // Aplicar a máscara de número se isNumero for verdadeiro
    if (isNumero) {
      newValue = newValue.replace(/\D/g, ""); // Remove não dígitos
    }

    // Aplicar as outras máscaras
    if (isCPF) {
      newValue = maskCPFCNPJ(newValue);
    }
    if (isCEP) {
      newValue = maskCEP(newValue);
    }
    if (isCelular) {
      newValue = maskCelular(newValue);
    }
    if (isValor) {
      newValue = maskValor(newValue);
    }

    // Atualiza o campo e chama onInputChange
    currentTarget.value = newValue;
    setValor(newValue);
    if (onInputChange) {
      onInputChange(newValue);
    }
  }

  function handleInputBlur() {
    if (onInputBlur) onInputBlur(valor);
  }

  const classe =
    validado && !inputValue && !allowNull ? " text-red-700 border-red-700" : "";
  const classeDisabled = disabled ? "bg-gray-400" : "bg-gray-200";

  return (
    <div className="flex flex-col md:my-1 md:p-2  ">
      {!noDescription && exibirMobile && (
        <label className="text-sm md:text-lg" htmlFor={id}>
          {labelDescription}
        </label>
      )}
      <input
        type={type}
        min={minValue}
        id={id}
        disabled={disabled}
        autoFocus={autoFocus}
        className={`rounded-md border p-2 text-black  ${classe} ${classeDisabled}`}
        value={valor}
        onChange={handleInputChange}
        onBlur={handleInputBlur}
        maxLength={maxLength}
        title={title}
        placeholder={placeholder}
      />
      {/* {validado && !inputValue && (
        <label className="text-red-700 text-xs ">{error}</label>
      )} */}
    </div>
  );
}
