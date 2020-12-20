let EditButton = document.querySelector('.profile__EditButton')
let popup = document.querySelector('.popup')
let closeButton = document.querySelector('.popup__close')
let form = document.querySelector('.popup__container')
let titleName = document.querySelector('.profile__title')
let popupName = document.querySelector('.popup__name')
let subName = document.querySelector('.profile__subtitle')
let popupSubName = document.querySelector('.popup__subname')

function tooglePopup() {
  popup.classList.toggle('popup_active')
};

EditButton.addEventListener('click', () => {
  tooglePopup()
  popupName.value = titleName.textContent
  popupSubName.value = subName.textContent
});

closeButton.addEventListener('click', tooglePopup)

popup.addEventListener('click', (Event) => {
  if (Event.target === Event.currentTarget)
  tooglePopup()
})

form.addEventListener('submit', (event) => {
  event.preventDefault()
  titleName.textContent = popupName.value
  subName.textContent = popupSubName.value
  tooglePopup()
})

let like = document.querySelectorAll('.elements__like')

like.forEach((value) => {
  value.addEventListener('click', () => {
    value.classList.toggle('elements__like_active')
  })
})
