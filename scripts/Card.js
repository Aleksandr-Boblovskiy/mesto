const popupImage = document.querySelector('.popup_type_image');
const tempImg = popupImage.querySelector('.popup__image');
const textImg = popupImage.querySelector('.popup__text');

export class Card {
  constructor(data, cardSelector, openPopup) {
    this._cardSelector = cardSelector;
    this._linkImage = data.link;
    this._text = data.name;
    this._openPopup = openPopup;

  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content
      .querySelector('.element')
      .cloneNode(true);

    return cardElement;
  }

  generateCard() {
    this._element = this._getTemplate();

    this._img = this._element.querySelector('.element__image');
    this._img.src = this._linkImage;
    this._img.alt = this._text;

    this._element.querySelector('.element__title').textContent = this._text;

    this._setEventListeners();

    return this._element;
  }


  _setEventListeners() {
    this._element.querySelector('.element__like').addEventListener('click', () => {
      this._handleLikeClick();
    });
    this._element.querySelector('.element__trash').addEventListener('click', () => {
      this._handleTrashClick();
    });
    this._img.addEventListener('click', () => {
      this._handleImageClick();
    });
  }

  _handleLikeClick() {
    this._element.querySelector('.element__like').classList.toggle('element__like_active');
  }

  _handleTrashClick() {
    this._element.closest('.element').remove();
  }

  _handleImageClick() {
    tempImg.src = this._linkImage;
    tempImg.alt = this._text;
    textImg.textContent = this._text;
    this._openPopup(popupImage);
  }

}
