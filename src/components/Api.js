export default class Api {
  constructor(baseUrl, headers) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  loadUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "GET",
      headers: this._headers,
    }).then((res) => this._responseOk(res));
  }

  editingProfile(profileInfo) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify(profileInfo),
    }).then((res) => this._responseOk(res));
  }

  addingNewCard({ name, link }) {
    const cardData = {
      name: name,
      link: link,
    };
    return fetch(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify(cardData),
    }).then((res) => this._responseOk(res));
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: this._headers,
    }).then((res) => this._responseOk(res));
  }

  deleteCard(_id) {
    return fetch(`${this._baseUrl}/cards/${_id}`, {
      method: "DELETE",
      headers: this._headers,
    }).then((res) => this._responseOk(res));
  }

  addRemoveLikes(_id, isLiked) {
    return fetch(`${this._baseUrl}/cards/${_id}/likes`, {
      method: isLiked ? "PUT" : "DELETE", // If liked, PUT, otherwise DELETE
      headers: this._headers,
    }).then((res) => this._responseOk(res));
  }

  updatingProfilePic(avatar) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar: avatar, // Directly send the avatar URL
      }),
    }).then((res) => this._responseOk(res));
  }

  _responseOk(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Error: ${res.statusText}`);
  }
}
