import { _post, _getCEP } from "./httpService";

export async function getCEP(CEP) {
  try {
    const parametro = CEP.replace("-", "");
    const retorno = await _getCEP(
      `https://viacep.com.br/ws/${parametro}/json/`
    );
    console.log(retorno);
    return retorno;
  } catch (erro) {
    throw erro;
  }
}

export async function validaLogin(email, senha, notification_id) {
  var data = {
    email: email,
    senha: senha,
    notification_id: notification_id,
  };
  const retorno = await _post("/validaLogin", data);
  return retorno;
}

// export async function apiGetAllFlashCards() {
//   const allFlashCards = await read('/flashcards');
//   return allFlashCards;
// }

// export async function apiDeleteFlashCard(cardId) {
//   await exclude(`/flashcards/${cardId}`);
// }

// export async function apiCreateFlashCard(title, description) {
//   const newFlashCard = create('/flashcards', {
//     id: getNewId(),
//     title,
//     description,
//   });

//   return newFlashCard;
// }

// export async function apiUpdateFlashCard(cardId, title, description) {
//   const updatedFlashCard = edit(`/flashcards/${cardId}`, {
//     title,
//     description,
//   });

//   return updatedFlashCard;
// }
