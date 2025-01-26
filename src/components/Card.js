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
  }

  // Remove the card element
  removeCard() {
    this._cardElement.remove();
    this._cardElement = null;
  }

  // Get the card element
  getElement() {
    this._cardElement = this.cardTemplate.cloneNode(true);
    const cardImageEl = this._cardElement.querySelector(".card__image");
    const cardTitleEl = this._cardElement.querySelector(".card__title");
    this._likeButton = this._cardElement.querySelector(".card__like-button");
    this._deleteBtn = this._cardElement.querySelector(".card__delete-button");

    cardImageEl.src = this._link;
    cardImageEl.alt = this._name;
    cardTitleEl.textContent = this._name;

    // If the card is liked, make the like button active
    if (this._isLiked) {
      this._likeButton.classList.add("card__like-button_active");
    }

    this._setEventListeners(); // Set event listeners
    return this._cardElement;
  }

  // Set event listeners for the card
  _setEventListeners() {
    const trashButton = this._cardElement.querySelector(".trash-button");

    trashButton.addEventListener("click", () => {
      this._handleDeleteClick(this); // Pass the card instance to the delete handler
    });

    this._likeButton.addEventListener("click", () => {
      // this._likeButton.classList.toggle("card__like-button_active");
      this._handleLikeClick(this); // Pass the card instance to the like handler
    });

    this._handleImageClick(); // Handle image click
  }

  // Handle image click to open full-size image
  _handleImageClick() {
    const cardImageEl = this._cardElement.querySelector(".card__image");
    cardImageEl.addEventListener("click", () => {
      this._handleCardClick({ name: this._name, link: this._link });
    });
  }

  toggleLikeButton() {
    this._likeButton.classList.toggle("card__like-button_active");
  }
}
