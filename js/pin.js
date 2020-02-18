'use strict';

// Модуль, который отвечает за создание метки на карте
(function () {
  var labelCenterTop = document.querySelector('.map__pin--main').style.top;
  var labelCenterLeft = document.querySelector('.map__pin--main').style.left;
  var addressBar = document.querySelector('#address');
  var mainMark = document.querySelector('.map__pin--main');

  addressBar.placeholder = Math.round(parseInt(labelCenterLeft, 10) + 32.5) + ', ' + Math.round(parseInt(labelCenterTop, 10) + 32.5);

  var getAddressBar = function () {
    var spikeLabelTop = Math.round(parseInt(labelCenterTop, 10) + 78);
    var spikeLabelLeft = Math.round(parseInt(labelCenterLeft, 10) + 32.5);

    addressBar.placeholder = spikeLabelLeft + ', ' + spikeLabelTop;
  };

  var detectLeftButton = function (evt) {
    evt = evt || window.event;
    if ('buttons' in evt) {
      return evt.buttons === 1;
    }
    var button = evt.which || evt.button;
    return button === 1;
  };

  mainMark.addEventListener('mousedown', function () {
    if (detectLeftButton()) {
      window.form.removeDisabled();
      window.map.showSetupPins();
      getAddressBar();
    }
  });

  mainMark.addEventListener('keydown', function (evt) {
    if (evt.key === window.utils.ENTER_KEY) {
      window.form.removeDisabled();
      window.map.showSetupPins();
      getAddressBar();
    }
  });
})();
