import { validationSettings } from "../../util/constants.js";
import Api from "../components/Api.js";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";
import "../pages/index.css";

const cardDeleteModal = document.querySelector("#card-delete-modal");
const profileEditButton = document.querySelector("#profile-edit-button");
const editProfileCloseBtn = document.querySelector("#edit-close-button");
const modalDeleteButton = document.querySelector(".card__delete-button");
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
const trashButton = cardTemplateClass.querySelector(".trash-button");
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

const popupWithImage = new PopupWithImage("#image-preview-modal");

popupWithImage.setEventListeners();

const api = new Api("https://around-api.en.tripleten-services.com/v1", {
  authorization: "e2ed982e-7073-428a-82c0-3445ee97b908",
  "Content-Type": "application/json",
});

const createCard = (data) => {
  return new Card(data, "#card-template", handleCardClick).getElement();
};

const userInfo = new UserInfo({
  title: ".profile__title",
  description: ".profile__description",
});

const profileModal = new PopupWithForm("#edit-modal", (formData) => {
  const updatedProfileInfo = {
    name: formData.title,
    about: formData.description,
  };

  api
    .editingProfile(updatedProfileInfo)
    .then((updatedProfileInfo) => {
      userInfo.setUserInfo(updatedProfileInfo);
      profileModal.close();
    })
    .catch((err) => console.log(err));
});

api
  .loadUserInfo()
  .then((userData) => {
    userInfo.setUserInfo(userData);
  })
  .catch((err) => {
    console.log("Error fetching user info:", err);
  });

const addCardModal = new PopupWithForm("#add-modal", (formData) => {
  api
    .addingNewCard(formData)
    .then((cardData) => {
      const card = createCard(cardData);
      section.addItem(card);
    })
    .catch((err) => console.log(err));
});

let section;
api
  .getInitialCards()
  .then((data) => {
    section = new Section(
      {
        items: data,
        renderer: (cardData) => {
          const card = createCard(cardData);
          section.addItem(card);
        },
      },
      ".cards__list"
    );
    section.renderItems();
  })
  .catch((err) => console.log(err));

/* -------------------------------------------------------------------------- */
/*                                  Functions                                 */
/* -------------------------------------------------------------------------- */

profileFormValidator.enableValidation();
addCardFormValidator.enableValidation();
addCardModal.setEventListeners();
popupWithImage.setEventListeners();
profileModal.setEventListeners();

function handleCardClick(cardData) {
  popupWithImage.open(cardData);
}

// pass the id to the handler
function handleDeleteClick(cardId) {
  // open that delete modal
  // call setSubmitAction
  cardDeleteModal.setSubmitAction(() => {
    // handle the deletion
  });
}
/* -------------------------------------------------------------------------- */
/*                               Event Listeners                            */
/* -------------------------------------------------------------------------- */

addButton.addEventListener("click", () => {
  addCardFormValidator.disableSubmitButton();
  addCardModal.open();
});

profileEditButton.addEventListener("click", async () => {
  const userData = await api.loadUserInfo();
  profileTitleInput.value = userData.name;
  profileDescriptionInput.value = userData.about;
  profileModal.open();
});
