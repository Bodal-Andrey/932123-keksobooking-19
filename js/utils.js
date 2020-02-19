'use strict';

(function () {
  var ENTER_KEY = 'Enter';
  var ESC_KEY = 'Escape';
  var addressBar = document.querySelector('#address');
  var mainMark = document.querySelector('.map__pin--main');

  window.utils = {
    ENTER_KEY: ENTER_KEY,
    ESC_KEY: ESC_KEY,
    addressBar: addressBar,
    mainMark: mainMark
  };
})();
