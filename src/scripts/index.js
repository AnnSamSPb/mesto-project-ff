import {
  openModal,
  closeModal,
  setupPopupClose,
  setButtonState
} from '../components/modal.js';
import {
  createCardElement,
  handleLike,
  handleDelete
} from '../components/card.js';
import {
  enableValidation,
  clearValidation
} from '../components/validation.js';
import {
  getProfileInfoApi,
  updateProfileInfoApi,
  updateAvatarApi,
  getInitialCardsApi,
  addNewCardApi,
  deleteCardApi,
  likeCardApi,
  unlikeCardApi
} from './api.js';
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
const profileImageContainer = document.querySelector('.profile__image-container');
const profileImage = document.querySelector(".profile__image");
const popupEdit = document.querySelector(".popup_type_edit");
const popupNewCard = document.querySelector(".popup_type_new-card");
const popupImage = document.querySelector(".popup_type_image");
const popupAvatar = document.querySelector(".popup_type_avatar");
const popupDelete = document.querySelector(".popup_type_confirm-delete");
const confirmDeleteBtn = popupDelete.querySelector(".popup__button");
const formEditProfile = document.forms['edit-profile'];
const formAddCard = document.forms['new-place'];
const formAvatar = document.forms['avatar-form'];
const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');

let userId = null;
let currentCardToDelete = null;

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
  const name = formEditProfile.elements.name.value;
  const about = formEditProfile.elements.description.value;
  
  const submitButton = formEditProfile.querySelector('.popup__button');
  
  setButtonState(submitButton, true);

  updateProfileInfoApi(name, about)
    .then((userData) => {
      profileTitle.textContent = userData.name;
      profileDescription.textContent = userData.about;
      closeModal(popupEdit);
    })
    .catch(err => console.error(err))
    .finally(() => setButtonState(submitButton, false));
};

// Обработчик добавления новой карточки
const handleAddCardFormSubmit = (evt) => {
  evt.preventDefault();
  const name = formAddCard.elements['place-name'].value;
  const link = formAddCard.elements.link.value;

  const submitButton = formAddCard.querySelector('.popup__button');
  
  setButtonState(submitButton, true);

  addNewCardApi(name, link)
    .then((newCard) => {
      placesList.prepend(
        createCardElement(
          newCard, 
          (evt) => handleLikeCard(evt, newCard._id), 
          (element) => handleDeleteCard(newCard._id, element), 
          openImagePopup,
          userId
        )
      );

      formAddCard.reset();
      closeModal(popupNewCard);
    })
    .catch(err => console.error(err))
    .finally(() => setButtonState(submitButton, false));
};

// Обработчик отправки формы аватврки
const handleAvatarFormSubmit = (evt) => {
  evt.preventDefault();
  const avatar = formAvatar.elements['avatar-link'].value;
  
  const submitButton = formAvatar.querySelector('.popup__button');
  setButtonState(submitButton, true, 'Сохранить');

  updateAvatarApi(avatar)
    .then((userData) => {
      profileImage.style.backgroundImage = `url(${userData.avatar})`;
      closeModal(popupAvatar);
    })
    .catch(err => console.error(err))
    .finally(() => setButtonState(submitButton, false));
};

// Обработчик лайка
const handleLikeCard = (evt, cardId) => {
  const isLiked = evt.target.classList.contains('card__like-button_is-active');
  const likeApi = isLiked ? unlikeCardApi : likeCardApi;
  
  likeApi(cardId)
    .then(() => {
      handleLike(evt);
      // Обновляем счетчик лайков
      const likeCount = evt.target.nextElementSibling;
      likeCount.textContent = isLiked 
        ? parseInt(likeCount.textContent) - 1 
        : parseInt(likeCount.textContent) + 1;
    })
    .catch(err => console.error(err));
};

// Обработчик удаления карточки
const handleDeleteCard = (cardId, cardElement) => {
  openModal(popupDelete);
  
  setButtonState(confirmDeleteBtn, false, {
    defaultText: 'Да',
    loadingText: 'Удаление...'
  });
  
  currentCardToDelete = { cardId, cardElement };
};

confirmDeleteBtn.addEventListener('click', () => {
  if (!currentCardToDelete) return;
  
  deleteCardApi(currentCardToDelete.cardId)
    .then(() => {
      handleDelete(currentCardToDelete.cardElement);
      closeModal(popupDelete);
    })
    .catch(err => {
      console.error(err);
      setButtonState(confirmDeleteBtn, false);
    })
    .finally(() => {
      currentCardToDelete = null;
    });
});

// Инициализация
// Инициализация карточек
const initCards = (cards, userId) => {
  cards.forEach(cardData => {
    placesList.append(createCardElement(
      cardData,
      (evt) => handleLikeCard(evt, cardData._id),
      (element) => handleDeleteCard(cardData._id, element),
      openImagePopup,
      userId
    ));
  });
};

// Инициализация событий
const initEventListeners = () => {
  formEditProfile.addEventListener('submit', handleProfileFormSubmit);
  formAddCard.addEventListener('submit', handleAddCardFormSubmit);
  formAvatar.addEventListener('submit', handleAvatarFormSubmit);

  editButton.addEventListener('click', () => {
    formEditProfile.elements.name.value = profileTitle.textContent;
    formEditProfile.elements.description.value = profileDescription.textContent;
    clearValidation(formEditProfile, validationConfig);
    openModal(popupEdit);
  });

  addButton.addEventListener('click', () => {
    formAddCard.reset();
    clearValidation(formAddCard, validationConfig);
    openModal(popupNewCard);
  });

  profileImageContainer.addEventListener('click', () => {
    formAvatar.reset();
    clearValidation(formAvatar, validationConfig);
    openModal(popupAvatar);
  });

  setupPopupClose(popupEdit);
  setupPopupClose(popupNewCard);
  setupPopupClose(popupImage);
  setupPopupClose(popupAvatar);
  setupPopupClose(popupDelete);
};

// Инициализация приложения
const init = () => {
  Promise.all([getProfileInfoApi(), getInitialCardsApi()])
    .then(([userData, cards]) => {
      userId = userData._id;
      profileTitle.textContent = userData.name;
      profileDescription.textContent = userData.about;
      profileImage.style.backgroundImage = `url(${userData.avatar})`;
      initCards(cards, userId);
    })
    .catch(err => console.error(err));

  initEventListeners();
  enableValidation(validationConfig);
};

init();