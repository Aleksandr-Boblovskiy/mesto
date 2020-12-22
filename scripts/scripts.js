let editButton = document.querySelector('.profile__edit-button');
let popup = document.querySelector('.popup');
let closeButton = document.querySelector('.popup__close');
let form = document.querySelector('.popup__container');
let titleName = document.querySelector('.profile__title');
let username = document.querySelector('.popup__name');
let subName = document.querySelector('.profile__subtitle');
let occupation = document.querySelector('.popup__subname');
let like = document.querySelectorAll('.elements__like');

function tooglePopup() {
  popup.classList.toggle('popup_active');
};

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
  if (event.target === event.currentTarget)
  tooglePopup();
});

closeButton.addEventListener('click', tooglePopup);
editButton.addEventListener('click', openPopup);
form.addEventListener('submit', savePopup);

like.forEach((value) => {
  value.addEventListener('click', () => {
    value.classList.toggle('elements__like_active');
  });
});
