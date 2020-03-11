'use strict';

(function () {
  var addressBar = document.querySelector('#address');
  var mainMark = document.querySelector('.map__pin--main');

  var getAddressValue = function (left, x, top, y) {
    addressBar.value = Math.round(parseInt(left, 10) + x) + ', ' + Math.round(parseInt(top, 10) + y);
  };

  var getAddressBar = function () {
    getAddressValue(mainMark.style.left, 32.5, mainMark.style.top, 78);
  };

  var detectLeftButton = function (evt) {
    evt = evt || window.event;
    if ('buttons' in evt) {
      return evt.buttons === 1;
    }
    var button = evt.which || evt.button;
    return button === 1;
  };

  var onGetSuccess = function (data) {
    window.globalData = data;
    window.pin.render(data);
  };

  mainMark.addEventListener('keydown', function (evt) {
    if (evt.key === window.utils.ENTER_KEY) {
      initializationApp();
    }
  });

  var onPinMouseDown = function () {
    if (detectLeftButton()) {
      initializationApp();
      mainMark.removeEventListener('mousedown', onPinMouseDown);
    }
  };

  var onLoadError = function () {
    window.form.getReport(window.form.error);
    window.form.closeErrorMessage();
  };

  var initializationApp = function () {
    window.form.removeDisabled();
    getAddressBar();
    window.backend.load(onGetSuccess, onLoadError);
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

  getAddressValue(mainMark.style.left, 32.5, mainMark.style.top, 32.5);

  addRenderPins();

  window.map = {
    addressBar: addressBar,
    mainMark: mainMark,
    getAddressValue: getAddressValue,
    addRenderPins: addRenderPins
  };
})();
