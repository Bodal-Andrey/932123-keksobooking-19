'use strict';

(function () {
  var TOPMOST = '52px';
  var BOTTOMMOST = '552PX';
  var LEFTMOST = '-33px';
  var RIGHTMOST = '1167px';

  var getCalcCoords = function (evt) {

    var shift = {
      x: window.startCoords.x - evt.clientX,
      y: window.startCoords.y - evt.clientY
    };

    window.startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var limitY = window.map.mainMark.offsetTop - shift.y;
    var limitX = window.map.mainMark.offsetLeft - shift.x;

    if (limitY <= 52) {
      window.map.mainMark.style.top = TOPMOST;
    } else if (limitY >= 552) {
      window.map.mainMark.style.top = BOTTOMMOST;
    } else {
      window.map.mainMark.style.top = limitY + 'px';
    }

    if (limitX <= -33) {
      window.map.mainMark.style.left = LEFTMOST;
    } else if (limitX >= 1167) {
      window.map.mainMark.style.left = RIGHTMOST;
    } else {
      window.map.mainMark.style.left = limitX + 'px';
    }
    window.map.getAddressValue(window.map.mainMark.style.left, 32.5, window.map.mainMark.style.top, 78);
  };

  var onMouseMove = function (moveEvt) {
    moveEvt.preventDefault();
    getCalcCoords(moveEvt);
  };

  var onMouseUp = function (upEvt) {
    upEvt.preventDefault();
    getCalcCoords(upEvt);
    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
  };

  window.dragndrop = {
    onMouseMove: onMouseMove,
    onMouseUp: onMouseUp
  };
})();
