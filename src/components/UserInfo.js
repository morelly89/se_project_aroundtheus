export default class UserInfo {
  constructor({ name, about, link }) {
    this._name = document.querySelector(name);
    this._about = document.querySelector(about);
    this._avatar = document.querySelector(link);
  }

  getUserInfo() {
    const objectInfo = {
      name: this._name.textContent,
      about: this._about.textContent,
      avatar: this._avatar.src,
    };
    return objectInfo;
  }

  setUserInfo(userData) {
    this._name.textContent = userData.name;
    this._about.textContent = userData.about;
  }

  // create a setAvatar method
  setAvatar(link) {
    if (link) {
      this._avatar.src = link;
    } else {
      console.error("Enter a valid url");
    }
  }
}
