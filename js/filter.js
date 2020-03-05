'use strict';

(function () {
  var allFiltersElement = document.querySelector('.map__filters');
  var housingTypeElement = document.querySelector('#housing-type');
  var housingPriceElement = document.querySelector('#housing-price');
  var housingRoomsElement = document.querySelector('#housing-rooms');
  var housingGuestsElement = document.querySelector('#housing-guests');
  var housingFeatures = document.querySelectorAll('.map__checkbox');
  var checkboxesChecked = [];

  var getHousingTypeValue = function (el) {
    return housingTypeElement.value === 'any' ? true : el.offer.type === housingTypeElement.value;
  };

  var getHousingRoomsValue = function (el) {
    return housingRoomsElement.value === 'any' ? true : el.offer.rooms === parseInt(housingRoomsElement.value, 10);
  };

  var getHousingGuestsValue = function (el) {
    return housingGuestsElement.value === 'any' ? true : el.offer.rooms === parseInt(housingGuestsElement.value, 10);
  };

  var getHousingPriceValue = function (el) {
    var offerPrice = el.offer.price;
    if (housingPriceElement.value === 'low') {
      return offerPrice < 10000;
    } else if (housingPriceElement.value === 'high') {
      return offerPrice > 50000;
    } else if (housingPriceElement.value === 'middle') {
      return offerPrice >= 10000 && offerPrice <= 50000;
    } else if (housingPriceElement.value === 'any') {
      return true;
    }
    return offerPrice;
  };

  var getCheckedCheckBoxes = function () {
    for (var i = 0; i < housingFeatures.length; i++) {
      if (housingFeatures[i].checked) {
        checkboxesChecked.push(housingFeatures[i].value);
      }
    }
    return checkboxesChecked;
  };

  getCheckedCheckBoxes();

  var getContains = function (el) {
    var result = true;
    var index = el.offer.features;
    for (var i = 0; i < index.length; i++) {
      if (checkboxesChecked.indexOf(index[i]) === -1) {
        result = false;
      } else {
        result = true;
      }
    }
    return result;
  };

  var getAllFilter = function (data) {
    return data.filter(function (el) {
      return getHousingTypeValue(el) &&
      getHousingPriceValue(el) &&
      getHousingRoomsValue(el) &&
      getHousingGuestsValue(el) &&
      getContains(el);
    });
  };

  allFiltersElement.addEventListener('change', function () {
    window.card.closeCard();
    window.pin.removePins();
    window.pin.renderPins(getAllFilter(window.globalData));
  });
})();
