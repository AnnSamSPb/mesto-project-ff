// Темплейт карточки
const cardTemplate = document.querySelector("#card-template").content;

// DOM узлы
const placesList = document.querySelector(".places__list");

// Функция создания карточки
const createCardElement = (cardData, onDeleteCard) => {
  const newCard = cardTemplate.querySelector(".card").cloneNode(true);

  newCard.querySelector(".card__image")
    .src = cardData.link;
  newCard.querySelector(".card__image")
    .alt = `Фото случайного места в ${cardData.name}`;
  newCard.querySelector(".card__title")
    .textContent = cardData.name;

  // Обработчик для удаления карточки
  newCard.querySelector(".card__delete-button")
    .addEventListener("click", () => onDeleteCard(newCard));

  return newCard;
}

// Функция удаления карточки

const onDeleteCard = (cardElement) => cardElement.remove();

// Вывести карточки на страницу
const renderCardElement = (cardData, container) => {
  container.append(createCardElement(cardData, onDeleteCard));
}

initialCards.forEach(cardData => renderCardElement(cardData, placesList));