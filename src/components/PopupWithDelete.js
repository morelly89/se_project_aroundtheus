import Popup from "./Popup";

export default class PopupWithDelete extends Popup {
  constructor(modalSelector) {
    super(modalSelector);
    this._submitButton = this._popupElement.querySelector(
      "#card-delete-submit-btn"
    ); // Submit button inside modal
    this._setSubmitAction = () => {}; // Placeholder for the submit action function
    this._closeButton = this._popupElement.querySelector(
      ".profile-modal-close-btn"
    ); // Assuming close button selector is correct

    // Bind methods to the class instance
    this._handleSubmit = this._handleSubmit.bind(this);
  }

  open() {
    super.open();
    if (this._setSubmitAction) {
      this._submitButton.addEventListener("click", this._handleSubmit);
    } // Attach submit listener only if action is set
  }

  close() {
    super.close();
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
