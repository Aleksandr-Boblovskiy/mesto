export default class UserInfo {

  constructor(nameSelector, descriptionSelector, avatarSelector) {
    this._name = document.querySelector(nameSelector);
    this._description = document.querySelector(descriptionSelector);
    this._avatar = document.querySelector(avatarSelector);
  }

  getUserInfo() {

    const userInfo = {

    }
    userInfo.name = this._name.textContent;
    userInfo.about = this._description.textContent;

    return userInfo;
  }

  setUserInfo(data) {

    this._name.textContent = data.name;
    this._description.textContent = data.about;
    this._avatar.src = data.avatar;

  }


}
