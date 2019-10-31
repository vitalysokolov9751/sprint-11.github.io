import {userInfoName, userInfoAbout} from './popup-edit';
import {CardList} from './card-list.js';
const serverUrl = NODE_ENV === 'development' ? 'http://praktikum.tk/cohort3' : 'https://praktikum.tk/cohort3';
const authorizationKey = '23b56799-22ee-419e-83e7-d94b3fd17097';

class Api {
    constructor() {
        this.options = {
            baseUrl: serverUrl,
            headers: {
              authorization: authorizationKey,
              'Content-Type': 'application/json'
            }
        }
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
        return fetch(`${this.options.baseUrl}/cards`, {
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
        .then(res => {
            if (res.ok) {
                return res.json();
            }
            else {
                return Promise.reject(`Ошибка: ${res.status}`);
            }
        })
        .finally(() => {
            container.classList.remove('popup_is-opened');
        })
    }

    deleteCard(container) {
        fetch(`${this.options.baseUrl}/cards/${container.id}`, {
            method: 'DELETE',
            headers: {
                authorization: this.options.headers.authorization,
                'Content-Type': 'application/json'
            }
        })        
        .then((res) => {
            if (res.ok) {
                cardList.container.removeChild(container);
            }
            else {
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

export const api = new Api();
export const cardList = new CardList();