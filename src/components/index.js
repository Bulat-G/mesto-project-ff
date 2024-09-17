import '../pages/index.css';
import { cardsContainer, popups, popupEdit, popupNewCard, popupChangeAvatar, buttonEdit, buttonAdd, buttonChangeAvatar, formEdit, nameInput, jobInput, formAdd, placeNameInput, imageLinkInput, formChangeAvatar, inputChangeAvatar,  validationConfig } from './constants.js';
import { openModal, closeModal } from './modal.js';
import { createCard, deleteAndLikeCard } from './card.js';
import { enableValidation, clearValidation } from './validation.js';
import { getUserInfo, getInitialCards, editProfile, postAddCard, deleteCardServer, addLikeServer, deleteLikeServer, changeAvatarToServer} from './api.js';


deleteAndLikeCard.deleteCardServer = deleteCardServer;
deleteAndLikeCard.addLikeServer = addLikeServer;
deleteAndLikeCard.deleteLikeServer = deleteLikeServer;

// открыли редактирование
buttonEdit.addEventListener('click', () => {
  openModal(popupEdit);
  nameInput.value = document.querySelector('.profile__title').textContent;
  jobInput.value = document.querySelector('.profile__description').textContent;
  clearValidation (formEdit, validationConfig); //очищаем сообщения об ошибке при открытии
});


// открыли добавление
buttonAdd.addEventListener('click', () => {
  openModal(popupNewCard);
});

// открытие попапа картинок
function openModalImage(name, link) {
  openModal(document.querySelector('.popup_type_image'));  
  
  const imagePopup = document.querySelector('.popup__image');
  const popupCaption = document.querySelector('.popup__caption');
  imagePopup.src = link.src;
  popupCaption.textContent = name.textContent;
}

// открытие попапа аватарки
buttonChangeAvatar.addEventListener('click', () => {
  openModal(popupChangeAvatar);
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

// загрузка рендеринга
function renderLoading(evt, isLoading) {
  evt.target.querySelector(validationConfig.submitButtonSelector).textContent = 
  isLoading ? 'Сохранение...' : 'Сохранить'
}

// Обработчик редактирования профиля
function handleProfileFormSubmit(evt) {
  evt.preventDefault();    
  renderLoading(evt, true);

  const dataProfile = { 
    title: nameInput.value, 
    description: jobInput.value
  }

  editProfile(dataProfile)
    .then((data) => {
      document.querySelector('.profile__title').textContent = data.name; 
      document.querySelector('.profile__description').textContent = data.about;
    })
    .catch((err) => {
      console.log(`Ошибка редактирования профиля ${err}` )
    })
    .finally(() => {
      renderLoading(evt, false);
    })
  
  closeModal(popupEdit);
}

formEdit.addEventListener('submit', handleProfileFormSubmit);  

let currentUserInfo;

// Обработчик добавления карточки
function addCard(evt) {
  evt.preventDefault();  
  renderLoading(evt, true);
  const dataCard = {
    name: placeNameInput.value,
    link: imageLinkInput.value
  };

  postAddCard(dataCard)
    .then((data) => {
      cardsContainer.prepend(createCard(currentUserInfo, data, deleteAndLikeCard, openModalImage));      
      formAdd.reset(); // очищаем форму после закрытия без отправки данных
      clearValidation (formAdd, validationConfig); //очищаем сообщения об ошибке при открытии
    })  
    .catch((err) => {
      console.log(`Ошибка добавления карточки ${err}` )
    })
    .finally(() => {
      renderLoading(evt, false);
    })

  closeModal(popupNewCard);
}

formAdd.addEventListener('submit', (evt) => {
  addCard(evt);
}); 


// смена аватарки
function changeAvatar(evt) {
  evt.preventDefault(); 
  renderLoading(evt, true);
  const link = inputChangeAvatar.value; 
  
  changeAvatarToServer(link)    
    .then((data) => {
      document.querySelector('.profile__image').style.backgroundImage = `url(${data.avatar})`;      
      formChangeAvatar.reset(); // очищаем форму 
      clearValidation (formChangeAvatar, validationConfig); // очищаем сообщения об ошибке
    })
    .catch((err) => {
      console.log(`Ошибка при смене аватарки ${err}` )
    })
    .finally(() => {
      renderLoading(evt, false);
    })

  closeModal(popupChangeAvatar);
}

formChangeAvatar.addEventListener('submit', (evt) => {
  changeAvatar(evt);
}); 

// включение валидации всех форм
enableValidation(validationConfig);

Promise.all([getUserInfo(), getInitialCards()])
  .then(([userInfo, getInitialCards]) => {  
    currentUserInfo = userInfo; 
    document.querySelector('.profile__image').style.backgroundImage = `url(${userInfo.avatar})`;
    document.querySelector('.profile__title').textContent = userInfo.name;
    document.querySelector('.profile__description').textContent = userInfo.about;
    
    getInitialCards.forEach((dataCard) => {
      cardsContainer.append(createCard(userInfo, dataCard, deleteAndLikeCard, openModalImage));   
    })
  })
  .catch((err) => {
    console.log(err);
  })



