import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import UserInfo from '../components/UserInfo.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';



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

const editButton = document.querySelector('.profile__edit-button');
const formProfile = document.querySelector('.popup__form_profile');
const userName = document.querySelector('.popup__input_name_full-name');
const occupation = document.querySelector('.popup__input_name_occupation');
const addCard = document.querySelector('.profile__add-button');
const formCard = document.querySelector('.popup__form_card');

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

const popupImg = new PopupWithImage('.popup_type_image');

function handlePopupCardOpen(link, name) {
  popupImg.open(link, name);
  popupImg.setEventListeners();
}

function createCard(item) {
  const card = new Card(item, '#element-template', handlePopupCardOpen);
  return card.generateCard();
}

const cardsList = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      const cardElement = createCard(item);
      cardsList.addItem(cardElement);
    },
  }, '.elements__list'
)

cardsList.render();

const popupAddCard = new PopupWithForm('.popup_type_card', (item) => {
  const cardElement = createCard(item);
  cardsList.addItem(cardElement);
});

popupAddCard.setEventListeners();

const user = new UserInfo('.profile__title', '.profile__subtitle');

const popupUser = new PopupWithForm('.popup_type_profile', (item) => {
  user.setUserInfo(item);
});



popupUser.setEventListeners();

profileFormValidation.enableValidation();
cardFormValidation.enableValidation();

editButton.addEventListener('click', () => {

  const userN = user.getUserInfo();
  userName.value = userN.fullname;
  occupation.value = userN.occupationn;
  popupUser.open();
});


addCard.addEventListener('click', () => {
  popupAddCard.open();
});

