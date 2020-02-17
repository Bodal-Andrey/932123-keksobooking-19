'use strict';

// Модуль, который работает с формой объявления
(function () {
  var MIN_NAME_LENGTH = 30;
  var MAX_NAME_LENGTH = 100;

  var ROOMS_FOR_GUESTS = {
    '1': ['1'],
    '2': ['2', '1'],
    '3': ['3', '2', '1'],
    '100': ['0']
  };
  var CHECK_TIME = {
    '12:00': ['12:00'],
    '13:00': ['13:00'],
    '14:00': ['14:00']
  };
  var minPriceOfRoom = {
    bungalo: 0,
    flat: 1000,
    house: 5000,
    palace: 10000
  };

  var offerForm = document.querySelector('.ad-form');
  var selectionFieldset = document.querySelectorAll('.ad-form__element');
  var rooms = offerForm.querySelector('#room_number');
  var guests = offerForm.querySelector('#capacity');
  var adTitle = offerForm.querySelector('#title');
  var priceOfRoom = offerForm.querySelector('#price');
  var timein = offerForm.querySelector('#timein');
  var timeout = offerForm.querySelector('#timeout');
  var selectOfRoom = offerForm.querySelector('#type');

  document.querySelector('.ad-form-header').setAttribute('disabled', 'disabled');
  document.querySelector('.map__filters').classList.add('ad-form--disabled');

  for (var i = 0; i < selectionFieldset.length; i++) {
    selectionFieldset[i].setAttribute('disabled', 'disabled');
  }

  window.form = {
    removeDisabled: function () {
      offerForm.classList.remove('ad-form--disabled');
      document.querySelector('.map').classList.remove('map--faded');
      document.querySelector('.ad-form-header').removeAttribute('disabled');
      document.querySelector('.map__filters').classList.remove('ad-form--disabled');

      for (var j = 0; j < selectionFieldset.length; j++) {
        selectionFieldset[j].removeAttribute('disabled');
      }
    }
  };

  // Валидация формы
  var validateGuests = function () {
    var validGuestsOptions = ROOMS_FOR_GUESTS[rooms.value];
    var guestsOptions = guests.querySelectorAll('option');
    guestsOptions.forEach(function (currentOption) {
      currentOption.disabled = true;
      currentOption.selected = false;
      var index = validGuestsOptions.indexOf(currentOption.value);
      if (index >= 0) {
        currentOption.disabled = false;
        if (index === 0) {
          currentOption.selected = true;
        }
      }
    });
  };

  validateGuests();

  rooms.addEventListener('change', function () {
    validateGuests();
  });

  var validateTime = function () {
    var validCheckInTime = CHECK_TIME[timein.value];
    var validCheckOutTime = timeout.querySelectorAll('option');
    validCheckOutTime.forEach(function (currentTime) {
      currentTime.disabled = true;
      currentTime.selected = false;
      var index = validCheckInTime.indexOf(currentTime.value);
      if (index >= 0) {
        currentTime.disabled = false;
        if (index === 0) {
          currentTime.selected = true;
        }
      }
    });
  };

  validateTime();

  timein.addEventListener('change', function () {
    validateTime();
  });

  adTitle.addEventListener('input', function (evt) {
    var target = evt.target;

    if (target.validity.valueMissing) {
      target.setCustomValidity('Обязательное текстовое поле');
    } else if (target.value.length < MIN_NAME_LENGTH) {
      target.setCustomValidity('Минимальная длина -  ' + MIN_NAME_LENGTH + ' символов');
    } else if (target.value.length > MAX_NAME_LENGTH) {
      target.setCustomValidity('Максимальная длина -  ' + MAX_NAME_LENGTH + ' символов');
    } else {
      target.setCustomValidity('');
    }
  });

  priceOfRoom.addEventListener('input', function (evt) {
    var target = evt.target;

    if (target.validity.valueMissing) {
      target.setCustomValidity('Обязательное поле');
    } else {
      target.setCustomValidity('');
    }
  });

  selectOfRoom.addEventListener('change', function () {
    priceOfRoom.placeholder = minPriceOfRoom[selectOfRoom.value];
    priceOfRoom.min = minPriceOfRoom[selectOfRoom.value];
  });
})();
