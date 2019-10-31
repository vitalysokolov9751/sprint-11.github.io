import {userInfoName} from './popup-edit.js';
import {Card} from './card.js';
import {api} from './api.js';
import {PopupPicture} from './popup-picture.js';
const container = document.querySelector('.root').querySelector('.places-list');

export class CardList {
  constructor() {
    this.container = container;
    api.getUserInfo();
    api.getInitialCards()
      .then(cards => {
          this.render(cards)
      })
      .catch((err) => {
          console.log(err);
      });  
  }

  addCard(name, link, isLiked, likeCounter, id, ownerName) {
    const { placeCard } = new Card(name, link, isLiked, likeCounter, id, ownerName);
    this.container.appendChild(placeCard);
    const image = placeCard.querySelector('.place-card__image');
    image.addEventListener('click', (event) => {
      if (!event.target.classList.contains('place-card__delete-icon')) {
        new PopupPicture(document.querySelector('.popup__picture'), image);
      }
    });
  }

  render(cards) {
    cards.forEach(({name, link, likes, _id, owner}) => 
      this.addCard(name, link, likes.find((element) => { 
        return (element.name === userInfoName.textContent) }) === undefined ? false : true,
      likes.length, _id, owner.name));
  }
}