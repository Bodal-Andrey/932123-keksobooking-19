'use strict';

(function () {
  var TOP_MOST = '52px';
  var BOTTOM_MOST = '552px';
  var LEFT_MOST = '-33px';
  var RIGHT_MOST = '1167px';

  var getCalcCoords = function (evt) {

    var Coordinate = function (x, y) {
      this.x = x;
      this.y = y;
    };

    var shift = new Coordinate(window.startCoords.x - evt.clientX, window.startCoords.y - evt.clientY);

    window.startCoords = new Coordinate(evt.clientX, evt.clientY);

    var limitY = window.map.mainMark.offsetTop - shift.y;
    var limitX = window.map.mainMark.offsetLeft - shift.x;

    if (limitY <= 52) {
      window.map.mainMark.style.top = TOP_MOST;
    } else if (limitY >= 552) {
      window.map.mainMark.style.top = BOTTOM_MOST;
    } else {
      window.map.mainMark.style.top = limitY + 'px';
    }

    if (limitX <= -33) {
      window.map.mainMark.style.left = LEFT_MOST;
    } else if (limitX >= 1167) {
      window.map.mainMark.style.left = RIGHT_MOST;
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
