class Card {
  constructor(
    { name, link },
    cardTemplateSelector,
    handleCardClick,
    handleDeleteCard
  ) {
    this._name = name;
    this._link = link;
    this._handleCardClick = handleCardClick;
    this._handleDeleteCard = handleDeleteCard;
    this.cardTemplate =
      document.querySelector(cardTemplateSelector).content.firstElementChild;
    this._modal = document.querySelector("#card-delete-modal");
    // this._cardId = data._id;
  }
  open() {
    this._modal.classList.add("modal_opened");
    document.addEventListener("keydown", this._handleEscClose);
  }
  close() {
    this._modal.classList.remove("modal_opened");
    document.removeEventListener("keydown", this._handleEscClose);
  }

  getElement() {
    this._cardElement = this.cardTemplate.cloneNode(true);
    const cardImageEl = this._cardElement.querySelector(".card__image");
    const cardTitleEl = this._cardElement.querySelector(".card__title");
    this._deleteBtn = this._cardElement.querySelector(".card__delete-button");

    cardImageEl.src = this._link;
    cardImageEl.alt = this._name;
    cardTitleEl.textContent = this._name;

    this._setEventListeners();
    return this._cardElement;
  }

  _setEventListeners() {
    const cardLikeButton =
      this._cardElement.querySelector(".card__like-button");
    const trashButton = this._cardElement.querySelector(".trash-button");

    const closeButton = document.querySelector("#card-delete-close-btn");

    cardLikeButton.addEventListener("click", () => {
      cardLikeButton.classList.toggle("card__like-button_active");
    });

    trashButton.addEventListener("click", (event) => {
      if (event.target === trashButton) {
        this.open();
      }
    });

    closeButton.addEventListener("click", (event) => {
      if (event.target === closeButton) {
        this.close();
      }
    });

    this._handleImageClick();
  }

  _handleImageClick() {
    const cardImageEl = this._cardElement.querySelector(".card__image");

    cardImageEl.addEventListener("click", () => {
      this._handleCardClick({ name: this._name, link: this._link });
    });
  }

  _handleDeleteCard(cardId) {
    const modalDeleteButton = this._modal.querySelector("card__delete-button");
    modalDeleteButton.addEventListener("click", () => {
      this.handleDeleteCard(cardId);
    });
  }
}
export default Card;
