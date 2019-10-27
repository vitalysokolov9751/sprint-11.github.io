  class Card {
    constructor(name, link, isLiked, likeCounter, id, ownerName) {
      this.name = name;
      this.link = link;
      this.isLiked = isLiked;
      this.likeCounter = likeCounter;
      this.id = id;
      this.ownerName = ownerName;
      this.placeCard = this.create();
      this.placeCard.querySelector('.place-card__like-icon').addEventListener('click', this.like);
      if (this.ownerName === userInfoName.textContent) {
        this.placeCard.querySelector('.place-card__delete-icon').addEventListener('click', this.remove);
      }
    }
  
    create() {
      const placeCard = document.createElement('div');
      placeCard.classList.add('place-card');
      placeCard.id = this.id; 
  
      const placeCardImage = document.createElement('div');
      placeCardImage.classList.add('place-card__image');
      placeCardImage.style.backgroundImage = `url(${this.link})`;
      placeCardImage.backgroundSize = 'cover';
      
      const placeCardDescription = document.createElement('div');
      placeCardDescription.classList.add('place-card__description');
  
      const placeCardName = document.createElement('h3');
      placeCardName.classList.add('place-card__name');
      placeCardName.textContent = this.name;
      
      const placeCardLike = document.createElement('div');
      placeCardLike.classList.add('place-card__like');
      
      const placeCardLikeIcon = document.createElement('button');
      placeCardLikeIcon.classList.add('place-card__like-icon');
      if (this.isLiked) {
        placeCardLikeIcon.classList.add('place-card__like-icon_liked');
      }

      const placeCardLikeCounter = document.createElement('h4');
      placeCardLikeCounter.classList.add('place-card__like-counter');
      placeCardLikeCounter.textContent = this.likeCounter;

      if (this.ownerName === userInfoName.textContent) {
        const placeCardDeleteIcon = document.createElement('button');
        placeCardDeleteIcon.classList.add('place-card__delete-icon');
        placeCardImage.appendChild(placeCardDeleteIcon);
      }
      
      placeCardLike.appendChild(placeCardLikeIcon);
      placeCardLike.appendChild(placeCardLikeCounter);
      placeCardDescription.appendChild(placeCardName);
      placeCardDescription.appendChild(placeCardLike);
      placeCard.appendChild(placeCardImage);
      placeCard.appendChild(placeCardDescription);
      return placeCard;
    }
  
    like(event) {
      if (event.target.classList.contains('place-card__like-icon')) {
        const container = event.target.closest(".place-card");
        const counter = container.querySelector('.place-card__like-counter');
        if (event.target.classList.contains('place-card__like-icon_liked')) {
          api.removeLike(container.id);
          counter.textContent = "" + (Number(counter.textContent) - 1);
        }
        else {
          api.addLike(container.id);
          counter.textContent = "" + (Number(counter.textContent) + 1);
        }
        event.target.classList.toggle('place-card__like-icon_liked');
      }
    }
  
    remove(event) {
      if (event.target.classList.contains('place-card__delete-icon')) {
        if (window.confirm("Вы действительно хотите удалить эту карточку?")) {
          api.deleteCard(event.target.closest(".place-card").id); 
          cardList.container.removeChild(event.target.closest(".place-card"));
        }
      }
    }
  }
  
  class CardList {
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