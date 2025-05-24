// Функции для работы с попапами

// Открытие попапа
export const openModal = (modal) => {
  modal.classList.add("popup_is-opened");
  document.addEventListener("keyup", handleEscKeyUp);
};

// Закрытие попапа
export const closeModal = (modal) => {
  modal.classList.remove("popup_is-opened");
  document.removeEventListener("keyup", handleEscKeyUp);
};

// Закрытие по Esc
const handleEscKeyUp = (evt) => {
  if (evt.key === 'Escape') {
    const popup = document.querySelector('.popup_is-opened');
    closeModal(popup);
  }
};

// Функция слушателей закрытия по крестику и оверлею
export const setupPopupClose = (modal) => {
  const closeButton = modal.querySelector(".popup__close");

  closeButton.addEventListener("click", () => {
    closeModal(modal);
  });

  modal.addEventListener("mousedown", (event) => {
    if (event.target === modal) {
      closeModal(modal);
    }
  });
};
