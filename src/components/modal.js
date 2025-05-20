// Функции для работы с попапами

// Открытие попапа
export const openModal = (modal) => {
  modal.classList.add("popup_is-opened");
  document.addEventListener("keyup", handleEscKeyUp);
}

// Закрытие попапа
export const closeModal = (modal) => {
  modal.classList.remove("popup_is-opened");
  document.removeEventListener("keyup", handleEscKeyUp);
}

// Закрытие по Esc
const handleEscKeyUp = (evt) => {
  if (evt.key === 'Escape') {
    const popup = document.querySelector('.popup_is-opened');
    closeModal(popup);
  }
}

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
}

// Вынесем все необходимые элементы формы в константы
const formElement = document.querySelector('.popup__form');
const formInput = formElement.querySelector('.popup__input');

// // Регулярные выражения для валидации
// const nameRegex = /^[a-zA-Zа-яА-ЯёЁ\s-]{2,40}$/;
// const descriptionRegex = /^[a-zA-Zа-яА-ЯёЁ\s-]{2,200}$/;

// Функция, которая добавляет класс с ошибкой (показывает ошибку)
// Функция, которая удаляет класс с ошибкой (скрывает ошибку)
// Функция, которая проверяет валидность поля





// Вызовем функцию
enableValidation();

// Функция проверки на невалидные поля


// Функция блокировки кнопки


