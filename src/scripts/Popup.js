export default class Popup {
  constructor(popupSelector) {
    this._popupSelector = popupSelector;

    this._popup = document.querySelector(this._popupSelector);
  }

  open() {
    this._popup.classList.add('popup_active');
  }

  close() {
    popup.removeEventListener('mousedown', this._handleOverlayClose);
    document.removeEventListener('keydown', this._handleEscClose);
    popup.classList.remove('popup_active');
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
    popup.addEventListener('mousedown', this._handleOverlayClose);
    document.addEventListener('keydown', this._handleEscClose);
  }

}
