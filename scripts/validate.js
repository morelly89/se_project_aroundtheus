const config = {
  formSelector: ".modal__form",
  inputSelector: ".modal__form-input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

function setEventListeners(formEl, options) {
  const { inputSelector } = options;
  const inputEls = [...formEl.querySelectorAll(options.inputSelector)];
  inputEls.forEach((inputEl) => {
    inputEl.addEventListener("input", (e) => {});
  });
}

function enableValidation(options) {
  const formEls = [...document.querySelectorAll(options.formSelector)];
  formEls.forEach((formEl) => {
    formEl.addEventListener("submit", (e) => {
      e.preventDefault();
    });
  });
}

setEventListeners(formElement, options);
