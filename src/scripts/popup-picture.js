import {Popup} from './popup.js';

export class PopupPicture extends Popup {
    constructor(container, button) {
        super(container, button);
        container.querySelector('.popup__content_picture').style.backgroundImage = button.style.backgroundImage;
        this.open();
    }
}