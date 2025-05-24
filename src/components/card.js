// Функция создания карточки
export const createCardElement = (cardData, handleLike, handleDelete, handleImageClick, userId) => {
  const cardTemplate = document.querySelector("#card-template").content;
  const newCard = cardTemplate.querySelector(".card").cloneNode(true);

  // Наполнение карточки данными
  newCard.querySelector(".card__image").src = cardData.link;
  newCard.querySelector(".card__image").alt = `Фото места: ${cardData.name}`;
  newCard.querySelector(".card__title").textContent = cardData.name;

  // Работа с лайками
  const likeButton = newCard.querySelector(".card__like-button");
  const likeCount = newCard.querySelector(".card__like-count");
  
  likeCount.textContent = cardData.likes.length;
  if (cardData.likes.some(user => user._id === userId)) {
    likeButton.classList.add('card__like-button_is-active');
  }

  // Проверка владельца и настройка кнопки удаления
  const deleteButton = newCard.querySelector(".card__delete-button");
  if (cardData.owner._id === userId) {
    deleteButton.addEventListener('click', () => {
      handleDelete(newCard);
    })
  } 
  else {
    deleteButton.remove();
  }

  // Добавление обработчиков событий
  likeButton.addEventListener("click", handleLike);
  newCard.querySelector(".card__image").addEventListener("click", () => handleImageClick(cardData));
  
  return newCard;
};

// Функция обработчика событий - лайк
export const handleLike = (evt) => {
  evt.target.classList.toggle('card__like-button_is-active');
};

// Функция обработчика событий - удаление
export const handleDelete = (cardElement) => {
  cardElement.remove();
};
