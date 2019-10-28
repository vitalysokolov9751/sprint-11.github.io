import {Popup} from './popup.js';

export class PopupWithValidation extends Popup {
  constructor(container, button) {
    super(container, button);
    this.form = this.container.querySelector('form');
    this.submitButton = this.container.querySelector('.popup__button');
    this.inputs = this.container.querySelectorAll('.popup__input');
    this.errors = this.container.querySelectorAll('.error');
    this.allerrors = '';
    this.addValidation();
    this.checkSubmit();
  }

  addValidation() {
    this.form.addEventListener('input', event => {
      function validURL(str) {
        const pattern = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;
        return pattern.test(str);
      }
      this.allerrors = '';
      for (let i = 0; i < this.inputs.length; i++) {
        const type = String(this.inputs[i]).indexOf('url') > 0 ? 'url' : 'text';
        if (this.inputs[i].validity.valueMissing) {
          this.errors[i].textContent = 'Это обязательное поле';
        }
        else if (type === 'text' && (this.inputs[i].validity.tooShort || this.inputs[i].validity.tooLong)) {
          this.errors[i].textContent = 'Должно быть от 2 до 30 символов';
        }
        else if (type === 'url' && !validURL(this.inputs[i].value)) {
          this.errors[i].textContent = 'Здесь должна быть ссылка';
        }
        else {
          this.errors[i].textContent = "";
        }
        this.allerrors += this.errors[i].textContent;
      }
      this.checkSubmit();
    })
  }

  checkSubmit() {
    if (this.allerrors === "") {
      this.submitButton.removeAttribute('disabled');
      this.submitButton.classList.add('popup__button_enabled');
      this.submitButton.classList.remove('popup__button_disabled');
    }
    else {
      this.submitButton.setAttribute('disabled', true);
      this.submitButton.classList.remove('popup__button_enabled');
      this.submitButton.classList.add('popup__button_disabled');
    }
  }
}
