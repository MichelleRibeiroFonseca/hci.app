import { ClipLoader } from "react-spinners";

export default function Loading() {
  return (
    <div className="text-center loading">
      <p>
        <ClipLoader />
        <div className="text-white">Carregando</div>
      </p>
    </div>
  );
}
