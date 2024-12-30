import { initialCards, validationSettings } from "../../util/constants.js";
import "../pages/index.css";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";
import Api from "../components/Api.js";

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

const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "e2ed982e-7073-428a-82c0-3445ee97b908",
    "Content-Type": "application/json",
  },
});

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
/*                               Event Listeners                            */
/* -------------------------------------------------------------------------- */

addButton.addEventListener("click", () => {
  addCardFormValidator.disableSubmitButton();
  addCardModal.open();
});

profileEditButton.addEventListener("click", () => {
  const userData = profileInfo.getUserInfo();
  profileTitleInput.value = userData.title;
  profileDescriptionInput.value = userData.description;
  profileModal.open();
});

fetch("https://around-api.en.tripleten-services.com/v1/cards", {
  headers: {
    authorization: "e2ed982e-7073-428a-82c0-3445ee97b908",
  },
})
  .then((res) => res.json())
  .then((result) => {
    console.log(result);
  });
