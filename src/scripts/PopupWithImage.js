import Popup from "./Popup.js";
class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._image = this._popupElement.querySelector(".modal__image");
    this._caption = this._popupElement.querySelector(
      ".modal__image-description"
    );
  }

  open(data) {
    this._image.src = data.link;
    this._image.alt = data.name;
    this._caption.textContent = data.name;
    super.open();
  }
}
export default PopupWithImage;
