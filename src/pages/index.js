import '../pages/index.css';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import UserInfo from '../components/UserInfo.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import Api from '../components/Api.js';

let cardsList;

const editButton = document.querySelector('.profile__edit-button');
const formProfile = document.querySelector('.popup__form_profile');
const userName = document.querySelector('.popup__input_name_full-name');
const occupation = document.querySelector('.popup__input_name_occupation');
const addCard = document.querySelector('.profile__add-button');
const formCard = document.querySelector('.popup__form_card');
const avatar = document.querySelector('.profile__container');
const formAvatar = document.querySelector('.popup__form_avatar');

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
const avatarFormValidation = new FormValidator(validationSettings, formAvatar);
const user = new UserInfo('.profile__title', '.profile__subtitle', '.profile__avatar');
let textButtonSubmit;

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-21',
  headers: {
    authorization: '5f90b346-f8ab-40ea-a16b-fbb4288c433c',
    'Content-Type': 'application/json'
  }
});

function loadingStatus(loading) {
  if (loading) {
    textButtonSubmit = document.querySelector('.popup_active').querySelector('.popup__button');
    textButtonSubmit.textContent = 'Сохранение...';
  } else {
    textButtonSubmit.textContent = 'Сохранить';
  }
}

api.getUserInfo()
  .then((userData) => {
    user.setInfo(userData);

    api.getInitialCards()
      .then((result) => {
        // обрабатываем результат

        cardsList = new Section(
          {
            items: result,
            renderer: (item) => {
              item.userId = userData._id;
              const cardElement = createCard(item);
              cardsList.addItem(cardElement, false);

            },
          }, '.elements__list'
        )
        cardsList.render();
      })
      .catch((err) => {
        console.log(err); // выведем ошибку в консоль
      });

  })
  .catch((err) => {
    console.log(err); // выведем ошибку в консоль
  });



const popupAvatar = new PopupWithForm('.popup_type_avatar', (item) => {
  loadingStatus(true);
  api.pullNewAvatar(item)
    .then((result) => {

      api.getUserInfo()
        .then((result) => {
          user.setInfo(result);
        })
        .catch((err) => {
          console.log(err); // выведем ошибку в консоль
        })
        .finally(() => loadingStatus(false));

    })
    .catch((err) => {
      console.log(err); // выведем ошибку в консоль
    });
});
popupAvatar.setEventListeners();

const popupImg = new PopupWithImage('.popup_type_image');
popupImg.setEventListeners();

function handlePopupCardOpen(link, name) {
  popupImg.open(link, name);
}

function handleCardDelete(id) {
  const popupDelete = new PopupWithForm('.popup_type_delete', () => {
    api.deleteCard(id)
      .then((result) => this._element.closest('.element').remove())
      .catch((err) => {
        console.log(err); // выведем ошибку в консоль
      });
  });
  popupDelete.setEventListeners();
  popupDelete.open();
}

function handleLikeCard(id) {
  return api.likeCard(id);
}

function handleDeleteLike(id) {
  return api.deleteLikeCard(id);
}

function createCard(item) {
  const card = new Card(item, '#element-template', handlePopupCardOpen, handleCardDelete, handleLikeCard, handleDeleteLike);
  return card.generateCard();
}

const popupAddCard = new PopupWithForm('.popup_type_card', (item) => {
  loadingStatus(true);
  api.pullNewCard(item)
    .then((result) => {
      const cardElement = createCard({ ...result, userId: user.getInfo()._id });
      cardsList.addItem(cardElement, true);
    })
    .catch((err) => {
      console.log(err); // выведем ошибку в консоль
    })
    .finally(() => loadingStatus(false));
});

popupAddCard.setEventListeners();

const popupUser = new PopupWithForm('.popup_type_profile', (item) => {
  loadingStatus(true);
  api.pullUserInfo(item)
    .then((result) => {

      user.setInfo(result);
    })
    .catch((err) => {
      console.log(err); // выведем ошибку в консоль
    })
    .finally(() => loadingStatus(false));
});

popupUser.setEventListeners();

profileFormValidation.enableValidation();
cardFormValidation.enableValidation();
avatarFormValidation.enableValidation();

editButton.addEventListener('click', () => {
  const userData = user.getInfo();
  userName.value = userData.name;
  occupation.value = userData.about;
  popupUser.open();
});

addCard.addEventListener('click', () => {
  popupAddCard.open();
  cardFormValidation.disableButtonSubmit();
});

avatar.addEventListener('click', () => {
  popupAvatar.open();
})
