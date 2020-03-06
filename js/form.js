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
  var housingSelects = document.querySelectorAll('.map__filter');
  var rooms = offerForm.querySelector('#room_number');
  var guests = offerForm.querySelector('#capacity');
  var adTitle = offerForm.querySelector('#title');
  var priceOfRoom = offerForm.querySelector('#price');
  var timein = offerForm.querySelector('#timein');
  var timeout = offerForm.querySelector('#timeout');
  var selectOfRoom = offerForm.querySelector('#type');
  var resetForm = offerForm.querySelector('.ad-form__reset');
  var mapFilters = document.querySelector('.map__filters');
  var main = document.querySelector('main');
  var success = document.querySelector('#success').content.querySelector('.success');
  var error = document.querySelector('#error').content.querySelector('.error');

  var removeDisabled = function () {
    offerForm.classList.remove('ad-form--disabled');
    document.querySelector('.map').classList.remove('map--faded');
    document.querySelector('.ad-form-header').removeAttribute('disabled');
    mapFilters.classList.remove('ad-form--disabled');

    for (var j = 0; j < selectionFieldset.length; j++) {
      selectionFieldset[j].removeAttribute('disabled');
    }
    for (var i = 0; i < housingSelects.length; i++) {
      housingSelects[i].removeAttribute('disabled', 'disabled');
    }
  };

  var addDisabled = function () {
    offerForm.classList.add('ad-form--disabled');
    document.querySelector('.map').classList.add('map--faded');
    document.querySelector('.ad-form-header').setAttribute('disabled', 'disabled');
    mapFilters.classList.add('ad-form--disabled');

    for (var j = 0; j < selectionFieldset.length; j++) {
      selectionFieldset[j].setAttribute('disabled', 'disabled');
    }
    for (var i = 0; i < housingSelects.length; i++) {
      housingSelects[i].setAttribute('disabled', 'disabled');
    }
  };

  var getReport = function (data) {
    main.appendChild(data);
  };

  var removeReport = function (data) {
    main.removeChild(data);
  };

  var closeErrorMessage = function () {
    var errorButton = document.querySelector('.error__button');

    errorButton.addEventListener('click', function () {
      removeReport(error);
    });
    document.addEventListener('click', function () {
      removeReport(error);
    });
    document.addEventListener('keydown', function (evt) {
      if (evt.key === window.utils.ESC_KEY) {
        removeReport(error);
      }
    });
  };

  var onClickDocumentSuccess = function () {
    removeReport(success);
    document.removeEventListener('click', onClickDocumentSuccess);
  };

  var closeSuccessMessage = function () {
    document.addEventListener('click', onClickDocumentSuccess);
    document.addEventListener('keydown', function (evt) {
      if (evt.key === window.utils.ESC_KEY) {
        removeReport(success);
      }
    });
  };

  var pinStartCoords = function () {
    document.querySelector('.map__pin--main').style.top = '375px';
    document.querySelector('.map__pin--main').style.left = '570px';
    window.map.addressBar.value = '603, 408';
  };

  var onPriceOfRoom = function () {
    priceOfRoom.placeholder = minPriceOfRoom[selectOfRoom.value];
    priceOfRoom.min = minPriceOfRoom[selectOfRoom.value];
  };

  var backToBasis = function () {
    addDisabled();
    window.pin.removePins();
    window.card.closeCard();
    offerForm.reset();
    mapFilters.reset();
    onPriceOfRoom();
    pinStartCoords();
    window.map.addRenderPins();
  };

  var onGetSuccess = function () {
    backToBasis();
    getReport(success);
    closeSuccessMessage();
  };

  var onGetError = function () {
    getReport(error);
    closeErrorMessage();
  };

  offerForm.addEventListener('submit', function (evt) {
    window.upload(new FormData(offerForm), onGetSuccess, onGetError);
    evt.preventDefault();
  });

  resetForm.addEventListener('click', function (evt) {
    backToBasis();
    evt.preventDefault();
  });

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

  selectOfRoom.addEventListener('change', onPriceOfRoom);

  addDisabled();
  validateGuests();
  validateTime();

  window.form = {
    removeDisabled: removeDisabled
  };
})();
