export default class Api {
  constructor(baseUrl, headers) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  loadUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "GET",
      headers: this._headers,
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject("Failed to fetch initial card").catch((err) => {
        return Promise.reject(`Error ${err}`);
      });
    });
  }

  editingProfile(profileInfo) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify(profileInfo),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject("Failed to fetch edit profile");
      })
      .catch((err) => {
        return Promise.reject(`Error: ${err}`);
      });
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
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject("Failed to add new card");
      })
      .catch((err) => {
        console.log(err);
        return Promise.reject(`Error: ${err}`);
      });
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: this._headers,
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject("Failed to fetch initial cards");
      })
      .catch((err) => {
        return Promise.reject(`Error: ${err}`);
      });
  }

  deleteCard(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
      method: "DELETE",
      headers: this._headers,
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject("Failed to delete card");
      })
      .catch((err) => {
        return Promise.reject(`Error: ${err}`);
      });
  }
}
