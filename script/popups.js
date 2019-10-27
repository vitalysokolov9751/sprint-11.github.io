class Popup {
  constructor(container, button) {
    this.container = container;
    this.button = button;
    this.open = this.open.bind(this);
    this.close = this.close.bind(this);
    this.container.querySelector('.popup__close').addEventListener('click', this.close);
    this.button.addEventListener('click', this.open);
  }

  open() {
    this.container.classList.add('popup_is-opened');
  }

  close() {
    this.container.classList.remove('popup_is-opened');
  }
}

class PopupPicture extends Popup {
  constructor(container, button) {
    super(container, button);
    container.querySelector('.popup__content_picture').style.backgroundImage = button.style.backgroundImage;
    this.open();
  }
}

class PopupWithValidation extends Popup {
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

class PopupAdd extends PopupWithValidation {
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

class PopupEdit extends PopupWithValidation {
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

class PopupAvatar extends PopupWithValidation {
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