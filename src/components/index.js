import '../pages/index.css';
import { initialCards } from './cards.js';
import { openModal, closeModal } from './modal.js';
import { createCard, deleteAndLikeCard } from './card.js';
import { enableValidation, clearValidation } from './validation.js';

// DOM узлы
const cardsContainer = document.querySelector('.places__list');
const popups = document.querySelectorAll('.popup');
const popupEdit = document.querySelector('.popup_type_edit');
const popupNewCard = document.querySelector('.popup_type_new-card');
const buttonEdit = document.querySelector('.profile__edit-button');
const buttonAdd = document.querySelector('.profile__add-button');

const formEdit = document.forms['edit-profile'];
const nameInput = formEdit.elements['name'];
const jobInput = formEdit.elements['description'];

const formAdd = document.forms['new-place'];
const placeNameInput = formAdd.elements['place-name'];
const linkInput = formAdd.elements['link'];

const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');


const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
}

// Вывести карточки на страницу
initialCards.forEach(function (item) {
  cardsContainer.append(createCard(item, deleteAndLikeCard, openModalImage));  
});

// открыли редактирование
buttonEdit.addEventListener('click', function () {
  openModal(popupEdit);
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
  clearValidation (formEdit, validationConfig); //очищаем сообщения об ошибке при открытии
});

// открыли добавление
buttonAdd.addEventListener('click', function () {
  openModal(popupNewCard);
  formAdd.reset();
  clearValidation (formAdd, validationConfig); //очищаем сообщения об ошибке при открытии
});

// закрыли по крестику
popups.forEach((popup) => {
  const closeButton = popup.querySelector('.popup__close')
  closeButton.addEventListener('click', () => {
     closeModal(popup);
  });
});

// закрыли по оверлей
popups.forEach((popup) => {
  popup.addEventListener('mousedown', (evt) => {
    if (evt.target.classList.contains('popup')) {
      closeModal(popup);
    }
  });
}); 

// Обработчик редактирования профиля
function handleProfileFormSubmit(evt) {
  evt.preventDefault();  
  
  profileTitle.textContent = nameInput.value; 
  profileDescription.textContent = jobInput.value;
  
  closeModal(popupEdit);
}

formEdit.addEventListener('submit', handleProfileFormSubmit);


// Обработчик добавления карточки
function addCard(evt) {
  evt.preventDefault();  
  const objectCards = {};

  objectCards.name = placeNameInput.value;
  objectCards.link = linkInput.value;    

  cardsContainer.prepend(createCard(objectCards, deleteAndLikeCard, openModalImage));  
  
  closeModal(popupNewCard);

}

formAdd.addEventListener('submit', addCard);

  // открытие попапа картинок
function openModalImage(name, link) {
  openModal(document.querySelector('.popup_type_image'));  
 
  const imagePopup = document.querySelector('.popup__image');
  const popupCaption = document.querySelector('.popup__caption');
  imagePopup.src = link.src;
  popupCaption.textContent = name.textContent;
}

enableValidation(validationConfig);


// ----------------------------------------------------

// function fetchReq() {
//   return fetch('https://nomoreparties.co/v1/wff-cohort-22/cards', {
//     headers: {
//       authorization: '9be71888-776c-4522-b74c-ee78d127beb2'
//     }
//   })
//     .then(res => res.json())
//     .then((result) => {
//       console.log(result);
//       result.forEach((item) {

//       }) 
//     }); 
// }

// fetchReq();