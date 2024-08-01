// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;

// @todo: DOM узлы
const content = document.querySelector('.content');
const listCards = content.querySelector('.places__list');

// @todo: Функция создания карточки
function creatureCard(objectCards, deleteCard) {
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

// @todo: Функция удаления карточкиё
function deleteCard(event) {
  event.target.closest('.card').remove();
}

// @todo: Вывести карточки на страницу
initialCards.forEach(function (item) {
  listCards.append(creatureCard(item, deleteCard));
});
