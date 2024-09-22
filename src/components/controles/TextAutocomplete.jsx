import { TextField, Autocomplete } from '@mui/material';

function TextAutocomplete({
  lista = [],
  labelDescription = '',
  inputValue = 'Valor padrao do input',
  onInputChange = null,
  noDescription = false,
  disabled = false,
}) {
  // function handleInputChange({ currentTarget }) {
  //   let newValue = currentTarget.value;
  //   currentTarget.value = newValue;
  //   if (onInputChange) {
  //     onInputChange(newValue);
  //   }
  // }

  return (
    <div className="flex flex-col md:my-1 md:p-2  ">
      {!noDescription && labelDescription && (
        <label className="text-sm md:text-lg">{labelDescription}</label>
      )}
      <Autocomplete
        defaultValue={inputValue}
        clearOnBlur={false}
        options={lista}
        disabled={disabled}
        //value={inputValue}
        onChange={(event, newValue) => {
          onInputChange(newValue);
        }}
        renderInput={params => (
          <TextField {...params} label={labelDescription} variant="outlined" />
        )}
      />
    </div>
  );
}

export default TextAutocomplete;
