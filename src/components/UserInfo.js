export default class UserInfo {

  constructor(nameSelector, descriptionSelector) {
    this._name = document.querySelector(nameSelector);
    this._description = document.querySelector(descriptionSelector);
  }

  getUserInfo() {

    const userInfo = {
      userName: '',
      description: '',
    }
    userInfo.fullname = this._name.textContent;
    userInfo.occupationn = this._description.textContent;

    return userInfo;
  }

  setUserInfo(data) {

    this._name.textContent = data.fullname;
    this._description.textContent = data.occupation;

  }


}
