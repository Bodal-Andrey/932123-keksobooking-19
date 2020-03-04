'use strict';

(function () {
  var housingTypeElement = document.querySelector('#housing-type');

  var getHousingTypeValue = function (el) {
    return housingTypeElement.value === 'any' ? true : el.offer.type === housingTypeElement.value;
  };

  var getAllFilter = function (data) {
    return data.filter(function (el) {
      return getHousingTypeValue(el);
    });
  };

  housingTypeElement.addEventListener('change', function () {
    window.card.closeCard();
    window.pin.removePins();
    window.pin.renderPins(getAllFilter(window.globalData));
  });
})();
