// Function to enable form validation
function enableValidation(config) {
  const forms = document.querySelectorAll(config.formSelector); // Use formSelector to target all forms

  forms.forEach((form) => {
    const inputs = Array.from(form.querySelectorAll(config.inputSelector)); // Get all input elements in the form
    const submitButton = form.querySelector(config.submitButtonSelector); // Submit button
    const errorSpans = Array.from(form.querySelectorAll(".popup__error")); // Error spans for validation messages

    // Check input validity
    function checkValidity(input) {
      const errorElement = document.querySelector(`#${input.id}-error`);
      const isValid = input.validity.valid;

      if (!isValid) {
        showInputError(input, errorElement);
      } else {
        hideInputError(input, errorElement);
      }
    }

    // Show error message
    function showInputError(input, errorElement) {
      input.classList.add(config.inputErrorClass);
      errorElement.textContent = input.validationMessage;
      errorElement.classList.add(config.errorClass);
    }

    // Hide error message
    function hideInputError(input, errorElement) {
      input.classList.remove(config.inputErrorClass);
      errorElement.textContent = "";
      errorElement.classList.remove(config.errorClass);
    }

    // Enable or disable submit button
    function toggleSubmitButton() {
      const isFormValid = inputs.every((input) => input.validity.valid);
      if (isFormValid) {
        submitButton.classList.remove(config.inactiveButtonClass);
        submitButton.removeAttribute("disabled");
      } else {
        submitButton.classList.add(config.inactiveButtonClass);
        submitButton.setAttribute("disabled", "disabled");
      }
    }

    // Event listener for input validation
    inputs.forEach((input) => {
      input.addEventListener("input", (event) => {
        checkValidity(event.target);
        toggleSubmitButton();
      });
    });

    // Prevent form submission if validation fails
    form.addEventListener("submit", (e) => {
      e.preventDefault();
    });

    // Initialize the submit button state
    toggleSubmitButton();
  });
}

// Call enableValidation with configuration
enableValidation({
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".modal__button, .modal__add-button", // Allow both buttons
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
});
