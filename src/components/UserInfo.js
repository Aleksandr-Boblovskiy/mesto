export default class UserInfo {

  constructor({ nameSelector, descriptionSelector }) {
    this._nameSelector = nameSelector;
    this._descriptionSelector = descriptionSelector;
  }

  getUserInfo() {

    const name = document.querySelector(this._nameSelector).textContent;


    return this._formValues;
  }

  setUserInfo() {

  }


}
