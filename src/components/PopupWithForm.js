import Popup from "./Popup.js";
export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._popupForm = this._popupElement.querySelector(".modal__form");
    this._handleFormSubmit = handleFormSubmit;
    //It accepts two arguments: the popup selector and a callback function,
    //which PopupWithForm calls when the forms submit event fires.
  }

  close() {
    super.close();
  }

  _getInputValues() {
    const inputValues = {};
    const inputs = Array.from(
      this._popupForm.querySelectorAll(".modal__form-input")
    );
    inputs.forEach((input) => {
      inputValues[input.name] = input.value;
    });
    return inputValues;

    //which collects data from all the input fields and returns it as an object.
    //This data should then be passed to the submission handler as an argument.
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const formData = this._getInputValues();
      this._handleFormSubmit(formData);
      this._popupForm.reset();
      this.close();
    });
    //The setEventListeners() method of the PopupWithForm class should add a submit
    // event listener to the form and call the setEventListeners() method of the parent class.
  }
}

//Create an instance of the PopupWithForm class for each popup that contains a form,
// and call their setEventListeners() method.
