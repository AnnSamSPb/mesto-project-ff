import { likeCardApi, unlikeCardApi } from '../scripts/api';

// Функция создания карточки
export const createCardElement = (cardData, handleDelete, handleImageClick, userId) => {
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
  likeButton.addEventListener("click", handleLikeCard(cardData._id, likeButton, likeCount));
  newCard.querySelector(".card__image").addEventListener("click", () => handleImageClick(cardData));
  
  return newCard;
};

// Функция обработчика событий - удаление
export const handleDelete = (cardElement) => {
  cardElement.remove();
};

// Функция обработчика событий - лайк
export const handleLikeCard = (cardId, likeButton, likeCount) => {
  return (evt) => {
    evt.preventDefault();
    const isLiked = evt.target.classList.contains('card__like-button_is-active');
    const likeApi = isLiked ? unlikeCardApi : likeCardApi;
    
  likeApi(cardId)
    .then(() => {
      toggleLike(likeButton);
      updateLikeCounter(likeCount, isLiked);
    })
    .catch(err => console.error(err));
  };
};

// Вспомогательные функции
const toggleLike = (likeButton) => {
  likeButton.classList.toggle('card__like-button_is-active');
};

const updateLikeCounter = (counterElement, isLiked) => {
  const currentCount = parseInt(counterElement.textContent);
  counterElement.textContent = isLiked ? currentCount - 1 : currentCount + 1;
};
