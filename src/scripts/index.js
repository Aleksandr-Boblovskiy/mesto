import { Card } from './Card.js';
import { FormValidator } from './FormValidator.js';

const editButton = document.querySelector('.profile__edit-button');
const popupProfile = document.querySelector('.popup_type_profile');
const closeButtonProfile = document.querySelector('.popup__close_profile');
const formProfile = document.querySelector('.popup__form_profile');
const titleName = document.querySelector('.profile__title');
const userName = document.querySelector('.popup__input_name_full-name');
const subName = document.querySelector('.profile__subtitle');
const occupation = document.querySelector('.popup__input_name_occupation');
const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg',
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg',
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg',
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg',
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg',
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg',
  },
];

const elementList = document.querySelector('.elements__list');
const popupCard = document.querySelector('.popup_type_card');
const addCard = document.querySelector('.profile__add-button');
const closeButtonCard = document.querySelector('.popup__close_card');
const formCard = document.querySelector('.popup__form_card');
const closeButtonImage = document.querySelector('.popup__close_image');
const popupImage = document.querySelector('.popup_type_image');
const tempImg = popupImage.querySelector('.popup__image');
const textImg = popupImage.querySelector('.popup__text');
let popupActive;
const validationSettings = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible',
}
const profileFormValidation = new FormValidator(validationSettings, formProfile);
const cardFormValidation = new FormValidator(validationSettings, formCard);



function closePopup(popup) {
  // eslint-disable-next-line no-use-before-define
  popup.removeEventListener('mousedown', closeOverleyPopup);
  // eslint-disable-next-line no-use-before-define
  document.removeEventListener('keydown', closePopupByEsc);
  popup.classList.remove('popup_active');
}

function closeOverleyPopup(event) {
  if (event.target === event.currentTarget) {
    closePopup(popupActive);
  }
}

function closePopupByEsc(event) {
  if (event.key === 'Escape') {
    closePopup(popupActive);
  }
}

function openPopup(popup) {
  popup.classList.add('popup_active');
  popupActive = popup;
  popup.addEventListener('mousedown', closeOverleyPopup);
  document.addEventListener('keydown', closePopupByEsc);
}

function handlePopupCardOpen(link, name) {
  tempImg.src = link;
  tempImg.alt = name;
  textImg.textContent = name;
  openPopup(popupImage);
}

function createCard(item) {
  const card = new Card(item, '#element-template', handlePopupCardOpen);
  return card.generateCard();
}

function saveCard(event) {
  event.preventDefault();
  const item = {
    name: document.querySelector('.popup__input_name_title').value,
    link: document.querySelector('.popup__input_name_link').value,
  }
  elementList.prepend(createCard(item));
  formCard.reset();
  cardFormValidation.disableButtonSubmit();
  closePopup(popupActive);
}

function saveProfile(event) {
  event.preventDefault();
  titleName.textContent = userName.value;
  subName.textContent = occupation.value;
  closePopup(popupActive);
}

const renderCards = (cards) => {
  cards.forEach((item) => {
    elementList.append(createCard(item));
  });
};

renderCards(initialCards);
profileFormValidation.enableValidation();
cardFormValidation.enableValidation();
closeButtonProfile.addEventListener('click', () => closePopup(popupActive));
editButton.addEventListener('click', () => {
  openPopup(popupProfile);
  userName.value = titleName.textContent;
  occupation.value = subName.textContent;
});
formProfile.addEventListener('submit', (evt) => saveProfile(evt));
addCard.addEventListener('click', () => openPopup(popupCard));
closeButtonCard.addEventListener('click', () => closePopup(popupActive));
formCard.addEventListener('submit', (evt) => saveCard(evt));
closeButtonImage.addEventListener('click', () => {
  closePopup(popupActive);
});
