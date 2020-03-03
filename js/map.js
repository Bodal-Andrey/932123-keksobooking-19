'use strict';

// Модуль, который отвечает за создание метки на карте
(function () {
  var addressBar = document.querySelector('#address');
  var mainMark = document.querySelector('.map__pin--main');
  var labelCenterTop = document.querySelector('.map__pin--main').style.top;
  var labelCenterLeft = document.querySelector('.map__pin--main').style.left;
  var pins = [];

  var getAddressValue = function (left, x, top, y) {
    addressBar.value = Math.round(parseInt(left, 10) + x) + ', ' + Math.round(parseInt(top, 10) + y);
  };

  var getAddressBar = function () {
    getAddressValue(labelCenterLeft, 32.5, labelCenterTop, 78);
  };

  var detectLeftButton = function (evt) {
    evt = evt || window.event;
    if ('buttons' in evt) {
      return evt.buttons === 1;
    }
    var button = evt.which || evt.button;
    return button === 1;
  };

  var updatePins = function () {
    window.pin.onRenderPins(pins.filter());
  };

  var onGetSuccess = function (data) {
    pins = data;
    // window.load(window.pin.onRenderPins);
    updatePins();
  };

  mainMark.addEventListener('keydown', function (evt) {
    if (evt.key === window.utils.ENTER_KEY) {
      window.form.removeDisabled();
      // window.load(window.pin.onRenderPins);
      window.load(onGetSuccess);
      getAddressBar();
    }
  });

  var onPinMouseDown = function () {
    if (detectLeftButton()) {
      initializationApp();
      mainMark.removeEventListener('mousedown', onPinMouseDown);
    }
  };

  var initializationApp = function () {
    window.form.removeDisabled();
    onGetSuccess();
    getAddressBar();
    // window.load(window.pin.onRenderPins);
  };

  var addRenderPins = function () {
    mainMark.addEventListener('mousedown', onPinMouseDown);
  };

  mainMark.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    window.startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    document.addEventListener('mousemove', window.dragndrop.onMouseMove);
    document.addEventListener('mouseup', window.dragndrop.onMouseUp);
  });

  getAddressValue(labelCenterLeft, 32.5, labelCenterTop, 32.5);

  addRenderPins();

  window.map = {
    addressBar: addressBar,
    mainMark: mainMark,
    getAddressValue: getAddressValue,
    addRenderPins: addRenderPins
  };
})();
