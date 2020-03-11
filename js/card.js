'use strict';

(function () {
  var similarCardTemplate = document.querySelector('#card').content.querySelector('.map__card');

  var renderFeatures = function (container, features) {
    container.innerHTML = '';

    for (var i = 0; i < features.length; i++) {
      var createLi = document.createElement('li');
      createLi.classList.add('popup__feature');
      createLi.classList.add('popup__feature--' + features[i]);
      container.appendChild(createLi);
    }
  };

  var renderPhotos = function (container, node, photos) {
    container.innerHTML = '';

    for (var i = 0; i < photos.length; i++) {
      var img = node.cloneNode();
      img.src = photos[i];
      container.appendChild(img);
    }
  };

  var onCardEscPress = function (evt) {
    if (evt.key === window.utils.ESC_KEY) {
      closeCard();
    }
  };

  var closeCard = function () {
    var card = document.querySelector('.map__card');
    if (card) {
      card.remove();
      document.removeEventListener('keydown', onCardEscPress);
    }
  };

  var createCard = function (data) {
    var cardElement = similarCardTemplate.cloneNode(true);

    cardElement.querySelector('.popup__title').textContent = data.offer.title;
    cardElement.querySelector('.popup__text--address').textContent = data.offer.addres;
    cardElement.querySelector('.popup__text--price').textContent = data.offer.price + ' Р/ночь';
    cardElement.querySelector('.popup__type').textContent = data.offer.type;
    cardElement.querySelector('.popup__text--capacity').textContent = data.offer.rooms + ' комнаты для ' + data.offer.guests + ' гостей';
    cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + data.offer.checkin + ', выезд до ' + data.offer.checkout;
    cardElement.querySelector('.popup__description').textContent = data.offer.description;
    cardElement.querySelector('.popup__avatar').src = data.author.avatar;

    renderFeatures(cardElement.querySelector('.popup__features'), data.offer.features);
    renderPhotos(cardElement.querySelector('.popup__photos'), cardElement.querySelector('.popup__photo'), data.offer.photos);

    document.addEventListener('keydown', function (evt) {
      if (evt.key === window.utils.ESC_KEY) {
        closeCard();
      }
    });

    cardElement.querySelector('.popup__close').addEventListener('click', function () {
      closeCard();
    });
    return cardElement;
  };

  var renderCard = function (container, card) {
    closeCard();
    container.appendChild(createCard(card));
  };


  window.card = {
    render: renderCard,
    close: closeCard
  };
})();
