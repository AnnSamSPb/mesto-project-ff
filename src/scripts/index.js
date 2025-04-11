import { openModal, closeModal, setupPopupClose } from '../components/modal.js';
import { createCardElement, handleLike, handleDelete } from '../components/card.js';
import initialCards from './cards.js';
import '../pages/index.css';

// DOM узлы
const placesList = document.querySelector(".places__list");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const popupEdit = document.querySelector(".popup_type_edit");
const popupNewCard = document.querySelector(".popup_type_new-card");
const popupImage = document.querySelector(".popup_type_image");
const formEditProfile = document.forms['edit-profile'];
const formAddCard = document.forms['new-place'];

// Единая функция для открытия попапа с изображением
const openImagePopup = (cardData) => {
  popupImage.querySelector('.popup__image')
    .src = cardData.link;
  popupImage.querySelector('.popup__caption')
    .textContent = cardData.name;
  openModal(popupImage);
};

// Обработчики форм
const handleProfileFormSubmit = (evt) => {
  evt.preventDefault();
  profileTitle.textContent = formEditProfile.elements.name.value;
  profileDescription.textContent = formEditProfile.elements.description.value;
  closeModal(popupEdit);
};

const handleAddCardFormSubmit = (evt) => {
  evt.preventDefault();
  const newCard = {
    name: formAddCard.elements['place-name'].value,
    link: formAddCard.elements.link.value
  };

  placesList.prepend(createCardElement(
    newCard,
    handleLike,
    handleDelete,
    openImagePopup
  ));

  formAddCard.reset();
  closeModal(popupNewCard);
}

// Инициализация
const init = () => {
  // Загрузка карточек
  initialCards.forEach(cardData => {
    placesList.append(createCardElement(
      cardData,
      handleLike,
      handleDelete,
      openImagePopup
    ));
  });

  // Назначаем обработчики событий
  formEditProfile.addEventListener('submit', handleProfileFormSubmit);
  formAddCard.addEventListener('submit', handleAddCardFormSubmit);

  document.querySelector('.profile__edit-button').addEventListener('click', () => {
    formEditProfile.elements.name.value = profileTitle.textContent;
    formEditProfile.elements.description.value = profileDescription.textContent;
    openModal(popupEdit);
  });

  document.querySelector('.profile__add-button').addEventListener('click', () => {
    openModal(popupNewCard);
  });

  // Назначаем слушателей
  setupPopupClose(popupEdit);
  setupPopupClose(popupNewCard);
  setupPopupClose(popupImage);
};

init();
