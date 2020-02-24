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
  var resetForm = offerForm.querySelector('.ad-form__reset');
  var main = document.querySelector('main');
  var success = document.querySelector('#success').content.querySelector('.success');
  var error = document.querySelector('#error').content.querySelector('.error');

  document.querySelector('.ad-form-header').setAttribute('disabled', 'disabled');
  document.querySelector('.map__filters').classList.add('ad-form--disabled');

  for (var i = 0; i < selectionFieldset.length; i++) {
    selectionFieldset[i].setAttribute('disabled', 'disabled');
  }

  var removeDisabled = function () {
    offerForm.classList.remove('ad-form--disabled');
    document.querySelector('.map').classList.remove('map--faded');
    document.querySelector('.ad-form-header').removeAttribute('disabled');
    document.querySelector('.map__filters').classList.remove('ad-form--disabled');

    for (var j = 0; j < selectionFieldset.length; j++) {
      selectionFieldset[j].removeAttribute('disabled');
    }
  };

  var addDisabled = function () {
    offerForm.classList.add('ad-form--disabled');
    document.querySelector('.map').classList.add('map--faded');
    document.querySelector('.ad-form-header').setAttribute('disabled', 'disabled');
    document.querySelector('.map__filters').classList.add('ad-form--disabled');

    for (var j = 0; j < selectionFieldset.length; j++) {
      selectionFieldset[j].setAttribute('disabled', 'disabled');
    }
  };

  offerForm.addEventListener('submit', function (evt) {
    window.upload(new FormData(offerForm), function () {
      addDisabled();
      window.pin.onRemovePins();
      window.card.closeAllCard();
      offerForm.reset();
      onPriceOfRoom();
      document.querySelector('.map__pin--main').style.top = '375px';
      document.querySelector('.map__pin--main').style.left = '570px';
      window.pin.addressBar.placeholder = '603, 408';
    });
    evt.preventDefault();
  });

  resetForm.addEventListener('click', function (evt) {
    addDisabled();
    window.pin.onRemovePins();
    window.card.closeAllCard();
    offerForm.reset();
    onPriceOfRoom();
    document.querySelector('.map__pin--main').style.top = '375px';
    document.querySelector('.map__pin--main').style.left = '570px';
    window.pin.addressBar.placeholder = '603, 408';
    evt.preventDefault();
  });

  var onGetSuccess = function () {
    main.appendChild(success);
  };

  var onGetError = function () {
    main.appendChild(error);
  };

  var onRemoveError = function () {
    main.removeChild(error);
  };

  var onRemoveSuccess = function () {
    main.removeChild(success);
  };

  var closeErrorMessage = function () {
    var errorButton = document.querySelector('.error__button');
    if (onGetError) {
      errorButton.addEventListener('click', function () {
        onRemoveError();
      });
      document.addEventListener('click', function () {
        onRemoveError();
      });
    }
  };

  var closeSuccessMessage = function () {
    if (onGetSuccess) {
      document.addEventListener('click', function () {
        onRemoveSuccess();
      });
    }
  };

  document.addEventListener('keydown', function (evt) {
    if (evt.key === window.utils.ESC_KEY) {
      onRemoveError();
      onRemoveSuccess();
    }
  });

  window.form = {
    onGetSuccess: onGetSuccess,
    onGetError: onGetError,
    removeDisabled: removeDisabled,
    closeErrorMessage: closeErrorMessage,
    closeSuccessMessage: closeSuccessMessage
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

  var onPriceOfRoom = function () {
    priceOfRoom.placeholder = minPriceOfRoom[selectOfRoom.value];
    priceOfRoom.min = minPriceOfRoom[selectOfRoom.value];
  };

  selectOfRoom.addEventListener('change', onPriceOfRoom);
})();
