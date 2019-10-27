const userInfoName = document.querySelector('.user-info__name');
const userInfoAbout = document.querySelector('.user-info__about');
const api = new Api({
    baseUrl: 'http://praktikum.tk/cohort3',
    headers: {
      authorization: '23b56799-22ee-419e-83e7-d94b3fd17097',
      'Content-Type': 'application/json'
    }
});
let ress = '';
let cardList = [];
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