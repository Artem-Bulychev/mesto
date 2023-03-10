// Функция добавления класса с error
const showError = (formElement, inputElement, errorMessage, config) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(config.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(config.errorClass);
};

// Функция удаления класса с error
const hideError = (formElement, inputElement, config) => {
  const error = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(config.inputErrorClass);
  error.textContent = "";
  error.classList.remove(config.errorClass);
};

// Функция проверки валидности
const checkValidity = (formElement, inputElement, config) => {
  if (!inputElement.validity.valid) {
    showError(formElement, inputElement, inputElement.validationMessage, config);
  } else {
    hideError(formElement, inputElement, config);
  }
};

// Функция проверки на каждый вводимый символ в поле
const setEventListeners = (formElement, config) => {
  const list = Array.from(formElement.querySelectorAll(config.inputSelector));
  const btnSubmit = formElement.querySelector(config.submitButtonSelector);
  toggleButton(list, btnSubmit, config);

  list.forEach((inputElement) => {
    inputElement.addEventListener("input", () => {
      checkValidity(formElement, inputElement, config);
      toggleButton(list, btnSubmit, config);
    });
  });
};

function submitButton(button, isValid) {
  button.disabled = !isValid;
}

// Функция активной/неактивной кнопки 
const toggleButton = (inputList, buttonSubmit, config) => {
  if (checkInvalid(inputList, config)) {

    buttonSubmit.disabled = true;
    buttonSubmit.classList.add(config.inactiveButtonClass);
  } else {
    buttonSubmit.removeAttribute("disabled", "disabled");
    buttonSubmit.classList.remove(config.inactiveButtonClass);
  }
};


// Функция массива полей
const checkInvalid = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

const enableValidation = (config) => {
  const list = Array.from(document.querySelectorAll(".popup"));
  list.forEach((formElem) => {
    formElem.addEventListener("submit", function (evt) {
      evt.preventDefault();
    });
    const fieldList = Array.from(
      formElem.querySelectorAll(config.formSelector)
    );
    fieldList.forEach((field) => {
      setEventListeners(field, config);
    });
  });
};

enableValidation ({
  formSelector: '.popup__form-container',
  inputSelector: '.popup__item',
  submitButtonSelector: '.popup__save',
  inactiveButtonClass: 'popup__save_inactive',
  inputErrorClass: 'popup__item_type_active',
  errorClass: 'popup__item-error_active',
});
