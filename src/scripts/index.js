import '../pages/index.css';
import { initialCards } from './cards.js';

// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;

// @todo: DOM узлы
const content = document.querySelector('.content');
const cardsContainer = content.querySelector('.places__list');

// @todo: Функция создания карточки
function createCard(objectCards, deleteCard) {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const nameCard = cardElement.querySelector('.card__title');
  const imageCard = cardElement.querySelector('.card__image');
  const buttonDelete = cardElement.querySelector('.card__delete-button');

  nameCard.textContent = objectCards.name;
  imageCard.src = objectCards.link;
  imageCard.alt = objectCards.name;

  buttonDelete.addEventListener('click', deleteCard);

  return cardElement;
}

// @todo: Функция удаления карточки
function deleteCard(event) {
  event.target.closest('.card').remove();
}

// @todo: Вывести карточки на страницу
initialCards.forEach(function (item) {
  cardsContainer.append(createCard(item, deleteCard));
});






const Chart = (function() {   

  const data = [];

    return {
        render: function (data) { /* ... */ },
        setData: function (data) { /* ... */ }
    };

}()); // IIFE возвращает объект

console.log(Chart.render(
  [
    [0,12], 
    [1,22], 
    [3,18]
  ]
)); 