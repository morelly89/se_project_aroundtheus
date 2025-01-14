import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._popupForm = this._popupElement.querySelector(".modal__form");
    this._submitButton = this._popupForm.querySelector("button[type='submit']"); // Reference to the submit button
    this._handleFormSubmit = handleFormSubmit;
    // It accepts two arguments: the popup selector and a callback function,
    // which PopupWithForm calls when the form's submit event fires.
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
    // Collects data from all the input fields and returns it as an object.
    // This data should be passed to the submission handler as an argument.
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupForm.addEventListener("submit", (event) => {
      event.preventDefault();

      // Change the button text and disable it while processing
      this._submitButton.textContent = "Saving...";
      this._submitButton.disabled = true;
      const formData = this._getInputValues();
      this._handleFormSubmit(formData)
        .then(() => {
          // After submission completes, reset button state
          this._submitButton.textContent = "Submit";
          this._submitButton.disabled = false;
          this._popupForm.reset();
          this.close();
        })
        .catch((error) => {
          // If there's an error, reset the button state
          this._submitButton.textContent = "Submit";
          this._submitButton.disabled = false;
          console.error("Form submission failed", error);
        });
    });
    // Adds a submit event listener to the form and calls the setEventListeners() method of the parent class.
  }

  setSubmitAction(handleSubmit) {
    this._handleFormSubmit = handleSubmit;
  }
}
