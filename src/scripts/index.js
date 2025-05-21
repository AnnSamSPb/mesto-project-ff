import { openModal, closeModal, setupPopupClose, checkInputValidity } from '../components/modal.js';
import { createCardElement, handleLike, handleDelete } from '../components/card.js';
import { enableValidation, clearValidation } from '../components/validation.js';
import initialCards from './cards.js';
import '../pages/index.css';

// Конфигурация валидации
const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_visible'
};

// DOM элементы
const placesList = document.querySelector(".places__list");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const popupEdit = document.querySelector(".popup_type_edit");
const popupNewCard = document.querySelector(".popup_type_new-card");
const popupImage = document.querySelector(".popup_type_image");
const formEditProfile = document.forms['edit-profile'];
const formAddCard = document.forms['new-place'];

const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');

// Единая функция для открытия попапа с изображением
const openImagePopup = (cardData) => {
  popupImage.querySelector('.popup__image')
    .src = cardData.link;
  popupImage.querySelector('.popup__image')
    .alt = `Фото места: ${cardData.name}`;
  popupImage.querySelector('.popup__caption')
    .textContent = cardData.name;

  openModal(popupImage);
};

// Обработчики форм
// Обработчик отправки формы профиля
const handleProfileFormSubmit = (evt) => {
  evt.preventDefault();
  profileTitle.textContent = formEditProfile.elements.name.value;
  profileDescription.textContent = formEditProfile.elements.description.value;
  closeModal(popupEdit);
};

// Обработчик добавления новой карточки
const handleAddCardFormSubmit = (evt) => {
  evt.preventDefault();
  
  const newCard = {
    name: formAddCard.elements['place-name'].value,
    link: formAddCard.elements.link.value
  };

  placesList.prepend(
    createCardElement(newCard, handleLike, handleDelete, openImagePopup)
  );

  formAddCard.reset();
  closeModal(popupNewCard);
};

// Инициализация
// Инициализация карточек
const initCards = () => {
  initialCards.forEach(cardData => {
    placesList.append(createCardElement(
      cardData,
      handleLike,
      handleDelete,
      openImagePopup
    ));
  });
};

// Инициализация событий
const initEventListeners = () => {
  // Обработчики форм
  formEditProfile.addEventListener('submit', handleProfileFormSubmit);
  formAddCard.addEventListener('submit', handleAddCardFormSubmit);

  // Кнопка редактирования профиля
  editButton.addEventListener('click', () => {
    formEditProfile.elements.name.value = profileTitle.textContent;
    formEditProfile.elements.description.value = profileDescription.textContent;
    clearValidation(formEditProfile, validationConfig);
    openModal(popupEdit);
  });

  // Кнопка добавления карточки
  addButton.addEventListener('click', () => {
    formAddCard.reset();
    clearValidation(formAddCard, validationConfig);
    openModal(popupNewCard);
  });

  // Настройка закрытия попапов
  setupPopupClose(popupEdit);
  setupPopupClose(popupNewCard);
  setupPopupClose(popupImage);
};

// Основная инициализация
const init = () => {
  initCards();
  initEventListeners();
  enableValidation(validationConfig);
};

// Запуск приложения
init();
