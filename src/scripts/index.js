import "../pages/index.css";
import Card from "./Card.js";
import FormValidator from "./FormValidator.js";
import PopupWithForm from "./PopupWithForm.js";
import PopupWithImage from "./PopupWithImage.js";
import Section from "./Section.js";
import UserInfo from "./UserInfo.js";

const initialCards = [
  {
    name: "Yosemite Valley",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
  },
  {
    name: "Lake House",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg",
  },
  {
    name: "Bald Mountains",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg",
  },
  {
    name: "Vanoise National Park",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg",
  },
  {
    name: "Lago de Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg",
  },
];

const profileEditButton = document.querySelector("#profile-edit-button");
const editProfileCloseBtn = document.querySelector("#edit-close-button");
const editProfileModal = document.querySelector("#edit-modal");

const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const profileTitleInput = document.querySelector("#profile-title-input");
const profileDescriptionInput = document.querySelector(
  "#profile-description-input"
);
const cardTemplate =
  document.querySelector("#card-template").content.firstElementChild;
const cardTemplateClass = document.querySelector(".template");
const profileForm = document.forms["profile-form"];
const addModalForm = document.querySelector("#add-card-form");
const cardListEl = document.querySelector(".cards__list");
const addButton = document.querySelector(".profile__add-button");
const addModal = document.querySelector("#add-modal");

const addModalTitle = addModalForm.querySelector("#modal-add-input-title");
const addModalUrl = addModalForm.querySelector("#modal-add-input-url");
const previewModal = document.querySelector("#image-preview-modal");
const previewModalImage = document.querySelector(".modal__image");
const previewModalTitle = document.querySelector(".modal__image-description");
const closeButtons = document.querySelectorAll(".modal__close-button");
const modalImageContainer = document.querySelector(
  ".modal__container--preview"
);

const validationSettings = {
  formSelector: ".modal__form",
  inputSelector: ".modal__form-input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
};

const profileFormValidator = new FormValidator(validationSettings, profileForm);

const addCardFormValidator = new FormValidator(
  validationSettings,
  addModalForm
);

const section = new Section(
  {
    items: initialCards,
    renderer: (cardData) => {
      const card = createCard(cardData);
      section.addItem(card);
    },
  },
  ".cards__list"
);
const popupWithImage = new PopupWithImage("#image-preview-modal");

popupWithImage.setEventListeners();
const addCardModal = new PopupWithForm("#add-modal", (formData) => {
  const card = createCard(formData);
  section.addItem(card);
});

const profileInfo = new UserInfo({
  title: ".profile__title",
  description: ".profile__description",
});

const profileModal = new PopupWithForm("#edit-modal", (formData) => {
  profileInfo.setUserInfo(formData);
});
profileModal.setEventListeners();

const createCard = (data) => {
  return new Card(data, "#card-template", handleCardClick).getElement();
};
/* -------------------------------------------------------------------------- */
/*                                  Functions                                 */
/* -------------------------------------------------------------------------- */

section.renderItems();
profileFormValidator.enableValidation();
addCardFormValidator.enableValidation();
addCardModal.setEventListeners();
popupWithImage.setEventListeners();

function handleCardClick(cardData) {
  popupWithImage.open(cardData);
}
/* -------------------------------------------------------------------------- */
/*                                  Handlers                                  */
/* -------------------------------------------------------------------------- */

/* -------------------------------------------------------------------------- */
/*                               Event Listeners                            */
/* -------------------------------------------------------------------------- */

addButton.addEventListener("click", () => {
  addCardModal.open();
});

profileEditButton.addEventListener("click", () => {
  profileModal.open();
});

editProfileCloseBtn.addEventListener("click", () => {
  profileModal.close();
});
