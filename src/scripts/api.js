// Конфигурация API

const config = {
  apiBaseUrl: 'https://nomoreparties.co/v1/wff-cohort-38',
  headers: {
    authorization: '602313f1-9488-4001-aaef-0871c25d361d',
    'Content-Type': 'application/json'
  }
}

// Универсальная проверка ответа
const checkResponse = res => {
  if (res.ok) {
    return res.json();
  };
  return Promise.reject(`Ошибка: ${res.status}`);
}

// API для профиля

// Загрузка данных профиля
export const getProfileInfoApi = () => {
  return fetch(`${config.apiBaseUrl}/users/me`, {
    headers: config.headers
  })
  .then(checkResponse)
};

// Обновление профиля
export const updateProfileInfoApi = (name, about) => {
  return fetch(`${config.apiBaseUrl}/users/me`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({ name, about })
  })
  .then(checkResponse)
};

// Обновление аватарки
export const updateAvatarApi = avatar => {
  return fetch(`${config.apiBaseUrl}/users/me/avatar`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({ avatar })
  })
  .then(checkResponse)
};

// API для карточек

// Загрузка начальных карточек
export const getInitialCardsApi = () => {
  return fetch(`${config.apiBaseUrl}/cards`, {
    headers: config.headers
  })
  .then(checkResponse);
};

// Добавление новой карточки
export const addNewCardApi = (name, link) => {
  return fetch(`${config.apiBaseUrl}/cards`, {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify({ name, link })
  })
  .then(checkResponse)
};

// Удаление карточки
export const deleteCardApi = cardId => {
  return fetch(`${config.apiBaseUrl}/cards/${cardId}`, {
    method: 'DELETE',
    headers: config.headers
  })
  .then(checkResponse)
};

// Постановка лайка
export const likeCardApi = cardId => {
  return fetch(`${config.apiBaseUrl}/cards/likes/${cardId}`, {
    method: 'PUT',
    headers: config.headers
  })
  .then(checkResponse)
};

// Постановка дизлайка
export const unlikeCardApi = cardId => {
  return fetch(`${config.apiBaseUrl}/cards/likes/${cardId}`, {
    method: 'DELETE',
    headers: config.headers
  })
  .then(checkResponse)
};
