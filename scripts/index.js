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
const editProfileModal = document.querySelector("#edit-modal");
const modalcloseButton = document.querySelector("#modal-close-button");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const profileTitleInput = document.querySelector("#profile-title-input");
const profileDescriptionInput = document.querySelector(
  "#profile-description-input"
);
const cardTemplate =
  document.querySelector("#card-template").content.firstElementChild;
const cardTemplateClass = document.querySelector(".card__template");
const profileForm = document.forms["profile-form"];
const cardListEl = document.querySelector(".cards__list");
const addButton = document.querySelector(".profile__add-button");
const addModal = document.querySelector("#add-modal");
const addModalCloseButton = document.querySelector("#modal-add-close-button");
const addModalForm = addModal.querySelector("#add-card-form");
const addModalTitle = addModalForm.querySelector("#modal-add-input-title");
const addModalUrl = addModalForm.querySelector("#modal-add-input-url");
const previewModal = document.querySelector("#popup-modal");
const previewModalButton = document.querySelector("#popup-modal-button");
const previewModalImage = document.querySelector(".popup__image");
const previewModalTitle = document.querySelector(".popup__title");
/* -------------------------------------------------------------------------- */
/*                                  Functions                                 */
/* -------------------------------------------------------------------------- */

function openPopup(modal) {
  modal.classList.add("modal_opened");
}

function closePopup() {
  editProfileModal.classList.remove("modal_opened");
  addModal.classList.remove("modal_opened");
  previewModal.classList.remove("modal_opened");
}

function getCardElement(cardData) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardImageEl = cardElement.querySelector(".card__image");
  const cardTitleEl = cardElement.querySelector(".card__title");
  const cardLikeButton = cardElement.querySelector(".card__like-button");
  const trashButton = cardElement.querySelector(".trash-button");

  cardLikeButton.addEventListener("click", () => {
    cardLikeButton.classList.toggle("card__like-button_active");
  });

  trashButton.addEventListener("click", () => {
    cardElement.remove();
  });

  previewModalButton.addEventListener("click", () => {
    closePopup(previewModal);
  });

  cardImageEl.addEventListener("click", () => {
    openPopup(previewModal);
    previewModalImage.src = cardData.link;
    previewModalImage.alt = cardData.name;
    previewModalTitle.textContent = cardData.name;
  });

  cardImageEl.src = cardData.link;
  cardImageEl.alt = cardData.name;
  cardTitleEl.textContent = cardData.name;
  return cardElement;
}

/* -------------------------------------------------------------------------- */
/*                                  Handlers                                  */
/* -------------------------------------------------------------------------- */
function handleProfileEditSubmit(e) {
  e.preventDefault();
  profileTitle.textContent = profileTitleInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
  closePopup();
}

function handleAddSubmit(e) {
  e.preventDefault();
  const name = addModalTitle.value;
  const link = addModalUrl.value;
  const cardElement = getCardElement({
    name,
    link,
  });
  closePopup();
  cardListEl.append(cardElement);
}

/* -------------------------------------------------------------------------- */
/*                               Event Listeners                            */
/* -------------------------------------------------------------------------- */

profileEditButton.addEventListener("click", () => {
  profileTitleInput.value = profileTitle.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
  editProfileModal.classList.add("modal_opened");
});

modalcloseButton.addEventListener("click", closePopup);
profileForm.addEventListener("submit", handleProfileEditSubmit);
addModalForm.addEventListener("submit", handleAddSubmit);
addButton.addEventListener("click", () => {
  addModal.classList.add("modal_opened");
});

initialCards.forEach((cardData) => {
  const cardElement = getCardElement(cardData);
  cardListEl.append(cardElement);
});

addModalCloseButton.addEventListener("click", closePopup);