export default class UserInfo {

  constructor(nameSelector, descriptionSelector, avatarSelector) {
    this._name = document.querySelector(nameSelector);
    this._description = document.querySelector(descriptionSelector);
    this._avatar = document.querySelector(avatarSelector);
  }

  getInfo() {
    return {
      name: this._name.textContent,
      about: this._description.textContent,
      _id: this._id
    };
  }

  setInfo(data) {

    this._name.textContent = data.name;
    this._description.textContent = data.about;
    this._avatar.src = data.avatar;
    this._id = data._id;
  }


}
