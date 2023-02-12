
// Объявление переменных для profile
const profileOpenButton = document.querySelector('.profile__rectangle');
const profileName = document.querySelector('.profile__title');
const profileJob = document.querySelector('.profile__subtitle');

// Объявление переменных для popup
const popupElement = document.querySelector('.popup'); 
const formElement = document.querySelector('.popup__form-container');
const popupClose = document.querySelectorAll('.popup__close');
const popupSave = formElement.querySelector('.popupSave');  
const popupInputName = document.querySelector('.popup__item_type_profile');
const popupInputJob = document.querySelector('.popup__item_type_job'); 

// Добавление открытия фотографии 
const popupImage = document.querySelector('.popup__image'); 
const photoLink = popupImage.querySelector('.popup__image-photo'); 
const photoMain = popupImage.querySelector('.popup__image-main'); 

// Добавление тэмплэйта 
const templateCards = document.querySelector('#template-cards').content.querySelector('.elements__item');
const listElements = document.querySelector('.elements__list');
const buttonElements = document.querySelector('.elements__like'); 

// Добавление карточек 
const initialCardsElements = document.querySelector('.popup__cards'); 
const cardsContainer = initialCardsElements.querySelector('.popup__form-container'); 
const buttonCardsElements = document.querySelector('.profile__button'); 
const popupInputCard = cardsContainer.querySelector('.popup__item_type_card'); 
const imageCard = cardsContainer.querySelector('.popup__item_type_link'); 
const createCards = document.querySelector('.popup__save_cards'); 

// Открытие 
const popupOpen = function() {
  popupElement.classList.add('popup_opened'); 
  popupInputName.value = profileName.textContent; 
  popupInputJob.value = profileJob.textContent; 
}

// Обработчик события при открытии 
profileOpenButton.addEventListener('click', popupOpen); 

// Закрытие 

const popupClosed = function(e) {
  e.classList.remove('popup_opened')
};

//Обработчик события при закрытии 
popupClose.forEach(e => {
  const cards = e.closest('.popup'); 
  e.addEventListener('click', () => popupClosed(cards)); 
})

// Обработка формы отправки

const handleFormSubmit = function (event) {
  event.preventDefault();
  profileName.textContent = popupInputName.value ; 
  profileJob.textContent = popupInputJob.value; 
  popupClosed ();
};

// Отправка формы профиля
formElement.addEventListener('submit', handleFormSubmit);

// Добавление новой карточки 
createCards.addEventListener('click', (e) => {
  e.preventDefault(); 
  
  const card = createElements({name: popupInputCard.value, link: imageCard.value});

  listElements.prepend(card); 
  cardsClosed(initialCardsElements); 
});



// Открытие попап 

let popupCards = function() {
  initialCardsElements.classList.add('popup_opened'); 
  popupInputCard.value = popupInputCard.textContent; 
  imageCard.value = imageCard.textContent; 
};

// Обработчик события при открытии 
buttonCardsElements.addEventListener('click', popupCards); 
 

let cardsClosed = (item) => {
  item.classList.remove('popup_opened'); 
};

// Создание карточек 
function renderCards(items) {
  const cards = items.map((item) => {
    return createElements({name: item.name, link: item.link}); 
  });

  listElements.append(...cards); 
}

renderCards(initialCards); 

function createElements(item) {
  const card = templateCards.cloneNode(true); 
  card.querySelector('.elements__title').textContent = item.name;
  card.querySelector('.elements__photo').src = item.link; 
  card.querySelector('.elements__photo').alt = item.name;  

  card.querySelector('.elements__delete').addEventListener('click', () => {
    card.remove(); 
  }); 

// Реализация лайк актив 
  card.querySelector('.elements__like').addEventListener('click', (evt) => {
    evt.target.classList.toggle('elements__like_active'); 
  }); 

  const link = card.querySelector('.elements__photo');
  link.setAttribute('src', item.link); 
  link.setAttribute('alt', item.name); 

  card.querySelector('.elements__photo').addEventListener('click', function () {
    photoLink.src = item.link;
    photoLink.alt = item.name;
    photoMain.textContent = item.name; 

    const openImage = function (popup) {
      popup.classList.add('popup_opened')
    };

    openImage(popupImage)
    
  });

  return card; 
}
