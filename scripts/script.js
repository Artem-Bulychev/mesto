// Объявление переменных для profile
let profileOpenButton = document.querySelector('.profile__rectangle');
let profileName = document.querySelector('.profile__title');
let profileJob = document.querySelector('.profile__subtitle');


// Объявление переменных для popup
let popupElement = document.querySelector('.popup'); 
let formElement = document.querySelector('.popup__form-container');
let popupClose = document.querySelector('.popup__close');
let popupSave = document.querySelector('.popupSave');  
let popupInputName = document.querySelector('.popup__profile');
let popupInputJob = document.querySelector('.popup__job'); 

// Открытие 

let popupOpen = function() {
  popupElement.classList.add('popup_opened'); 
  popupInputName.value = profileName.textContent; 
  popupInputJob.value = profileJob.textContent; 
}

// Обработчик события при открытии 
profileOpenButton.addEventListener('click', popupOpen); 

// Закрытие 

let popupClosed = function() {
  popupElement.classList.remove('popup_opened')
}

//Обработчик события при закрытии 

popupClose.addEventListener('click', popupClosed); 

// Обработка формы отправки: 

let handleFormSubmit = function (event) {
  event.preventDefault();
  profileName.textContent = popupInputName.value ; 
  profileJob.textContent = popupInputJob.value; 
  popupClosed ();
}

formElement.addEventListener('submit', handleFormSubmit);

// Реализация like-active 

let likeActive = document.querySelector('.elements__like');
let likeActiveColor = document.querySelector('.elements__like-active') 


likeActive.addEventListener('click', function (event) {
  const ev = event.target.closest('likeActiveColor');
  if (ev) {
    ev.classList.toggle('.elements__like-active');
  }
}); 