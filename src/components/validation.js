// показать ошибку
function showInputError(formElement, inputElement, errorMessage, validationConfig) {
  const inputError = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(validationConfig.inputErrorClass); // popup__input_type_error
  inputError.classList.add(validationConfig.errorClass); // popup__error_visible
  inputError.textContent = errorMessage;
} 

// скрыть ошибку
function hideInputError(formElement, inputElement, validationConfig) {  
  const inputError = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(validationConfig.inputErrorClass); // popup__input_type_error
  inputError.classList.remove(validationConfig.errorClass); // popup__error_visible
  inputError.textContent = '';
} 

// проверяем валидность поля ввода
function isValid(formElement, inputElement, validationConfig) {  
  if (inputElement.validity.patternMismatch) {
   showInputError(formElement, inputElement, inputElement.dataset.errorMessage, validationConfig);
 } else if (!inputElement.validity.valid) {
   showInputError(formElement, inputElement, inputElement.validationMessage, validationConfig);
 } else {
   hideInputError(formElement, inputElement, validationConfig);
 }
}

// проверяем наличие невалидного поля
function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid; 
  })
}

// переключаем активность кнопки 
function toggleButtonState(inputList, buttonElement, validationConfig) {
  if (hasInvalidInput(inputList)) {
    buttonElement.disabled = true;
    buttonElement.classList.add(validationConfig.inactiveButtonClass); // popup__button_disabled
  } else {
    buttonElement.disabled = false;
    buttonElement.classList.remove(validationConfig.inactiveButtonClass); // popup__button_disabled
  }
}

// проверяем валидность всех полей ввода
function setEventListener(formElement, validationConfig) {  
  const inputList = Array.from(formElement.querySelectorAll(validationConfig.inputSelector)); //.popup__input
  const buttonElement = formElement.querySelector(validationConfig.submitButtonSelector); //.popup__button
  
  toggleButtonState(inputList, buttonElement, validationConfig); 

  inputList.forEach((inputElement) => {    
    inputElement.addEventListener('input', () => {
      isValid(formElement, inputElement, validationConfig);
      toggleButtonState(inputList, buttonElement, validationConfig);
    }); 
  })
}

// включение валидации всех форм
export function enableValidation(validationConfig) {
  const formList = Array.from(document.querySelectorAll(validationConfig.formSelector)); //.popup__form

  formList.forEach((formElement) => {
    setEventListener(formElement, validationConfig);
  })
}

// очистка сообщений об ошибке
export function clearValidation (form, validationConfig) {
  const inputList = Array.from(form.querySelectorAll(validationConfig.inputSelector)); //.popup__input
  const buttonElement = form.querySelector(validationConfig.submitButtonSelector); //.popup__button
  
  toggleButtonState(inputList, buttonElement, validationConfig); 

  inputList.forEach((inputElement) => {    
    hideInputError(form, inputElement, validationConfig);
  })

}
