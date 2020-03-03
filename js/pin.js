'use strict';

// Модуль, который управляет карточками объявлений и метками
(function () {
  var similarPinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
  var similarListPin = document.querySelector('.map__pins');

  var createPin = function (data) {
    var pinElement = similarPinTemplate.cloneNode(true);

    pinElement.style.left = (data.location.x - 25) + 'px';
    pinElement.style.top = (data.location.y - 70) + 'px';
    pinElement.querySelector('img').src = data.author.avatar;
    pinElement.querySelector('img').alt = data.offer.title;

    pinElement.addEventListener('click', function () {
      window.card.renderCard(similarListPin, data);
    });
    pinElement.addEventListener('keydown', function (evt) {
      if (evt.key === window.utils.ENTER_KEY) {
        window.card.renderCard(similarListPin, data);
      }
    });

    return pinElement;
  };

  var onRenderPins = function (datas) {
    var takeNumber = datas.length > 5 ? 5 : datas.length;
    for (var i = 0; i < takeNumber; i++) {
      similarListPin.appendChild(createPin(datas[i]));
    }
  };

  var onRemovePins = function () {
    var pins = document.querySelectorAll('.map__pin');
    for (var i = 1; i < pins.length; i++) {
      similarListPin.removeChild(pins[i]);
    }
  };

  window.pin = {
    onRenderPins: onRenderPins,
    onRemovePins: onRemovePins
  };
})();
