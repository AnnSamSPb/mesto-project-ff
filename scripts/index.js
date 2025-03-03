// Темплейт карточки
const cardTemplate = document.querySelector("#card-template").content;

// DOM узлы
const placesList = document.querySelector(".places__list");

// Функция создания карточки
function createCardElement(cardData, deleteCard) {
  const newCard = cardTemplate.querySelector(".card").cloneNode(true);

  const cardImage = newCard.querySelector(".card__image");
  const cardTitle = newCard.querySelector(".card__title");
  const deleteButton = newCard.querySelector(".card__delete-button");

  cardImage.src = cardData.link;
  cardImage.alt = `Фото случайного места в ${cardData.name}`;
  cardTitle.textContent = cardData.name;

  // Обработчик для удаления карточки
  deleteButton.addEventListener("click", deleteCard);

  return newCard;
}

// Функция удаления карточки
function deleteCard(evt) {
  const targetCard = evt.target.closest(".card");
  targetCard.remove();
}

// Вывести карточки на страницу
function renderCardElement(cardData, container) {
  const cardElement = createCardElement(cardData, deleteCard);
  container.append(cardElement);
}

initialCards.forEach(cardData => {
  renderCardElement(cardData, placesList);
});