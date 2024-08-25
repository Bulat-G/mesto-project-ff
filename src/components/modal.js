export function openModal(popup) {
  popup.classList.add('popup_is-opened');
  document.addEventListener('keydown', closeModalViaEsc);
};

export function closeModal(popup) {
  popup.classList.remove('popup_is-opened');
  document.removeEventListener('keydown', closeModalViaEsc);
};

function closeModalViaEsc(evt) {
  if(evt.key === 'Escape') {
    closeModal(document.querySelector('.popup_is-opened'));
  }
}