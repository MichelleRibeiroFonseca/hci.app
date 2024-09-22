import { getNewId } from '../../service/idService';

export default function DateInput({
  labelDescription = 'Descrição do Label',
  inputValue = '2021-04-05',
  onInputChange = null,
  id = getNewId(),
  autoFocus = false,
}) {
  function handleInputChange({ currentTarget }) {
    if (onInputChange) {
      const newValue = currentTarget.value;
      onInputChange(newValue);
    }
  }

  return (
    <div className="flex flex-col my-4 p-2">
      <label className="text-sm mb-1" htmlFor={id}>
        {labelDescription}
      </label>
      <input
        autoFocus={autoFocus}
        type="date"
        id={id}
        className="border p-1"
        value={inputValue}
        onChange={handleInputChange}
      />
    </div>
  );
}
