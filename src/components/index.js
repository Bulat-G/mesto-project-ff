import '../pages/index.css';
import { initialCards } from './cards.js';
import { openModal, deleteClassOpened, closeModal } from './modal.js';
import { cardsContainer, createCard, interactionCards } from './card.js';

// DOM узлы
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
  cardsContainer.append(createCard(item, interactionCards));
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

// закрыли попап
document.addEventListener('click', closeModal);


// Обработчик «отправки» формы
function handleFormSubmit(evt) {
  evt.preventDefault();  
  
  profileTitle.textContent = nameInput.value; 
  profileDescription.textContent = jobInput.value;
  
  deleteClassOpened();  
}

formElement.addEventListener('submit', handleFormSubmit);


// Обработчик добавления карточки
function addCard(evt) {
  evt.preventDefault();  
  
  const placeNameInput = formAdd.elements['place-name'];
  const linkInput = formAdd.elements['link'];
  const objectCards = {};

  objectCards.name = placeNameInput.value;
  objectCards.link = linkInput.value;    

  createCard(objectCards, interactionCards);  
  
  deleteClassOpened();  

}

formAdd.addEventListener('submit', addCard);

