const cardTemplate = document.querySelector('#card-template').content;

// объект функций взаимодействия с карточками
export const deleteAndLikeCard = {

  // Функция удаления карточки
  deleteCard: function deleteCard(evt) {
    evt.target.closest('.card').remove();
  },

  // функция лайка 
  likeItCard: function likeItCard (evt, likeScore, dataCard, deleteAndLikeCard) {
    evt.target.classList.toggle('card__like-button_is-active');

    
    if(evt.target.classList.contains('card__like-button_is-active')) {
      deleteAndLikeCard.addLikeServer(dataCard._id)
        .then((data) => {
          likeScore.textContent = data.likes.length;
        })
        .catch((err) => {
          console.log(err);
        })
    } else {
      deleteAndLikeCard.deleteLikeServer(dataCard._id) 
        .then((data) => {
          likeScore.textContent = data.likes.length;
        })  
        .catch((err) => {
          console.log(err);
        })    
    }
  }

}

// Функция создания карточки
export function createCard(getUserInfo, dataCard, deleteAndLikeCard, openModalImage) {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const nameCard = cardElement.querySelector('.card__title');
  const imageCard = cardElement.querySelector('.card__image');
  const buttonDelete = cardElement.querySelector('.card__delete-button');
  const buttonLike = cardElement.querySelector('.card__like-button');
  const likeScore = cardElement.querySelector('.card__like-score');

  nameCard.textContent = dataCard.name;
  imageCard.src = dataCard.link;
  imageCard.alt = dataCard.name;
  likeScore.textContent = dataCard.likes.length;

  // открытие попапа картинки
  imageCard.addEventListener('click', () => {
    openModalImage(nameCard, imageCard);
  });

  // удаление карточки
  buttonDelete.addEventListener('click', (evt) => {
    deleteAndLikeCard.deleteCard(evt);
    deleteAndLikeCard.deleteCardServer(dataCard._id);
  });

  // лайк карточки
  buttonLike.addEventListener('click', (evt) => {
    deleteAndLikeCard.likeItCard(evt, likeScore, dataCard, deleteAndLikeCard);
  });

  // убирает кнопку удаления карточек добавленных другими пользователями
  if (getUserInfo._id !== dataCard.owner._id) {
    buttonDelete.style.display = 'none';  
  }

  // закрашивает лайк если он поставлен мной
  dataCard.likes.forEach((likeCard) => {
    if(getUserInfo._id === likeCard._id) {
      buttonLike.classList.add('card__like-button_is-active');
    } else {
      buttonLike.classList.remove('card__like-button_is-active');
    }
  });

  
  return cardElement;
}


