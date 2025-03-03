// Темплейт карточки
const cardTemplate = document.querySelector("#card-template").content;

// DOM узлы
const placesList = document.querySelector(".places__list");

// Функция создания карточки
function createCard(cardData, deleteCardCallback) {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);

  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");
  const deleteButton = cardElement.querySelector(".card__delete-button");

  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  cardTitle.textContent = cardData.name;

  // Обработчик для удаления карточки
  deleteButton.addEventListener("click", deleteCardCallback);

  return cardElement;
}

// Функция удаления карточки
function deleteCard(evt) {
  const cardElement = evt.target.closest(".card");
  cardElement.remove();
}

// Вывести карточки на страницу
function renderCard(cardData, container) {
  const cardElement = createCard(cardData, deleteCard);
  container.appendChild(cardElement);
}

initialCards.forEach((cardData) => {
  renderCard(cardData, placesList);
});