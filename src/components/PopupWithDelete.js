export default class PopupWithDelete {
  constructor(modalSelector) {
    this._modal = document.querySelector(modalSelector); // Modal element
    this._submitButton = this._modal.querySelector("#card-delete-submit-btn"); // Submit button inside modal
    this._setSubmitAction = () => {}; // Placeholder for the submit action function
    this._closeButton = this._modal.querySelector(".profile-modal-close-btn"); // Assuming close button selector is correct

    // Bind methods to the class instance
    this._handleSubmit = this._handleSubmit.bind(this);
    this._handleOverlayClick = this._handleOverlayClick.bind(this);
    this._handleEscapeKeyPress = this._handleEscapeKeyPress.bind(this);
  }

  open() {
    this._modal.classList.add("modal_opened"); // Open the modal
    if (this._setSubmitAction) {
      this._submitButton.addEventListener("click", this._handleSubmit); // Attach submit listener only if action is set
    }

    // Attach overlay click and escape key listeners
    this._modal.addEventListener("click", this._handleOverlayClick);
    document.addEventListener("keydown", this._handleEscapeKeyPress);
  }

  close() {
    this._modal.classList.remove("modal_opened"); // Close the modal
    this._submitButton.removeEventListener("click", this._handleSubmit); // Remove submit listener

    // Remove overlay click and escape key listeners
    this._modal.removeEventListener("click", this._handleOverlayClick);
    document.removeEventListener("keydown", this._handleEscapeKeyPress);
  }

  setSubmitAction(action) {
    this._setSubmitAction = action; // Set the submit action function
  }

  _handleSubmit() {
    if (this._setSubmitAction) {
      this._setSubmitAction(); // Call the submit action if it exists
    }
  }

  _handleOverlayClick(event) {
    if (event.target === this._modal) {
      this.close();
    }
  }

  _handleEscapeKeyPress(event) {
    if (event.key === "Escape") {
      this.close();
    }
  }
}
