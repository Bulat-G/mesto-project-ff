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
const nameInput = formElement.elements['name'];
const jobInput = formElement.elements['description'];

const formAdd = document.forms['new-place'];
const placeNameInput = formAdd.elements['place-name'];
const linkInput = formAdd.elements['link'];

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
  
  // const placeNameInput = formAdd.elements['place-name'];
  // const linkInput = formAdd.elements['link'];
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

// --------------------------

// показать ошибку
function showInputError(formElement, inputElement, errorMessage) {
  const inputError = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add('popup__input_type_error');
  inputError.classList.add('popup__input-error_active');
  inputError.textContent = errorMessage;
} 

// скрыть ошибку
function hideInputError(formElement, inputElement) {  
  const inputError = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove('popup__input_type_error');
  inputError.classList.remove('popup__input-error_active');
  inputError.textContent = '';
} 


const regexInputText = /[а-яёa-z\s\-]/gi;

// проверяем валидность поля ввода
function isValid(formElement, inputElement) {
  if (!inputElement.validity.valid && !regexInputText.test(inputElement.value)) {
    showInputError(formElement, inputElement, inputElement.dataset.errorMessage);
  } else if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
};

// проверяем наличие невалидного поля
function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid
  })
}

// переключаем активность кнопки 
function toggleButtonState(inputList, buttonElement) {
  if (hasInvalidInput(inputList)) {
    buttonElement.disabled = true;
    buttonElement.classList.add('popup__button_inactive');
  } else {
    buttonElement.disabled = false;
    buttonElement.classList.remove('popup__button_inactive');
  }
}

function setEventListener(formElement) {  
  const inputList = Array.from(formElement.querySelectorAll('.popup__input'));
  const buttonElement = formElement.querySelector('.popup__button');
  
  toggleButtonState(inputList, buttonElement);

  inputList.forEach((inputElement) => {      
    inputElement.addEventListener('input', () => {
      isValid(formElement, inputElement);
      toggleButtonState(inputList, buttonElement);
    }); 
  })
}


function enableValidation() {
  const formList = Array.from(document.querySelectorAll('.popup__form'));

  formList.forEach((formElement) => {
    setEventListener(formElement);
  })
}

enableValidation();


