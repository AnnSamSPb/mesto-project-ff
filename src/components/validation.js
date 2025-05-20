// // очистка ошибок валидации вызовом clearValidation
// clearValidation(profileForm, validationConfig);

// Функция показа ошибки
const showInputError = (formElement, inputElement, errorMessage, config) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(config.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(config.errorClass);
};

// const showInputError = (formElement, inputElement, errorMessage) => {
//   const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
//   inputElement.classList.add('popup__input_invalid');
//   errorElement.classList.add('popup__input-error_active');
//   errorElement.textContent = errorMessage;
// };

// Функция скрытия ошибки
const hideInputError = (formElement, inputElement, config) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(config.inputErrorClass);
  errorElement.textContent = '';
  errorElement.classList.remove(config.errorClass);
};

// const hideInputError = (formElement, inputElement) => {
//   const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
//   inputElement.classList.remove('popup__input_invalid');
//   errorElement.classList.remove('popup__input-error_active');
//   errorElement.textContent = '';
// };

// Проверка валидности поля
const checkInputValidity = (formElement, inputElement, config) => {
  if (inputElement.validity.patternMismatch) {
    inputElement.setCustomValidity(inputElement.dataset.errorMessage);
  } else {
    inputElement.setCustomValidity("");
  }

  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, config);
  } else {
    hideInputError(formElement, inputElement, config);
  }
};

// const checkInputValidity = (formElement, inputElement) => {
//   if (inputElement.validity.patternMismatch) {
//         // встроенный метод setCustomValidity принимает на вход строку
//         // и заменяет ею стандартное сообщение об ошибке
//     inputElement.setCustomValidity(inputElement.dataset.errorMessage);
//   } else {
//         // если передать пустую строку, то будут доступны
//         // стандартные браузерные сообщения
//     inputElement.setCustomValidity("");
//   }

//   if (!inputElement.validity.valid) {
//     showInputError(formElement, inputElement, inputElement.validationMessage);
//   } else {
//     hideInputError(formElement, inputElement);
//   }
// };

// Проверка наличия невалидных полей
const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

// const hasInvalidInput = (inputList) => {
//   // проходим по этому массиву методом some
//   return inputList.some((inputElement) => {
//     // Если поле не валидно, колбэк вернёт true
//     // Обход массива прекратится и вся функция
//     // hasInvalidInput вернёт true

//     return !inputElement.validity.valid;
//   })
// };

// Переключение состояния кнопки
const toggleButtonState = (inputList, buttonElement, config) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.disabled = true;
    buttonElement.classList.add(config.inactiveButtonClass);
  } else {
    buttonElement.disabled = false;
    buttonElement.classList.remove(config.inactiveButtonClass);
  }
};

// const toggleButtonState = (inputList, buttonElement) => {
//   // Если есть хотя бы один невалидный инпут
//   if (hasInvalidInput(inputList)) {
//     // сделай кнопку неактивной
//     buttonElement.disabled = true;
//     buttonElement.classList.add('popup__button_inactive');
//   } else {
//     // иначе сделай кнопку активной
//     buttonElement.disabled = false;
//     buttonElement.classList.remove('popup__button_inactive');
//   }
// };

// Установка слушателей событий для формы
const setEventListeners = (formElement, config) => {
  const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
  const buttonElement = formElement.querySelector(config.submitButtonSelector);

  toggleButtonState(inputList, buttonElement, config);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      checkInputValidity(formElement, inputElement, config);
      toggleButtonState(inputList, buttonElement, config);
    });
  });
};

// const setEventListeners = (formElement) => {
//   // Находим все поля внутри формы и формируем массив
//   const inputList = Array.from(formElement.querySelectorAll('.popup__input'));
//   // Найдём в текущей форме кнопку отправки
//   const buttonElement = formElement.querySelector('.popup__button');

//   // Вызовем toggleButtonState, чтобы не ждать ввода данных в поля
//   // toggleButtonState(inputList, buttonElement);

//   // Обойдём все элементы полученной коллекции
//   inputList.forEach((inputElement) => {
//     // каждому полю добавим обработчик события input
//     inputElement.addEventListener('input', () => {
//       // Внутри колбэка вызовем isValid,
//       // передав ей форму и проверяемый элемент
//       checkInputValidity(formElement, inputElement);
//       // Вызовем toggleButtonState и передадим ей массив полей и кнопку
//       toggleButtonState(inputList, buttonElement);
//     });
//   });
// };

// Включение валидации всех форм
export const enableValidation = (config) => {
  const formList = Array.from(document.querySelectorAll(config.formSelector));
  
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    
    setEventListeners(formElement, config);
  });
};

// const enableValidation = () => {
//   // Найдём все формы с указанным классом в DOM,
//   // сделаем из них массив методом Array.from
//   const formList = Array.from(document.querySelectorAll('.popup__form'));
//   // Переберём полученную коллекцию
//   formList.forEach((formElement) => {
//     formElement.addEventListener('submit', (evt) => {
//       evt.preventDefault();
//     });
//     // Для каждой формы вызовем функцию setEventListeners,
//     // передав ей элемент формы
//     setEventListeners(formElement);
//   });
// };

// Очистка валидации формы
export const clearValidation = (formElement, config) => {
  const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
  const buttonElement = formElement.querySelector(config.submitButtonSelector);

  inputList.forEach((inputElement) => {
    hideInputError(formElement, inputElement, config);
    inputElement.setCustomValidity("");
  });

  buttonElement.disabled = true;
  buttonElement.classList.add(config.inactiveButtonClass);
};