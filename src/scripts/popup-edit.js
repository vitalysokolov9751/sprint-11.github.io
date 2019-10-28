import {userInfoName, userInfoAbout, api} from './script.js';
import {PopupWithValidation} from './popup-with-validation.js';

export class PopupEdit extends PopupWithValidation {
    constructor(container, button) {
      super(container, button);
      this.submit = this.submit.bind(this);
      this.form.addEventListener('submit', this.submit);
      this.submitButton = this.container.querySelector('.popup__button_save');
    }
  
    open() {
      super.open();
      this.submitButton.textContent = 'Сохранить';
      this.form.elements.name.value = userInfoName.innerText;
      this.form.elements.about.value = userInfoAbout.innerText;
    }
  
    submit() {
      event.preventDefault();
      userInfoName.textContent = this.form.elements.name.value;
      userInfoAbout.textContent =  this.form.elements.about.value;
      this.submitButton.textContent = 'Загрузка...';
      api.setUserInfo(this.container);
    }
  }
  