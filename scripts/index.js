
// Объявление переменных для profile
const profileOpenButton = document.querySelector('.profile__rectangle');
const profileName = document.querySelector('.profile__title');
const profileJob = document.querySelector('.profile__subtitle');
const profileInputName = document.querySelector('.popup__item_type_profile');
const profileInputJob = document.querySelector('.popup__item_type_job'); 
const profileForm = document.querySelector('.popup_type_profile'); 
const profileButton = document.querySelector('.profile__button'); 
const popupContainer = document.querySelector('.popup__form-container');

const closeButtons = document.querySelectorAll('.popup__close'); 

// Добавление открытия фотографии 
const popupImage = document.querySelector('.popup_type_image'); 
const photoLink = popupImage.querySelector('.popup__image-photo'); 
const photoMain = popupImage.querySelector('.popup__image-main'); 

// Добавление тэмплэйта 
const templateCards = document.querySelector('#template-cards').content.querySelector('.elements__item');
const templateList = document.querySelector('.elements__list');

// Добавление карточек 
const cardPopup = document.querySelector('.popup_type_cards'); 
const cardsContainer = cardPopup.querySelector('.popup__form-container');  
const сardInput = cardsContainer.querySelector('.popup__item_type_card'); 
const cardImage = cardsContainer.querySelector('.popup__item_type_link'); 

// Открытие 
function openPopup(popup) {
  popup.classList.add('popup_opened');
}

// Закрытие попапа по кнопке
function popupClosed(popup) {
  popup.classList.remove('popup_opened');
}

//Обработчик события при закрытии на крестик 
closeButtons.forEach(closeButtons => {
  const popup = closeButtons.closest('.popup'); 
  closeButtons.addEventListener('click', () => popupClosed(popup)); 
}); 


// Открытие попапа профиля
profileOpenButton.addEventListener('click', function(){
  openPopup(profileForm); 
  profileInputName.value = profileName.textContent; 
  profileInputJob.value = profileJob.textContent; 
});



// Обработка формы отправки

const handleProfileFormSubmit = function (event) {
  event.preventDefault();
  profileName.textContent = profileInputName.value ; 
  profileJob.textContent = profileInputJob.value; 
  popupClosed (profileForm);
};

// Отправка формы профиля
popupContainer.addEventListener('submit', handleProfileFormSubmit);

// Добавление новой карточки 
cardPopup.addEventListener('submit', (e) => {
  e.preventDefault(); 
  
  const card = createElement({name: сardInput.value, link: cardImage.value});

  templateList.prepend(card); 
  e.target.reset(); 

});


// Открытие попап карточки 

const popupCards = function() {
  cardPopup.classList.add('popup_opened'); 
  сardInput.value = сardInput.textContent; 
  cardImage.value = cardImage.textContent; 
};

// Обработчик события при открытии 
profileButton.addEventListener('click', popupCards); 
 
// Создание карточек 
function renderCards(items) {
  const cards = items.map((item) => {
    return createElement({name: item.name, link: item.link}); 
  });

  templateList.append(...cards); 
}

renderCards(initialCards); 

function createElement(item) {
  const card = templateCards.cloneNode(true); 
  card.querySelector('.elements__title').textContent = item.name;
  const link = card.querySelector('.elements__photo');
  link.setAttribute('src', item.link); 
  link.setAttribute('alt', item.name); 

  card.querySelector('.elements__delete').addEventListener('click', () => {
    card.remove(); 
  }); 

// Реализация лайк актив 
  card.querySelector('.elements__like').addEventListener('click', (evt) => {
    evt.target.classList.toggle('elements__like_active'); 
  }); 

  card.querySelector('.elements__photo').addEventListener('click', function () {
    photoLink.src = item.link;
    photoLink.alt = item.name;
    photoMain.textContent = item.name; 

    openPopup(popupImage);
    
  });

  return card; 
}
