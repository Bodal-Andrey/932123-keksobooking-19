'use strict';

// Модуль, который управляет карточками объявлений и метками
(function () {
  var COUNTER = 8;
  var datas = window.data.generateData(COUNTER);
  var similarPinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
  var similarListPin = document.querySelector('.map__pins');

  var renderCard = function (container, card) {
    container.appendChild(window.card.createCard(card));
  };

  var createPin = function (data) {
    var pinElement = similarPinTemplate.cloneNode(true);

    pinElement.style.left = (data.location.x - 25) + 'px';
    pinElement.style.top = (data.location.y - 70) + 'px';
    pinElement.querySelector('img').src = data.author.avatar;
    pinElement.querySelector('img').alt = data.offer.title;

    pinElement.addEventListener('click', function () {
      renderCard(similarListPin, data);
    });
    pinElement.addEventListener('keydown', function (evt) {
      if (evt.key === window.utils.ENTER_KEY) {
        renderCard(similarListPin, data);
      }
    });

    return pinElement;
  };

  var showSetupPins = function () {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < datas.length; i++) {
      fragment.appendChild(createPin(datas[i]));
    }
    similarListPin.appendChild(fragment);
  };

  window.map = {
    showSetupPins: showSetupPins
  };
})();