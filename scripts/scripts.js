const editButton = document.querySelector('.profile__edit-button');
const popupProfile = document.querySelector('.popup_type_profile');
const closeButtonProfile = document.querySelector('.popup__close_profile');
const formProfile = document.querySelector('.popup__container_profile');
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
const formCard = document.querySelector('.popup__container_card');
const popupImage = document.querySelector('.popup_type_image');
const closeButtonImage = document.querySelector('.popup__close_image');

function closePopup(popup) {
  popup.removeEventListener('click', () => { });
  popup.classList.remove('popup_active');
}

function openPopup(popup) {
  popup.classList.toggle('popup_active');
  popup.addEventListener('click', (event) => {
    if (event.target === event.currentTarget) {
      closePopup(popup);
    }
  });
}

function handleImage(evt) {
  const image = evt.target.closest('.element');
  popupImage.querySelector('.popup__image').src = image.querySelector('.element__image').src;
  popupImage.querySelector('.popup__text').textContent = image.querySelector('.element__title').textContent;
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
  image.addEventListener('click', (evt) => handleImage(evt));
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
  closePopup(popupCard);
}

function saveProfile(event) {
  event.preventDefault();
  titleName.textContent = userName.value;
  subName.textContent = occupation.value;
  closePopup(popupProfile);
}

const renderCards = (cards) => {
  cards.forEach((card) => {
    elementList.append(createCard(card.name, card.link));
  });
};

renderCards(initialCards);
closeButtonProfile.addEventListener('click', () => closePopup(popupProfile));
editButton.addEventListener('click', () => {
  openPopup(popupProfile);
  userName.value = titleName.textContent;
  occupation.value = subName.textContent;
});
formProfile.addEventListener('submit', (evt) => saveProfile(evt));
addCard.addEventListener('click', () => openPopup(popupCard));
closeButtonCard.addEventListener('click', () => closePopup(popupCard));
formCard.addEventListener('submit', (evt) => saveCard(evt));
closeButtonImage.addEventListener('click', () => {
  closePopup(popupImage);
});
