// функция открытия попапа
export function openModal(popup) {
  popup.classList.add('popup_is-opened');
  document.addEventListener('keydown', closeModalViaEsc);
}
// удаление класса открытия попапа
export function deleteClassOpened() {
  document.querySelector('.popup_is-opened').classList.remove('popup_is-opened');
}
// закрытие кнопкой Esc
function closeModalViaEsc(evt) {
  if (evt.key === 'Escape') {
    deleteClassOpened();
  }  
  document.removeEventListener('keydown', closeModalViaEsc);
}
// закрыли попап на оверлей
function closeModalViaOverlay(evt) {
  if (evt.target.classList.contains('popup_is-opened')) {
    deleteClassOpened();
  }
}
// закрытие на крестик
function closeModalViaButtonCross(evt) {
  if (evt.target.classList.contains('popup__close')) {
    deleteClassOpened();    
  }
}
// закрытие попапа
export function closeModal(evt) {
  closeModalViaOverlay(evt);
  closeModalViaButtonCross(evt);
}