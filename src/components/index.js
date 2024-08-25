import '../pages/index.css';
import { initialCards } from './cards.js';
import { openModal, closeModal } from './modal.js';
import { createCard, deleteAndLikeCard } from './card.js';

// DOM узлы
const cardsContainer = document.querySelector('.places__list');
const popups = document.querySelectorAll('.popup');
const popupEdit = document.querySelector('.popup_type_edit');
const popupNewCard = document.querySelector('.popup_type_new-card');
const buttonEdit = document.querySelector('.profile__edit-button');
const buttonAdd = document.querySelector('.profile__add-button');

const formElement = document.forms['edit-profile'];
const formAdd = document.forms['new-place'];
const nameInput = formElement.elements['name'];
const jobInput = formElement.elements['description'];
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');

// Вывести карточки на страницу
initialCards.forEach(function (item) {
  cardsContainer.append(createCard(item, deleteAndLikeCard, openModalImage));  
});

// открыли редактирование
buttonEdit.addEventListener('click', function () {
  openModal(popupEdit);
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
});

// открыли добавление
buttonAdd.addEventListener('click', function () {
  openModal(popupNewCard);
  formAdd.reset();
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

formElement.addEventListener('submit', handleProfileFormSubmit);


// Обработчик добавления карточки
function addCard(evt) {
  evt.preventDefault();  
  
  const placeNameInput = formAdd.elements['place-name'];
  const linkInput = formAdd.elements['link'];
  const objectCards = {};

  objectCards.name = placeNameInput.value;
  objectCards.link = linkInput.value;    

  cardsContainer.prepend(createCard(objectCards, deleteAndLikeCard, openModalImage));  
  
  closeModal(popupNewCard);

}

formAdd.addEventListener('submit', addCard);


  // открытие попапа картинок
function openModalImage(evt) {
  openModal(document.querySelector('.popup_type_image'));  
 
  const imagePopup = document.querySelector('.popup__image');
  const popupCaption = document.querySelector('.popup__caption');
  imagePopup.src = evt.target.src;
  popupCaption.textContent = evt.target.closest('.card').querySelector('.card__title').textContent;
}
