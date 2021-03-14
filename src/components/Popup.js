export default class Popup {
  constructor(popupSelector) {
    this._popupSelector = popupSelector;
    this._popup = document.querySelector(this._popupSelector);
    this._closeButton = this._popup.querySelector('.popup__close');
  }

  open() {
    this._popup.classList.add('popup_active');
  }

  close() {
    this._popup.removeEventListener('mousedown', this._handleOverlayClose);
    document.removeEventListener('keydown', this._handleEscClose);
    this._popup.classList.remove('popup_active');
  }

  _handleEscClose(event) {
    if (event.key === 'Escape') {
      this.close();
    }
  }

  _handleOverlayClose(event) {
    if (event.target === event.currentTarget) {
      this.close();
    }
  }

  setEventListeners() {
    this._popup.addEventListener('mousedown', this._handleOverlayClose.bind(this));
    document.addEventListener('keydown', this._handleEscClose.bind(this));
    this._closeButton.addEventListener('click', () => {
      this.close();
    });
  }

}
