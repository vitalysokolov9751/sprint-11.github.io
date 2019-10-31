import {PopupAdd} from './popup-add.js';
import {PopupEdit} from './popup-edit.js';
import {PopupAvatar} from './popup-avatar.js';

const popupEdit = new PopupEdit(document.querySelector('.popup-edit'), document.querySelector('.user-info__edit-button'));
const popupAdd = new PopupAdd(document.querySelector('.popup-add'), document.querySelector('.user-info__add-button'));
const popupAvatar = new PopupAvatar(document.querySelector('.popup-avatar'), document.querySelector('.user-info__photo'));