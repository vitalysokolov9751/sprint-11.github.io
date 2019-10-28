import {userInfoName, api} from './script.js';
import {PopupWithValidation} from './popup-with-validation.js';

export class PopupAdd extends PopupWithValidation {
  constructor(container, button) {
    super(container, button);
    this.submit = this.submit.bind(this);
    this.form.addEventListener('submit', this.submit);
    this.submitButton = this.container.querySelector('.popup__button_add');
  }

  open() {
    super.open();
    this.submitButton.textContent = '+';
    this.form.elements.name.value = '';
    this.form.elements.link.value = '';
    this.allerrors = 'onOpen';
    this.checkSubmit();
    this.allerrors = '';
  }

  submit() {
    event.preventDefault();
    const { name, link } = this.form.elements;
    const { placeCard } = new Card(name.value, link.value, 0, '', userInfoName.textContent);
    cardList.container.appendChild(placeCard);
    this.submitButton.textContent = 'Загрузка...';
    api.saveCard(name.value, link.value, this.container);
  }
}