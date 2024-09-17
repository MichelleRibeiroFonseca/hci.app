export default function Button({
  children: description = "Descrição Botão",
  onButtonClick = null,
  colorClass = "bg-gray-300",
  type = "button",
}) {
  function handleButtonClick() {
    if (onButtonClick) {
      onButtonClick();
    }
  }

  return (
    <button
      className={`${colorClass} p-1 pl-2 pr-2 text-white font-semibold rounded-md m-1 text-sm`}
      onClick={handleButtonClick}
      type={type}
    >
      {description}
    </button>
  );
}
