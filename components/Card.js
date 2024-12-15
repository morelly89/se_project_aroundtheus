class Card {
  constructor({ name, link }, cardTemplateSelector, handleCardClick) {
    this._name = name;
    this._link = link;
    this._handleCardClick = handleCardClick;
    this.cardTemplate =
      document.querySelector(cardTemplateSelector).content.firstElementChild;
  }

  getElement() {
    this._cardElement = this.cardTemplate.cloneNode(true);
    const cardImageEl = this._cardElement.querySelector(".card__image");
    const cardTitleEl = this._cardElement.querySelector(".card__title");

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

    trashButton.addEventListener("click", () => {
      this._cardElement.remove();
    });

    cardLikeButton.addEventListener("click", () => {
      cardLikeButton.classList.toggle("card__like-button_active");
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
export default Card;
