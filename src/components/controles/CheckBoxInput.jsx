import { getNewId } from "../../services/idService";

export default function CheckBoxInput({
  labelDescription = "Descrição do checkbox",
  inputValue = "Valor padrao do input",
  onCheckBoxChange = null,
  id = getNewId(),
  autoFocus = false,
}) {
  function handleInputChange({ currentTarget }) {
    if (onCheckBoxChange) {
      onCheckBoxChange(currentTarget.checked);
    }
  }

  return (
    <div className="flex flex-row p-2 items-center space-x-2">
      <input
        type="checkbox"
        id={id}
        autoFocus={autoFocus}
        className="border p-1"
        checked={inputValue}
        onChange={handleInputChange}
      />

      <label className="text-sm md:text-lg mb-1 " htmlFor={id}>
        {labelDescription}
      </label>
    </div>
  );
}
