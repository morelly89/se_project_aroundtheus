export default class FormValidator {
  constructor(settings, formElement) {
    this._formSelector = settings.formSelector;
    this._inputSelector = settings.inputSelector;
    this._submitButtonSelector = settings.submitButtonSelector;
    this._inactiveButtonClass = settings.inactiveButtonClass;
    this._inputErrorClass = settings.inputErrorClass;
    this._errorClass = settings.errorClass;
    this._formElement = formElement;
  }

  enableValidation() {
    // Select all input fields within the form
    this._inputs = Array.from(
      this._formElement.querySelectorAll(this._inputSelector)
    );
    // Select the submit button
    this._submitButton = this._formElement.querySelector(
      this._submitButtonSelector
    );

    // Set event listeners on each input element
    this._setEventListeners();
    this.disableSubmitButton();
  }

  _checkValidity(input) {
    const errorElement = this._formElement.querySelector(`#${input.id}-error`);
    const isValid = input.validity.valid;

    if (!isValid) {
      this._showInputError(input, errorElement);
    } else {
      this._hideInputError(input, errorElement);
    }
  }

  _showInputError(input, errorElement) {
    input.classList.add(this._inputErrorClass);
    errorElement.textContent = input.validationMessage;
    errorElement.classList.add(this._errorClass);
  }

  _hideInputError(input, errorElement) {
    input.classList.remove(this._inputErrorClass);
    errorElement.textContent = "";
    errorElement.classList.remove(this._errorClass);
  }

  disableSubmitButton() {
    this._submitButton.classList.add(this._inactiveButtonClass);
    this._submitButton.setAttribute("disabled", "disabled");
  }

  toggleSubmitButton() {
    const isFormValid = this._inputs.every((input) => input.validity.valid);
    if (isFormValid) {
      this._submitButton.classList.remove(this._inactiveButtonClass);
      this._submitButton.removeAttribute("disabled");
    } else {
      this.disableSubmitButton();
    }
  }

  _setEventListeners() {
    // Loop through each input and set the event listener
    this._inputs.forEach((input) => {
      input.addEventListener("input", (event) => {
        this._checkValidity(event.target);
        this.toggleSubmitButton();
      });
    });

    // Prevent form submission for testing or additional behavior (optional)
    this._formElement.addEventListener("submit", (e) => {
      e.preventDefault();
    });
  }
}
