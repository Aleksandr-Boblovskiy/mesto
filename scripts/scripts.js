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
const cardTemplate = document.querySelector('#element-template').content;
const elementList = document.querySelector('.elements__list');
const popupCard = document.querySelector('.popup_type_card');
const addCard = document.querySelector('.profile__add-button');
const closeButtonCard = document.querySelector('.popup__close_card');
const formCard = document.querySelector('.popup__form_card');
const popupImage = document.querySelector('.popup_type_image');
const closeButtonImage = document.querySelector('.popup__close_image');
let popupActive;

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

function handleImage(name, link) {
  const tempImg = popupImage.querySelector('.popup__image');
  tempImg.src = link;
  tempImg.alt = name;
  popupImage.querySelector('.popup__text').textContent = name;
  openPopup(popupImage);
}

function createCard(name, link) {
  const card = cardTemplate.cloneNode(true);
  const image = card.querySelector('.element__image');
  const text = card.querySelector('.element__title');
  const like = card.querySelector('.element__like');
  const trash = card.querySelector('.element__trash');
  image.src = link;
  image.alt = name;
  text.textContent = name;
  like.addEventListener('click', (evt) => {
    evt.target.classList.toggle('element__like_active');
  });
  trash.addEventListener('click', (evt) => {
    evt.target.closest('.element').remove();
  });
  image.addEventListener('click', () => handleImage(name, link));
  return card;
}

function addCardCont(container, cardElement) {
  container.prepend(cardElement);
}

function saveCard(event) {
  event.preventDefault();
  const card = {
    name: popupCard.querySelector('.popup__input_name_title').value,
    link: popupCard.querySelector('.popup__input_name_link').value,
  };
  addCardCont(elementList, createCard(card.name, card.link));
  formCard.reset();
  closePopup(popupActive);
}

function saveProfile(event) {
  event.preventDefault();
  titleName.textContent = userName.value;
  subName.textContent = occupation.value;
  closePopup(popupActive);
}

const renderCards = (cards) => {
  cards.forEach((card) => {
    elementList.append(createCard(card.name, card.link));
  });
};

renderCards(initialCards);
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
