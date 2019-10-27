import {CardList} from './cards.js';
import {PopupAdd, PopupEdit, PopupAvatar} from './popups.js';
import {Api} from './api.js'; 
export const userInfoName = document.querySelector('.user-info__name');
export const userInfoAbout = document.querySelector('.user-info__about');
const serverUrl = NODE_ENV === 'development' ? 'http://praktikum.tk/cohort3' : 'https://praktikum.tk/cohort3';
const authorizationKey = '23b56799-22ee-419e-83e7-d94b3fd17097';
export const api = new Api({
    baseUrl: serverUrl,
    headers: {
      authorization: authorizationKey,
      'Content-Type': 'application/json'
    }
});
const promise = api.getInitialCards()
    .then((ress) => {
        cardList = new CardList(document.querySelector('.root').querySelector('.places-list'), ress);
    })
    .catch((err) => {
        console.log(err);
    });
const popupAdd = new PopupAdd(document.querySelector('.popup-add'), document.querySelector('.user-info__add-button'));
const popupEdit = new PopupEdit(document.querySelector('.popup-edit'), document.querySelector('.user-info__edit-button'));
const popupAvatar = new PopupAvatar(document.querySelector('.popup-avatar'), document.querySelector('.user-info__photo'));

api.getUserInfo();