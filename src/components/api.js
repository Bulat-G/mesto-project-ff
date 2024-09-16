export const config = {
  baseUrl: 'https://nomoreparties.co/v1/wff-cohort-22',
  headers: {
    authorization: '9be71888-776c-4522-b74c-ee78d127beb2',
    'Content-Type': 'application/json'
  }
}

function checkResponse(res) {
  if (res.ok) {
    return res.json();
  } 
  return Promise.reject(res.status);  
}

// получить инфо пользователя
export function getUserInfo() {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: {
      authorization: config.headers.authorization
    }
  })
    .then(res => checkResponse(res))       
}

// получить карточки
export function getInitialCards() {
  return fetch(`${config.baseUrl}/cards`, {
    headers: {
      authorization: config.headers.authorization
    }
  })
    .then(res => checkResponse(res))
}

// обновление на сервере инфо пользователя
export function editProfile(profileInfo) {
  return fetch (`${config.baseUrl}/users/me`, {
    method: 'PATCH',
    headers: {
      authorization: config.headers.authorization,
      'Content-Type': config.headers['Content-Type']
    },
    body: JSON.stringify({
      name: profileInfo.title.textContent,
      about: profileInfo.description.textContent
    })
  })
  .then(res => checkResponse(res))
}

// отправка на сервер добавленной карточки
export function postAddCard(dataCard) {
  return fetch (`${config.baseUrl}/cards`, {
    method: 'POST',
    headers: {
      authorization: config.headers.authorization,
      'Content-Type': config.headers['Content-Type']
    },
    body: JSON.stringify({
      name: dataCard.name,
      link: dataCard.link
    })
  })
  .then(res => checkResponse(res))
}

// удаление карточки с сервера
export function deleteCardServer (cardId) {
  fetch (`${config.baseUrl}/cards/${cardId}`, {
    method: 'DELETE',
    headers: {
      authorization: config.headers.authorization,
      'Content-Type': config.headers['Content-Type']
    }    
  })
}

// добавление лайка на сервер
export function addLikeServer(cardId) {
  return fetch (`${config.baseUrl}/cards/likes/${cardId}`, {
    method: 'PUT',
    headers: {
      authorization: config.headers.authorization,
      'Content-Type': config.headers['Content-Type']
    }
  })
  .then(res => checkResponse(res))
}

// удаление лайка с сервера
export function deleteLikeServer(cardId) {
  return fetch (`${config.baseUrl}/cards/likes/${cardId}`, {
    method: 'DELETE',
    headers: {
      authorization: config.headers.authorization,
      'Content-Type': config.headers['Content-Type']
    }   
  })
  .then(res => checkResponse(res))
}

// смена аватарки на сервере
export function changeAvatarToServer(link) {
  return fetch (`${config.baseUrl}/users/me/avatar`, {
    method: 'PATCH',
    headers: {
      authorization: config.headers.authorization,
      'Content-Type': config.headers['Content-Type']
    },
    body: JSON.stringify({
      avatar: link
    })
  })
  .then(res => checkResponse(res))
}


