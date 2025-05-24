// Функция управления состоянием кнопки попапа
export const setButtonState = (button, isLoading, options = {}) => {
  const {
    defaultText = 'Сохранить',
    loadingText = 'Сохранение...'
  } = options;
  
  button.textContent = isLoading ? loadingText : defaultText;
  button.disabled = isLoading;
};
