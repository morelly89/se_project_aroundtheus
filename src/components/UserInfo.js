export default class UserInfo {
  constructor({ title, description, link }) {
    this._title = document.querySelector(title);
    this._description = document.querySelector(description);
    this._avatar = document.querySelector(link);
    this._profileImageButton = document.querySelector(".profile__image-button");
  }

  getUserInfo() {
    const objectInfo = {
      title: this._title.textContent,
      description: this._description.textContent,
      avatar: this._avatar.src,
    };
    return objectInfo;
  }

  setUserInfo(userData) {
    this._title.textContent = userData.name;
    this._description.textContent = userData.about;
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
