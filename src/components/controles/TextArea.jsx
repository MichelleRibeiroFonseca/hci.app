import { getNewId } from "../services/idService";

export default function TextArea({
  labelDescription = "Descrição do Label",
  inputValue = "Valor padrao do input",
  onTextAreaChange = null,
  id = getNewId(),
  maxLength = 230,
  rows = 4,
}) {
  function handleInputChange({ currentTarget }) {
    if (onTextAreaChange) {
      const newValue = currentTarget.value;
      onTextAreaChange(newValue);
    }
  }

  const currenteCharacterCount = inputValue.length;

  return (
    <div className="flex flex-col my-4 p-2">
      <label className="text-sm mb-1" htmlFor={id}>
        {labelDescription}
      </label>
      <textarea
        type="text"
        id={id}
        className="border p-1"
        value={inputValue}
        onChange={handleInputChange}
        rows={rows}
        maxLength={maxLength}
      />

      <div className="text-right mr-2">
        <span>
          {currenteCharacterCount} / {maxLength}
        </span>
      </div>
    </div>
  );
}
