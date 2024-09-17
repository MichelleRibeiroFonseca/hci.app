// import { getNewId } from "../../services/idService";
import { maskCPF, maskCEP, maskCelular } from "../../Util/mascara";

export default function TextInput({
  labelDescription = "Descrição do Label",
  inputValue = "Valor padrao do input",
  onInputChange = null,
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
  exibirMobile = true,
}) {
  function handleInputChange({ currentTarget }) {
    if (isCPF) {
      currentTarget.value = maskCPF(currentTarget.value);
    }
    if (isCEP) {
      currentTarget.value = maskCEP(currentTarget.value);
    }
    if (isCelular) {
      currentTarget.value = maskCelular(currentTarget.value);
    }

    if (onInputChange) {
      const newValue = currentTarget.value;
      onInputChange(newValue);
    }
  }

  const classe =
    validado && !inputValue && !allowNull ? " text-red-700 border-red-700" : "";
  const classeDisabled = disabled ? "bg-gray-400" : "bg-gray-200";

  return (
    <div className="flex flex-col md:my-1 md:p-2  ">
      {exibirMobile && (
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
        className={`rounded-md border p-2  ${classe} ${classeDisabled}`}
        value={inputValue}
        onChange={handleInputChange}
        maxLength={maxLength}
      />
      {/* {validado && !inputValue && (
        <label className="text-red-700 text-xs ">{error}</label>
      )} */}
    </div>
  );
}
