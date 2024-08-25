const cardTemplate = document.querySelector('#card-template').content;

// Функция создания карточки
export function createCard(objectCards, deleteAndLikeCard, openModalImage) {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const nameCard = cardElement.querySelector('.card__title');
  const imageCard = cardElement.querySelector('.card__image');
  const buttonDelete = cardElement.querySelector('.card__delete-button');
  const buttonLike = cardElement.querySelector('.card__like-button');

  nameCard.textContent = objectCards.name;
  imageCard.src = objectCards.link;
  imageCard.alt = objectCards.name;

  imageCard.addEventListener('click', openModalImage);
  buttonDelete.addEventListener('click', deleteAndLikeCard.deleteCard);
  buttonLike.addEventListener('click', deleteAndLikeCard.likeItCard);

  return cardElement;
}

// объект функций взаимодействия с карточками
export const deleteAndLikeCard = {

  // Функция удаления карточки
  deleteCard: function deleteCard(evt) {
    evt.target.closest('.card').remove();
  },

  // функция лайка 
  likeItCard: function likeItCard (evt) {
    evt.target.classList.toggle('card__like-button_is-active');
  }
}