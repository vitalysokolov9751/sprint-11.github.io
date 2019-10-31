import {api} from './api.js';
import {PopupWithValidation} from './popup-with-validation.js';

export class PopupAvatar extends PopupWithValidation {
    constructor(container, button) {
      super(container, button);
      this.submit = this.submit.bind(this);
      this.form.addEventListener('submit', this.submit);
      this.submitButton = this.container.querySelector('.popup__button_save-avatar');
    }
  
    open() {
      super.open();
      this.submitButton.textContent = 'Сохранить';
      this.form.elements.link.value = '';
      this.allerrors = 'onOpen';
      this.checkSubmit();
      this.allerrors = '';
    }
  
    submit() {
      event.preventDefault();
      this.submitButton.textContent = 'Загрузка...';
      api.saveAvatar(this.form.elements.link.value, this.container);
    }
  }