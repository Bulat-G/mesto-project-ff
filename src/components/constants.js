export const cardsContainer = document.querySelector('.places__list');
export const popups = document.querySelectorAll('.popup');
export const popupEdit = document.querySelector('.popup_type_edit');
export const popupNewCard = document.querySelector('.popup_type_new-card');
export const popupChangeAvatar = document.querySelector('.popup_type_change-avatar');
export const buttonEdit = document.querySelector('.profile__edit-button');
export const buttonAdd = document.querySelector('.profile__add-button');
export const buttonChangeAvatar = document.querySelector('.profile__change-avatar-button');

export const formEdit = document.forms['edit-profile'];
export const nameInput = formEdit.elements['name'];
export const jobInput = formEdit.elements['description'];

export const formAdd = document.forms['new-place'];
export const placeNameInput = formAdd.elements['place-name'];
export const imageLinkInput = formAdd.elements['link'];

export const formChangeAvatar = document.forms['change-avatar'];
export const inputChangeAvatar = formChangeAvatar.elements['link'];

export const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};