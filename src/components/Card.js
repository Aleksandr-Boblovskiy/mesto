export default class Card {
  constructor(data, cardSelector, handleCardClick, handleCardDelete, handleLikeCard, handleDeleteLike) {
    this._cardSelector = cardSelector;
    this._linkImage = data.link;
    this._text = data.name;
    this._id = data._id;
    this._handleImageClick = handleCardClick;
    this._likes = data.likes;
    this._owner = data.owner;
    this._handleCardDelete = handleCardDelete;
    this._handleLikeCard = handleLikeCard;
    this._handleDeleteLike = handleDeleteLike;
    this._userId = data.userId;
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
    this._like = this._element.querySelector('.element__like');
    this._likesSelector = this._element.querySelector('.element__likes')
    if (this._likes.some(like => like._id === this._userId)) {
      this._like.classList.add('element__like_active');
    }
    this._likesSelector.textContent = this._likes.length;
    if (this._owner._id !== this._userId) {
      this._element.querySelector('.element__trash').style.display = 'none';
    }
    this._setEventListeners();
    return this._element;
  }

  _setEventListeners() {
    this._element.querySelector('.element__like').addEventListener('click', () => {
      if (!this._like.classList.contains('element__like_active')) {
        this._handleLikeCard(this);
      } else {
        this._handleDeleteLike(this);
      }
    });
    this._element.querySelector('.element__trash').addEventListener('click', () => {
      this._handleCardDelete(this);
    });

    this._img.addEventListener('click', () => {
      this._handleImageClick(this._linkImage, this._text)
    });
  }

  getId() {
    return this._id;
  }

  setLikesInfo(data) {
    if (data.likes.some(like => like._id === this._userId)) {
      this._like.classList.add('element__like_active');
      this._likesSelector.textContent = data.likes.length;
    } else {
      this._like.classList.remove('element__like_active');
      this._likesSelector.textContent = data.likes.length;
    }
  }

  removeCard() {
    this._element.remove();
  }

}
