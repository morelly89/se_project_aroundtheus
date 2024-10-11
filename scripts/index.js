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
const cardListEl = document.querySelector(".cards__list");
const addButton = document.querySelector(".profile__add-button");
const addModal = document.querySelector("#add-modal");
const addModalForm = addModal.querySelector("#add-card-form");
const addModalTitle = addModalForm.querySelector("#modal-add-input-title");
const addModalUrl = addModalForm.querySelector("#modal-add-input-url");
const previewModal = document.querySelector("#image-preview-modal");
const previewModalImage = document.querySelector(".modal__image");
const previewModalTitle = document.querySelector(".modal__image-description");
const closeButtons = document.querySelectorAll(".modal__close-button");
const modalImageContainer = document.querySelector(
  ".modal__container--preview"
);
modal = document.querySelectorAll(".modal");
/* -------------------------------------------------------------------------- */
/*                                  Functions                                 */
/* -------------------------------------------------------------------------- */

function closePopup(modal) {
  modal.classList.remove("modal_opened");
}
function openPopup(modal) {
  modal.classList.add("modal_opened");
}

closeButtons.forEach((button) => {
  const popup = button.closest(".modal");
  button.addEventListener("click", () => closePopup(popup));
});

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
  closePopup(editProfileModal);
}

function handleAddSubmit(e) {
  e.preventDefault();
  const form = e.target.closest("#add-card-form");
  const name = addModalTitle.value;
  const link = addModalUrl.value;
  const cardElement = getCardElement({
    name,
    link,
  });
  closePopup(addModal);
  cardListEl.prepend(cardElement);
  form.reset();
}

/* -------------------------------------------------------------------------- */
/*                               Event Listeners                            */
/* -------------------------------------------------------------------------- */

profileEditButton.addEventListener("click", () => {
  profileTitleInput.value = profileTitle.textContent;
  profileDescriptionInput.value = profileDescription.textContent;

  openPopup(editProfileModal);
});

profileForm.addEventListener("submit", handleProfileEditSubmit);
addModalForm.addEventListener("submit", handleAddSubmit);

addButton.addEventListener("click", () => {
  openPopup(addModal);
});

initialCards.forEach((cardData) => {
  const cardElement = getCardElement(cardData);
  cardListEl.append(cardElement);
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    // Find the currently open modal
    const openModal = document.querySelector(".modal_opened");
    if (openModal) {
      closePopup(openModal); // Close the open modal
    }
  }
});

modal.forEach((modalElement) => {
  modalElement.addEventListener("click", (event) => {
    // Check if the click happened outside the modal__container
    if (!event.target.closest(".modal__container")) {
      closePopup(modalElement); // Close the modal
    }
  });
});
