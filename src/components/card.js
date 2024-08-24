import { openModal } from './modal.js';

const cardTemplate = document.querySelector('#card-template').content;
export const cardsContainer = document.querySelector('.places__list');

// Функция создания карточки
export function createCard(objectCards, interactionCards) {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const nameCard = cardElement.querySelector('.card__title');
  const imageCard = cardElement.querySelector('.card__image');
  const buttonDelete = cardElement.querySelector('.card__delete-button');
  const buttonLike = cardElement.querySelector('.card__like-button');

  nameCard.textContent = objectCards.name;
  imageCard.src = objectCards.link;
  imageCard.alt = objectCards.name;

  imageCard.addEventListener('click', interactionCards.openModalImage);
  buttonDelete.addEventListener('click', interactionCards.deleteCard);
  buttonLike.addEventListener('click', interactionCards.likeItCard);

  cardsContainer.prepend(cardElement);

  return cardElement;
}

// перенос картинки и подписи в попап
function assignContentToImagePopup (evt) {  
  const imagePopup = document.querySelector('.popup__image');
  const popupCaption = document.querySelector('.popup__caption');

  imagePopup.src = evt.target.src;
  popupCaption.textContent = evt.target.closest('.card').querySelector('.card__title').textContent;
}

// объект функций взаимодействия с карточками
export const interactionCards = {

  // открытие попапа картинок
  openModalImage: function openModalImage(evt) {
    openModal(document.querySelector('.popup_type_image'));
    assignContentToImagePopup(evt);
  },

  // Функция удаления карточки
  deleteCard: function deleteCard(evt) {
    evt.target.closest('.card').remove();
  },

  // функция лайка 
  likeItCard: function likeItCard (evt) {
    evt.target.classList.toggle('card__like-button_is-active');
  }
}