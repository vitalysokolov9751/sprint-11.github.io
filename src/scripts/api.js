import {userInfoName, userInfoAbout} from './popup-edit';

export class Api {
    constructor(options) {
        this.options = options;
    }
  
    getUserInfo() {
        fetch(`${this.options.baseUrl}/users/me`, {
            headers: {
                authorization: this.options.headers.authorization,
                'Content-Type': 'application/json'
            }
        })
            .then(res => {
               if (res.ok) {
                 return res.json();
               }
               return Promise.reject(`Ошибка: ${res.status}`);
            })
            .then((res) => {
                document.querySelector('.user-info__photo').style.backgroundImage = `url(${res.avatar})`;
                userInfoName.textContent = res.name;
                userInfoAbout.textContent = res.about;
            })
            .catch((err) => {
                console.log(err);
            });
    }

    setUserInfo(container) {
        fetch(`${this.options.baseUrl}/users/me`, {
            method: 'PATCH',
            headers: {
                authorization: this.options.headers.authorization,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: userInfoName.textContent,
                about: userInfoAbout.textContent
            })
        })        
            .then((res) => {
                if (res.ok) {
                    return res.json();
                  }
                  return Promise.reject(`Ошибка: ${res.status}`);
               })
            .catch((err) => {
                console.log(err);
            })
            .finally(() => {
                container.classList.remove('popup_is-opened');
            });
    }

    getInitialCards() {
        return fetch(`${this.options.baseUrl}/cards`, {
            headers: {
                authorization: this.options.headers.authorization,
                'Content-Type': 'application/json'
            }
        })
        .then(ress => {
            if (ress.ok) {
              return ress.json();
            }
            return Promise.reject(`Ошибка: ${ress.status}`);
        })
    }
    
    saveCard(name, link, container) {
        fetch(`${this.options.baseUrl}/cards`, {
            method: 'POST',
            headers: {
                authorization: this.options.headers.authorization,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: name,
                link: link
            })
        })        
            .then((res) => {
                if (res.ok) {
                    return res.json();
                  }
                  return Promise.reject(`Ошибка: ${res.status}`);
               })
            .catch((err) => {
                console.log(err);
            })
            .finally(() => {
                container.classList.remove('popup_is-opened');
            });
    }

    deleteCard(id) {
        fetch(`${this.options.baseUrl}/cards/${id}`, {
            method: 'DELETE',
            headers: {
                authorization: this.options.headers.authorization,
                'Content-Type': 'application/json'
            }
        })        
            .then((res) => {
                if (!res.ok) {
                    return Promise.reject(`Ошибка: ${res.status}`);
                  }
               })
            .catch((err) => {
                console.log(err);
            })
    }

    addLike(id) {
        fetch(`${this.options.baseUrl}/cards/like/${id}`, {
                method: 'PUT',
                headers: {
                    authorization: this.options.headers.authorization,
                    'Content-Type': 'application/json'
                }
            })        
            .then((res) => {
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject(`Ошибка: ${res.status}`);
            })
            .catch((err) => {
                console.log(err);
            })
    }

    removeLike(id) {
        fetch(`${this.options.baseUrl}/cards/like/${id}`, {
                method: 'DELETE',
                headers: {
                    authorization: this.options.headers.authorization,
                    'Content-Type': 'application/json'
                }
            })        
            .then((res) => {
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject(`Ошибка: ${res.status}`);
            })
            .catch((err) => {
                console.log(err);
            })
    }

    saveAvatar(avatar, container) {
        fetch(`${this.options.baseUrl}/users/me/avatar`, {
            method: 'PATCH',
                headers: {
                    authorization: this.options.headers.authorization,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    avatar: avatar
                })
            })
            .then(res => {
               if (res.ok) {
                 return res.json();
               }
               return Promise.reject(`Ошибка: ${res.status}`);
            })
            .then((res) => {
                document.querySelector('.user-info__photo').style.backgroundImage = `url(${avatar})`;
            })
            .catch((err) => {
                console.log(err);
            })
            .finally(() => {
                container.classList.remove('popup_is-opened');
            });
    }
}
