export default class UserInfo {
  constructor({ title, description }) {
    this._title = document.querySelector(title);
    this._description = document.querySelector(description);
  }

  getUserInfo() {
    const objectInfo = {
      title: this._title.textContent,
      description: this._description.textContent,
    };
    return objectInfo;
  }

  setUserInfo(userData) {
    this._title.textContent = userData.title;
    this._description.textContent = userData.description;
  }
}
