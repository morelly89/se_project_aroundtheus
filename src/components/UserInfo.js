export default class UserInfo {
  constructor({ avatar, title, description }) {
    this._title = document.querySelector(title);
    this._description = document.querySelector(description);
    this._avatar = document.querySelector(avatar);
    this._profileImageButton = document.querySelector(".profile__image-button");
    this._profileModalCloseButton = document.querySelector(
      ".profile-modal-close-btn"
    );
    this._profileAvatarInput = document.querySelector("#profile-avatar-input");
    this._profileImageSubmitBtnv = document.querySelector(
      "#profile-modal-submit-btn"
    );
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
  setAvatar() {
    const newAvatarUrl = this._profileAvatarInput.value;
    if (newAvatarUrl) {
      this._avatar.src = newAvatarUrl;
    } else {
      ("Enter a valid url");
    }
  }
}
