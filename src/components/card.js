// Функция создания карточки
export const createCardElement = (cardData, handleLike, handleDelete, handleImageClick) => {
  const cardTemplate = document.querySelector("#card-template").content;
  const newCard = cardTemplate.querySelector(".card").cloneNode(true);

  newCard.querySelector(".card__image")
    .src = cardData.link;
  newCard.querySelector(".card__image")
    .alt = `Фото случайного места в ${cardData.name}`;
  newCard.querySelector(".card__title")
    .textContent = cardData.name;

  // Назначаем обработчики событий
  newCard.querySelector(".card__like-button")
    .addEventListener("click", handleLike);

  newCard.querySelector(".card__delete-button")
    .addEventListener("click", () => handleDelete(newCard));

  newCard.querySelector(".card__image")
    .addEventListener("click", () => handleImageClick(cardData));

  return newCard;
}

// Функция обработчика событий - лайк
export const handleLike = (evt) => {
  evt.target.classList.toggle('card__like-button_is-active');
}

// Функция обработчика событий - удаление
export const handleDelete = (cardElement) => {
  cardElement.remove();
}
