const showInputError = (formElement, inputElement, errorMessage, vilidationConfig) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(vilidationConfig.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(vilidationConfig.errorClass);
};

const hideInputError = (formElement, inputElement, vilidationConfig) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(vilidationConfig.inputErrorClass);
  errorElement.classList.remove(vilidationConfig.errorClass);
  errorElement.textContent = '_';
};

const checkInputValidity = (formElement, inputElement, vilidationConfig) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, vilidationConfig);
  } else {
    hideInputError(formElement, inputElement, vilidationConfig);
  }
};

// eslint-disable-next-line max-len
const hasInvalidInput = (inputList) => inputList.some((inputElement) => !inputElement.validity.valid);

const toggleButtonState = (inputList, buttonElement, vilidationConfig) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(vilidationConfig.inactiveButtonClass);
    buttonElement.disabled = true;
  } else {
    buttonElement.classList.remove(vilidationConfig.inactiveButtonClass);
    buttonElement.disabled = false;
  }
};

const setEventListeners = (formElement, vilidationConfig) => {
  const inputList = Array.from(formElement.querySelectorAll(vilidationConfig.inputSelector));
  const buttonElement = formElement.querySelector(vilidationConfig.submitButtonSelector);

  inputList.forEach((inputElement) => {
    toggleButtonState(inputList, buttonElement, vilidationConfig);
    inputElement.addEventListener('input', () => {
      checkInputValidity(formElement, inputElement, vilidationConfig);
      toggleButtonState(inputList, buttonElement, vilidationConfig);
    });
  });
};

const enableValidation = (vilidationConfig) => {
  const formList = Array.from(document.querySelectorAll(vilidationConfig.formSelector));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    setEventListeners(formElement, vilidationConfig);
  });
};

enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible',
});
