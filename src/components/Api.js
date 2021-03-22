export default class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = { headers };
  }

  _resultCheck(res) {
    if (res.ok) {
      return res.json();
    }
    // если ошибка, отклоняем промис
    return Promise.reject(`Ошибка: ${res.status}`);
  }


  getInitialCards() {
    return fetch(this._baseUrl + '/cards', this._headers)
      .then(this._resultCheck);
  }

  getUserInfo() {
    return fetch(this._baseUrl + '/users/me', this._headers)
      .then(this._resultCheck);
  }

  pullUserInfo({ name, about }) {
    return fetch(this._baseUrl + '/users/me', {
      method: 'PATCH',
      headers: {
        authorization: '5f90b346-f8ab-40ea-a16b-fbb4288c433c',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name,
        about
      })
    })
      .then(this._resultCheck);
  }

  pullNewCard({ name, link }) {
    return fetch(this._baseUrl + '/cards', {
      method: 'POST',
      headers: {
        authorization: '5f90b346-f8ab-40ea-a16b-fbb4288c433c',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name,
        link
      })
    })
      .then(this._resultCheck);
  }

  pullNewAvatar(linkAvatar) {
    return fetch(this._baseUrl + '/users/me/avatar', {
      method: 'PATCH',
      headers: {
        authorization: '5f90b346-f8ab-40ea-a16b-fbb4288c433c',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(
        linkAvatar
      )
    })
      .then(this._resultCheck);
  }

  deleteCard(id) {
    return fetch(this._baseUrl + '/cards/' + id, {
      method: 'DELETE',
      headers: {
        authorization: '5f90b346-f8ab-40ea-a16b-fbb4288c433c',
        'Content-Type': 'application/json'
      },
    })
      .then(this._resultCheck);
  }

  deleteLikeCard(id) {
    return fetch(this._baseUrl + '/cards/likes/' + id, {
      method: 'DELETE',
      headers: {
        authorization: '5f90b346-f8ab-40ea-a16b-fbb4288c433c',
        'Content-Type': 'application/json'
      },
    })
      .then(this._resultCheck);
  }

  likeCard(id) {
    return fetch(this._baseUrl + '/cards/likes/' + id, {
      method: 'PUT',
      headers: {
        authorization: '5f90b346-f8ab-40ea-a16b-fbb4288c433c',
        'Content-Type': 'application/json'
      },
    })
      .then(this._resultCheck);
  }

}

