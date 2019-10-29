import {userInfoName} from './popup-edit.js';
import {Card} from './card.js';
import {PopupPicture} from './popup-picture.js';
  
export class CardList {
  constructor(container, initialCards) {
    this.container = container;
    this.initialCards = initialCards;
    this.render();
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

  render() {
    this.initialCards.forEach(({name, link, likes, _id, owner}) => 
      this.addCard(name, link, likes.find((element) => { 
        return (element.name === userInfoName.textContent) }) === undefined ? false : true,
      likes.length, _id, owner.name));
  }
}