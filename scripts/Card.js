export class Card {
  constructor(data, cardSelector, handleCardClick) {
    this._cardSelector = cardSelector;
    this._linkImage = data.link;
    this._text = data.name;
    this._handleImageClick = handleCardClick;
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
      this._handleImageClick(this._linkImage, this._text)
    });
  }

  _handleLikeClick() {
    this._element.querySelector('.element__like').classList.toggle('element__like_active');
  }

  _handleTrashClick() {
    this._element.closest('.element').remove();
  }

}
