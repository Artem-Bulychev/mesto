
// Функция добавления класса с ошибкой валидации

const showInputError = (formElement, inputElement, errorMessage, config) => {
  const errorClass = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(config.inputErrorClass); 
  errorClass.textContent = errorMessage; 
  errorClass.classList.add(config.errorClass);
}; 

// Функция скрытия класса с ошибкой при валидной форме

const hideInputError = (formElement, inputElement, config) => {
  const errorClass = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(config.inputErrorClass); 
  errorClass.textContent = '';
  errorClass.classList.remove(config.errorClass);
}; 

// Функция проверки валидации 

const checkInputValidity = (formElement, inputElement, config) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, config);

  } else {
    hideInputError(formElement, inputElement, config); 
  }
};

// Функция на каждый ввод символа 
const setListeners = (formElement, config) => {
  const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
  const buttonElement = formElement.querySelector(config.submitButtonSelector); 
  toggleButton(inputList, buttonElement); 
  inputList.forEach((inputSelector) => {
    inputSelector.addEventListener('input', () => {
      checkInputValidity(formElement, inputSelector, config);
      toggleButton(inputList, buttonElement, config); 
    });
  });
};

// Проверка на 1 из 2 невалидный инпут 

const toggleButton = (inputList, buttonElem, config) => {
  const isAnyInvalid = inputList.some((input) => !input.validity.valid);
  const isBothFilled = inputList.every((input) => input.value !== '');
  const isLengthValid = inputList.every((input) => input.value.length >= 2);

  if (isAnyInvalid || !isBothFilled || !isLengthValid) {
      buttonElem.classList.add(config.inactiveButtonClass);
      buttonElem.disabled = true;
      isSubmitButtonDisabled = true;
  } else {
      buttonElem.classList.remove(config.inactiveButtonClass);
      buttonElem.disabled = false;
      isSubmitButtonDisabled = false;
  }
};

function setsubmitbutton(button, isValid) {
  button.disabled = !isValid;
}
// Массив полей 

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid; 
  })
}; 


const enableValidation = (config) => {
  const formList = Array.from(document.querySelectorAll(lists.formSelector));
  formList.forEach((formElem) => {
      setListeners(formElem, lists);
  });
};
const checkInvalidInput = (inputList) => {
  return inputList.some((inputElem) => {
      return !inputElem.validity.valid;
  });
};



enableValidation ({
  formSelector: '.popup__form-container',
  inputSelector: '.popup__item',
  submitButtonSelector: '.popup__save',
  inactiveButtonClass: 'popup__save_inactive',
  inputErrorClass: 'popup__item-error_active',
  errorClass: 'popup__item-error',
});

enableValidation(config);