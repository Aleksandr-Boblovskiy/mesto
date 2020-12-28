const editButton = document.querySelector('.profile__edit-button');
const popup = document.querySelector('.popup');
const closeButton = document.querySelector('.popup__close');
const form = document.querySelector('.popup__container');
const titleName = document.querySelector('.profile__title');
const username = document.querySelector('.popup__input_name_full-name');
const subName = document.querySelector('.profile__subtitle');
const occupation = document.querySelector('.popup__input_name_occupation');
const like = document.querySelectorAll('.element__like');

function tooglePopup() {
  popup.classList.toggle('popup_active');
}

function openPopup() {
  tooglePopup();
  username.value = titleName.textContent;
  occupation.value = subName.textContent;
}

function savePopup(event) {
  event.preventDefault();
  titleName.textContent = username.value;
  subName.textContent = occupation.value;
  tooglePopup();
}

popup.addEventListener('click', (event) => {
  if (event.target === event.currentTarget) {
    tooglePopup();
  }
});

closeButton.addEventListener('click', tooglePopup);
editButton.addEventListener('click', openPopup);
form.addEventListener('submit', savePopup);

like.forEach((value) => {
  value.addEventListener('click', (evt) => {
    evt.target.classList.toggle('element__like_active');
  });
});
