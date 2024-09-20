import { ClipLoader } from "react-spinners";

export default function Loading() {
  return (
    <div className="text-center loading">
      <ClipLoader />
      <div className="text-white">Carregando</div>
    </div>
  );
}
