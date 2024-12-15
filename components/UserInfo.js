export default class UserInfo {
  constructor({ title, description }) {
    this._title = title;
    this._description = description;
  }

  getUserInfo() {
    const inputsValue = {};
    const inputs = Array.from(
      this._popupForm.querySelectorAll(".modal__form input")
    );
    inputs.forEach((input) => {
      inputsValue[input.name] = input.value;
      inputsValue[input.description] = input.value;
    });
    return inputsValue;
  }

  setUserInfo(userInfo) {
    const inputs = Array.from(this._popupForm.querySelectorAll("input"));
    inputs.forEach((input) => {
      if (userInfo[input.name]) {
        input.value = userInfo[input.name];
        input.value = userInfo[input.description];
      }
    });
  }
}
