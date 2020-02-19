'use strict';

(function () {
  var getCalcCoords = function (evt) {

    var shift = {
      x: window.startCoords.x - evt.clientX,
      y: window.startCoords.y - evt.clientY
    };

    window.startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var limitY = window.utils.mainMark.offsetTop - shift.y;
    var limitX = window.utils.mainMark.offsetLeft - shift.x;

    if (limitY <= 52) {
      window.utils.mainMark.style.top = '52px';
    } else if (limitY >= 552) {
      window.utils.mainMark.style.top = '552px';
    } else {
      window.utils.mainMark.style.top = limitY + 'px';
    }

    if (limitX <= -33) {
      window.utils.mainMark.style.left = '-33px';
    } else if (limitX >= 1167) {
      window.utils.mainMark.style.left = '1167px';
    } else {
      window.utils.mainMark.style.left = limitX + 'px';
    }
    window.utils.addressBar.placeholder = Math.round(parseInt(window.utils.mainMark.style.left, 10) + 32.5) + ', ' + Math.round(parseInt(window.utils.mainMark.style.top, 10) + 78);
  };

  window.calc = {
    getCalcCoords: getCalcCoords,
  };
})();
