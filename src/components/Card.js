export default class Card {
  constructor(
    { name, link, _id, isLiked },
    cardTemplateSelector,
    handleCardClick,
    handleDeleteClick,
    handleLikeClick
  ) {
    this._name = name;
    this._link = link;
    this._id = _id;
    this._isLiked = isLiked;
    this._handleCardClick = handleCardClick;
    this._handleDeleteClick = handleDeleteClick;
    this._handleLikeClick = handleLikeClick;
    this.cardTemplate =
      document.querySelector(cardTemplateSelector).content.firstElementChild;
    this._modal = document.querySelector("#card-delete-modal");
    this._cardDeleteButton = this._modal.querySelector("#delete-card-btn");
    // this._likeButton = likeButton;
  }

  open() {
    this._modal.classList.add("modal_opened");
    document.addEventListener("keydown", this._handleEscClose);
  }

  close() {
    this._modal.classList.remove("modal_opened");
    document.removeEventListener("keydown", this._handleEscClose);
  }

  removeCard() {
    this._cardElement.remove();
    this._CardElement = null;
  }

  getElement() {
    this._cardElement = this.cardTemplate.cloneNode(true);
    const cardImageEl = this._cardElement.querySelector(".card__image");
    const cardTitleEl = this._cardElement.querySelector(".card__title");
    this._deleteBtn = this._cardElement.querySelector(".card__delete-button");

    cardImageEl.src = this._link;
    cardImageEl.alt = this._name;
    cardTitleEl.textContent = this._name;

    if (this._isLiked) {
      this._cardElement
        .querySelector(".card__like-button")
        .classList.add("card__like-button_active");
    }

    this._setEventListeners();
    return this._cardElement;
  }

  _setEventListeners() {
    const cardLikeButton =
      this._cardElement.querySelector(".card__like-button");
    const trashButton = this._cardElement.querySelector(".trash-button");

    trashButton.addEventListener("click", () => {
      this._handleDeleteClick(this); // Pass the card's ID to the delete handler
    });

    const modalCloseButton = document.querySelector("#card-delete-close-btn");

    cardLikeButton.addEventListener("click", () => {
      cardLikeButton.classList.toggle("card__like-button_active");
      this._handleLikeClick(this);
    });

    modalCloseButton.addEventListener("click", () => {
      this.close();
    });

    this._handleImageClick();
  }

  _handleImageClick() {
    const cardImageEl = this._cardElement.querySelector(".card__image");

    cardImageEl.addEventListener("click", () => {
      this._handleCardClick({ name: this._name, link: this._link });
    });
  }
}
