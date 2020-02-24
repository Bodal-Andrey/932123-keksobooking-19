'use strict';

(function () {
  var mainMark = document.querySelector('.map__pin--main');
  var addressBar = document.querySelector('#address');

  var getCalcCoords = function (evt) {

    var shift = {
      x: window.startCoords.x - evt.clientX,
      y: window.startCoords.y - evt.clientY
    };

    window.startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var limitY = mainMark.offsetTop - shift.y;
    var limitX = mainMark.offsetLeft - shift.x;

    if (limitY <= 52) {
      mainMark.style.top = '52px';
    } else if (limitY >= 552) {
      mainMark.style.top = '552px';
    } else {
      mainMark.style.top = limitY + 'px';
    }

    if (limitX <= -33) {
      mainMark.style.left = '-33px';
    } else if (limitX >= 1167) {
      mainMark.style.left = '1167px';
    } else {
      mainMark.style.left = limitX + 'px';
    }
    addressBar.placeholder = Math.round(parseInt(mainMark.style.left, 10) + 32.5) + ', ' + Math.round(parseInt(mainMark.style.top, 10) + 78);
  };

  window.calc = {
    getCalcCoords: getCalcCoords,
  };
})();
