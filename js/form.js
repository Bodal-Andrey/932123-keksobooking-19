'use strict';

(function () {
  var MIN_NAME_LENGTH = 30;
  var MAX_NAME_LENGTH = 100;
  var MAIN_MARK_START_COORDS = '603, 408';

  var roomsForGuests = {
    '1': ['1'],
    '2': ['2', '1'],
    '3': ['3', '2', '1'],
    '100': ['0']
  };
  var checkTime = {
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

    selectionFieldset.forEach(function (it) {
      it.removeAttribute('disabled', 'disabled');
    });

    housingSelects.forEach(function (it) {
      it.removeAttribute('disabled', 'disabled');
    });
  };

  var addDisabled = function () {
    offerForm.classList.add('ad-form--disabled');
    document.querySelector('.map').classList.add('map--faded');
    document.querySelector('.ad-form-header').setAttribute('disabled', 'disabled');
    mapFilters.classList.add('ad-form--disabled');

    selectionFieldset.forEach(function (it) {
      it.setAttribute('disabled', 'disabled');
    });

    housingSelects.forEach(function (it) {
      it.setAttribute('disabled', 'disabled');
    });
  };

  var getReport = function (data) {
    main.appendChild(data);
  };

  var removeReport = function (data) {
    main.removeChild(data);
  };

  var onClickDocumentError = function () {
    removeReport(error);
    document.removeEventListener('click', onClickDocumentError);
  };

  var onErrorEscPress = function (evt) {
    if (evt.key === window.utils.ESC_KEY) {
      onClickDocumentError();
    }
  };

  var closeErrorMessage = function () {
    var errorButton = document.querySelector('.error__button');

    document.addEventListener('click', onClickDocumentError);

    errorButton.addEventListener('click', onClickDocumentError);

    document.addEventListener('keydown', onErrorEscPress);

  };

  var onClickDocumentSuccess = function () {
    removeReport(success);
    document.removeEventListener('click', onClickDocumentSuccess);
  };

  var onSuccessEscPress = function (evt) {
    if (evt.key === window.utils.ESC_KEY) {
      onClickDocumentSuccess();
      document.removeEventListener('keydown', onSuccessEscPress);
    }
  };

  var closeSuccessMessage = function () {
    document.addEventListener('click', onClickDocumentSuccess);
    document.addEventListener('keydown', onSuccessEscPress);
  };

  var pinStartCoords = function () {
    document.querySelector('.map__pin--main').style.top = '375px';
    document.querySelector('.map__pin--main').style.left = '570px';
    window.map.addressBar.value = MAIN_MARK_START_COORDS;
  };

  var onPriceOfRoom = function () {
    priceOfRoom.placeholder = minPriceOfRoom[selectOfRoom.value];
    priceOfRoom.min = minPriceOfRoom[selectOfRoom.value];
  };

  var backToBasis = function () {
    addDisabled();
    window.pin.remove();
    window.card.close();
    offerForm.reset();
    mapFilters.reset();
    onPriceOfRoom();
    pinStartCoords();
    window.map.addRenderPins();
    window.roomphoto.remove();
    window.avatar.remove();
  };

  var onGetSuccess = function () {
    backToBasis();
    getReport(success);
    closeSuccessMessage();
  };

  var onSubmitError = function () {
    getReport(error);
    closeErrorMessage();
  };

  offerForm.addEventListener('submit', function (evt) {
    window.backend.upload(new FormData(offerForm), onGetSuccess, onSubmitError);
    evt.preventDefault();
  });

  resetForm.addEventListener('click', function (evt) {
    backToBasis();
    evt.preventDefault();
  });

  var validateGuests = function () {
    var validGuestsOptions = roomsForGuests[rooms.value];
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
    var validCheckInTime = checkTime[timein.value];
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
    removeDisabled: removeDisabled,
    error: error,
    getReport: getReport,
    closeErrorMessage: closeErrorMessage
  };
})();
