export default class FormValidator {
  constructor(data, formElement) {
    this._formSelector = data.formSelector;
    this._inputSelector = data.inputSelector;
    this._submitButtonSelector = data.submitButtonSelector;
    this._inactiveButtonClass = data.inactiveButtonClass;
    this._inputErrorClass = data.inputErrorClass;
    this._errorClass = data.errorClass;
    this._formElement = formElement;
    this._buttonElement = formElement.querySelector(this._submitButtonSelector);

  }

  _showInputError(inputElement, errorMessage) {
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(this._inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._errorClass);
  }

  _hideInputError(inputElement) {
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(this._inputErrorClass);
    errorElement.classList.remove(this._errorClass);
    errorElement.textContent = '_';
  };

  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  };


  _hasInvalidInput(inputList) {
    return inputList.some((inputElement) => !inputElement.validity.valid)
  };

  _toggleButtonState(inputList) {
    if (this._hasInvalidInput(inputList)) {
      this.disableButtonSubmit();
    } else {
      this._buttonElement.classList.remove(this._inactiveButtonClass);
      this._buttonElement.disabled = false;
    }
  };

  _setEventListeners() {
    const inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
    inputList.forEach((inputElement) => {
      this._toggleButtonState(inputList);
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState(inputList);
      });
    });
    this._formElement.addEventListener('reset', () => {
      inputList.forEach((inputElement) => {
        this._hideInputError(inputElement)
        this._toggleButtonState(inputList, buttonElement);
      })
    });
  };

  disableButtonSubmit() {
    this._buttonElement.classList.add(this._inactiveButtonClass);
    this._buttonElement.disabled = true;
  }

  enableValidation() {
    this._setEventListeners();
  }

}
