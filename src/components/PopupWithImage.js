import Popup from './Popup.js';

export default class PopupWithImage extends Popup {

  constructor(popupSelector) {
    super(popupSelector);
    this._image = this._popup.querySelector('.popup__image');
  }

  open({ link, text }) {
    this._image.src = link;
    this._image.alt = text;
    this._popup.querySelector('.popup__text').textContent = text;
    super.open();
  }

}
