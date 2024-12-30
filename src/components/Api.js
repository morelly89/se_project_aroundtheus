export default class Api {
  constructor(options) {
    // constructor body
  }

  getInitialCards() {
    return fetch("https://around-api.en.tripleten-services.com/cards", {
      headers: {
        authorization: "e2ed982e-7073-428a-82c0-3445ee97b908",
      },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
      })
      .catch((err) => {
        return Promise.reject(`Error: ${res.status}`);
      });
  }
}
