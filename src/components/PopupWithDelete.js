export default class PopupWithDelete {
  constructor(modalSelector) {
    this._modal = document.querySelector(modalSelector); // Modal element
    this._submitButton = this._modal.querySelector("#card-delete-submit-btn"); // Submit button inside modal
    // this._setSubmitAction = []; // Placeholder for the submit action function
    this._setSubmitAction = () => {};

    // Bind the submit handler to the class instance
    this._handleSubmit = this._handleSubmit.bind(this);
  }

  open() {
    this._modal.classList.add("modal_opened"); // Open the modal
    if (this._setSubmitAction) {
      this._submitButton.addEventListener("click", this._handleSubmit); // Attach submit listener only if action is set
    }
  }

  close() {
    this._modal.classList.remove("modal_opened"); // Close the modal
    this._submitButton.removeEventListener("click", this._handleSubmit); // Remove submit listener
  }

  setSubmitAction(action) {
    this._setSubmitAction = action; // Set the submit action function
  }

  _handleSubmit() {
    if (this._setSubmitAction) {
      this._setSubmitAction(); // Call the submit action if it exists
    }
  }
}
