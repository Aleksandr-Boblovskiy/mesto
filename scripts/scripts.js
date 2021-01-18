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

function handleImage(evt) {
  const image = evt.target.closest('.element');
  popupImage.querySelector('.popup__image').src = image.querySelector('.element__image').src;
  popupImage.querySelector('.popup__text').textContent = image.querySelector('.element__title').textContent;
  popupImage.classList.add('popup_active');
}

function tooglePopup(popup) {
  popup.classList.toggle('popup_active');
}

function openPopup(popup) {
  if (popup === popupProfile) {
    userName.value = titleName.textContent;
    occupation.value = subName.textContent;
  }
  tooglePopup(popup);
}

function renderCard(item, sort = false) {
  const card = cardTemplate.cloneNode(true);
  card.querySelector('.element__image').src = item.link;
  card.querySelector('.element__image').alt = item.name;
  card.querySelector('.element__title').textContent = item.name;
  card.querySelector('.element__like').addEventListener('click', (evt) => {
    evt.target.classList.toggle('element__like_active');
  });
  card.querySelector('.element__trash').addEventListener('click', (evt) => {
    evt.target.closest('.element').remove();
  });
  card.querySelector('.element__image').addEventListener('click', (evt) => handleImage(evt));
  if (sort) { elementList.append(card); } else { elementList.prepend(card); }
}

function savePopup(popup, event) {
  event.preventDefault();
  if (popup === popupProfile) {
    titleName.textContent = userName.value;
    subName.textContent = occupation.value;
  }
  if (popup === popupCard) {
    const card = {
      name: popup.querySelector('.popup__input_name_title').value,
      link: popup.querySelector('.popup__input_name_link').value,
    };
    renderCard(card);
  }
  tooglePopup(popup);
}

const renderCards = (cards) => {
  cards.forEach((item) => {
    renderCard(item, true);
  });
};

popupCard.addEventListener('click', (event) => {
  if (event.target === event.currentTarget) {
    tooglePopup(popupCard);
  }
});

popupProfile.addEventListener('click', (event) => {
  if (event.target === event.currentTarget) {
    tooglePopup(popupProfile);
  }
});

popupImage.addEventListener('click', (event) => {
  if (event.target === event.currentTarget) {
    popupImage.classList.remove('popup_active');
  }
});

renderCards(initialCards);
closeButtonProfile.addEventListener('click', () => tooglePopup(popupProfile));
editButton.addEventListener('click', () => openPopup(popupProfile));
formProfile.addEventListener('submit', (evt) => savePopup(popupProfile, evt));
addCard.addEventListener('click', () => openPopup(popupCard));
closeButtonCard.addEventListener('click', () => tooglePopup(popupCard));
formCard.addEventListener('submit', (evt) => savePopup(popupCard, evt));
closeButtonImage.addEventListener('click', () => {
  popupImage.classList.remove('popup_active');
});
