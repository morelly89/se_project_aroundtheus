export default class UserInfo {
  constructor({ title, description, profilePic }, handleProfilePicClick) {
    this._title = document.querySelector(title);
    this._description = document.querySelector(description);
    this._profilePic = document.querySelector(profilePic);
    this._closeBtn = document.querySelector("#edit-close-button");
    this._profileImage = document.querySelector(".profile__image");
    this._handleProfilePicClick = handleProfilePicClick;
  }

  getUserInfo() {
    const objectInfo = {
      title: this._title.textContent,
      description: this._description.textContent,
    };
    return objectInfo;
  }

  setUserInfo(userData) {
    this._title.textContent = userData.name;
    this._description.textContent = userData.about;
  }

  handleProfilePicClick() {
    this._profilePic(this);
  }

  setEventListeners() {
    this._profileImage.addEventListener("mouseenter", () => {
      this._profileImage.classList.add(".hover-icon");
    });
    this._profileImage.addEventListener("mouseleave", () => {
      this._profileImage.classList.add(".hover-icon");
    });
  }
}
