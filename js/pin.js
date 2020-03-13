'use strict';

(function () {
  var similarPinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
  var similarListPin = document.querySelector('.map__pins');

  var removeShadow = function () {
    var pins = document.querySelectorAll('.map__pin:not(.map__pin--main)');
    pins.forEach(function (it) {
      it.style.filter = null;
    });
  };

  var createPin = function (data) {
    var pinElement = similarPinTemplate.cloneNode(true);

    pinElement.style.left = (data.location.x - 25) + 'px';
    pinElement.style.top = (data.location.y - 70) + 'px';
    pinElement.querySelector('img').src = data.author.avatar;
    pinElement.querySelector('img').alt = data.offer.title;

    pinElement.addEventListener('click', function () {
      window.card.render(similarListPin, data);
      removeShadow();
      pinElement.style.filter = 'drop-shadow(0 0 5px red)';
    });

    pinElement.addEventListener('keydown', function (evt) {
      if (evt.key === window.utils.ENTER_KEY) {
        window.card.render(similarListPin, data);
        removeShadow();
        pinElement.style.filter = 'drop-shadow(0 0 5px red)';
      }
    });

    return pinElement;
  };

  var renderPins = window.debounce(function (datas) {
    var takeNumber = datas.length > 5 ? 5 : datas.length;
    for (var i = 0; i < takeNumber; i++) {
      similarListPin.appendChild(createPin(datas[i]));
    }
  });

  var removePins = function () {
    var pins = document.querySelectorAll('.map__pin:not(.map__pin--main)');
    pins.forEach(function (it) {
      similarListPin.removeChild(it);
    });
  };

  window.pin = {
    render: renderPins,
    remove: removePins,
    removeShadow: removeShadow
  };
})();
