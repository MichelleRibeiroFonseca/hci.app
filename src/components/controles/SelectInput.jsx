import { getNewId } from '../../service/idService';

export default function SelectInput({
  labelDescription = 'Descrição do Select',
  inputValue = 'Valor padrao do input',
  onInputChange = null,
  id = getNewId(),
  autoFocus = false,
  error = '',
  validado = false,
  allowNull = false,
  disabled = false,
  children,
}) {
  function handleInputChange({ currentTarget }) {
    if (onInputChange) {
      const newValue = currentTarget.value;
      onInputChange(newValue);
    }
  }

  const classe =
    validado && !inputValue && !allowNull ? ' text-red-700 border-red-700' : '';
  const classeDisabled = disabled ? 'bg-gray-400' : 'bg-gray-200';

  return (
    <div className="flex flex-col md:my-1 md:p-2  ">
      <label className="text-sm md:text-lg" htmlFor={id}>
        {labelDescription}
      </label>
      <select
        id={id}
        disabled={disabled}
        autoFocus={autoFocus}
        className={`rounded-md border p-2  ${classe} ${classeDisabled}`}
        value={inputValue}
        onChange={handleInputChange}
      >
        {children}
      </select>
    </div>
  );
}
