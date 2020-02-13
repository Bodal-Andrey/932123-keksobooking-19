'use strict';

var titles = [
  'Сдаю хату',
  'Комната по бросовой цене',
  'Суперквартира', 'Райское жилище',
  'Шалаш со всеми удобствами'
];
var typeOfRoom = [
  'palace',
  'flat',
  'house',
  'bungalo'
];
var checkTime = ['12:00', '13:00', '14:00'];
var specification = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner'
];
var characteristic = [
  'Без тараканов и клопов',
  'Деревянный туалет на улице',
  'Имеется прислуга',
  'Есть бочка-офуро'
];
var photosOfRoom = [
  'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
];
var COUNTER = 8;
var ENTER_KEY = 'Enter';
var ESC_KEY = 'Escape';

var randomInteger = function (min, max) {
  var rand = min - 0.5 + Math.random() * (max - min + 1);
  return Math.round(rand);
};

var getFeaturesArray = function () {
  var newFeaturesArray = [];

  for (var i = 0; i < randomInteger(1, specification.length); i++) {
    newFeaturesArray[i] = specification[i];
  }
  return newFeaturesArray;
};

var featuresArray = getFeaturesArray();

var getPhotosArray = function () {
  var newPhotosArray = [];

  for (var i = 0; i < randomInteger(1, photosOfRoom.length); i++) {
    newPhotosArray[i] = photosOfRoom[i];
  }
  return newPhotosArray;
};

var photosArray = getPhotosArray();

var getTypeOfRoomArray = function () {
  var newTypeOfRoomArray = [];

  for (var i = 0; i < typeOfRoom.length; i++) {
    if (typeOfRoom[i] === 'palace') {
      newTypeOfRoomArray[i] = 'Дворец';
    }
    if (typeOfRoom[i] === 'flat') {
      newTypeOfRoomArray[i] = 'Квартира';
    }
    if (typeOfRoom[i] === 'house') {
      newTypeOfRoomArray[i] = 'Дом';
    }
    if (typeOfRoom[i] === 'bungalo') {
      newTypeOfRoomArray[i] = 'Бунгало';
    }
  }
  return newTypeOfRoomArray;
};

var typeOfRoomArray = getTypeOfRoomArray();

var generateData = function (count) {
  var arr = [];

  for (var i = 0; i < count; i++) {
    arr[i] = {
      author: {
        avatar: 'img/avatars/user0' + (i + 1) + '.png'
      },
      offer: {
        title: titles[randomInteger(0, titles.length - 1)],
        address: 'location.x, location.y',
        price: randomInteger(0, 1000),
        type: typeOfRoomArray[randomInteger(0, typeOfRoomArray.length - 1)],
        rooms: randomInteger(1, 5),
        guests: randomInteger(1, 10),
        checkin: checkTime[randomInteger(0, checkTime.length - 1)],
        checkout: checkTime[randomInteger(0, checkTime.length - 1)],
        features: featuresArray,
        description: characteristic[randomInteger(0, characteristic.length - 1)],
        photos: photosArray
      },
      location: {
        x: randomInteger(10, 1200),
        y: randomInteger(130, 630)
      }
    };
  }
  return arr;
};

var datas = generateData(COUNTER);
var similarPinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
var similarListPin = document.querySelector('.map__pins');
var similarCardTemplate = document.querySelector('#card').content.querySelector('.map__card');


var renderCard = function (container, card) {
  container.appendChild(createCard(card));
};

var createPin = function (data) {
  var pinElement = similarPinTemplate.cloneNode(true);

  pinElement.style.left = (data.location.x - 25) + 'px';
  pinElement.style.top = (data.location.y - 70) + 'px';
  pinElement.querySelector('img').src = data.author.avatar;
  pinElement.querySelector('img').alt = data.offer.title;

  pinElement.addEventListener('click', function () {
    renderCard(similarListPin, data);
  });
  pinElement.addEventListener('keydown', function (evt) {
    if (evt.key === ENTER_KEY) {
      renderCard(similarListPin, data);
    }
  });

  return pinElement;
};

var showSetupPins = function () {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < datas.length; i++) {
    fragment.appendChild(createPin(datas[i]));
  }
  similarListPin.appendChild(fragment);
};

// Отрисовка карточки

var renderFeatures = function (container, features) {
  container.innerHTML = '';

  for (var i = 0; i < features.length; i++) {
    var createLi = document.createElement('li');
    createLi.classList.add('popup__feature');
    createLi.classList.add('popup__feature--' + features[i]);
    container.appendChild(createLi);
  }
};

var renderPhotos = function (container, node, photos) {
  container.innerHTML = '';

  for (var i = 0; i < photos.length; i++) {
    var img = node.cloneNode();
    img.src = photos[i];
    container.appendChild(img);
  }
};

var createCard = function (data) {
  var cardElement = similarCardTemplate.cloneNode(true);

  cardElement.querySelector('.popup__title').textContent = data.offer.title;
  cardElement.querySelector('.popup__text--address').textContent = data.offer.addres;
  cardElement.querySelector('.popup__text--price').textContent = data.offer.price + ' Р/ночь';
  cardElement.querySelector('.popup__type').textContent = data.offer.type;
  cardElement.querySelector('.popup__text--capacity').textContent = data.offer.rooms + ' комнаты для ' + data.offer.guests + ' гостей';
  cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + data.offer.checkin + ', выезд до ' + data.offer.checkout;
  cardElement.querySelector('.popup__description').textContent = data.offer.description;
  cardElement.querySelector('.popup__avatar').src = data.author.avatar;

  renderFeatures(cardElement.querySelector('.popup__features'), data.offer.features);
  renderPhotos(cardElement.querySelector('.popup__photos'), cardElement.querySelector('.popup__photo'), data.offer.photos);

  cardElement.addEventListener('keydown', function (evt) {
    if (evt.key === ESC_KEY) {
      closeCard();
    }
  });
  cardElement.querySelector('.popup__close').addEventListener('click', function () {
    closeCard();
  });
  return cardElement;
};

var closeCard = function () {
  var card = document.querySelector('.map__card');
  if (card) {
    card.remove();
  }
};

// var showSetupCard = function () {
//   var mapFiltersContainer = document.querySelector('.map__filters-container');
//   var fragment = document.createDocumentFragment();
//   for (var i = 0; i < datas.length; i++) {
//     fragment.appendChild(createCard(datas[i]));
//   }
//   similarListCard.insertBefore(fragment, mapFiltersContainer);
// };

// Активация страницы
var labelCenterTop = document.querySelector('.map__pin--main').style.top;
var labelCenterLeft = document.querySelector('.map__pin--main').style.left;
var addressBar = document.querySelector('#address');
var offerForm = document.querySelector('.ad-form');

addressBar.placeholder = Math.round(parseInt(labelCenterLeft, 10) + 32.5) + ', ' + Math.round(parseInt(labelCenterTop, 10) + 32.5);

var getAddressBar = function () {
  var spikeLabelTop = Math.round(parseInt(labelCenterTop, 10) + 78);
  var spikeLabelLeft = Math.round(parseInt(labelCenterLeft, 10) + 32.5);

  addressBar.placeholder = spikeLabelLeft + ', ' + spikeLabelTop;
};

document.querySelector('.ad-form-header').setAttribute('disabled', 'disabled');
document.querySelector('.map__filters').classList.add('ad-form--disabled');

var selectionFieldset = document.querySelectorAll('.ad-form__element');

for (var i = 0; i < selectionFieldset.length; i++) {
  selectionFieldset[i].setAttribute('disabled', 'disabled');
}

var mainMark = document.querySelector('.map__pin--main');

var removeDisabled = function () {
  offerForm.classList.remove('ad-form--disabled');
  document.querySelector('.map').classList.remove('map--faded');
  document.querySelector('.ad-form-header').removeAttribute('disabled');
  document.querySelector('.map__filters').classList.remove('ad-form--disabled');

  for (var j = 0; j < selectionFieldset.length; j++) {
    selectionFieldset[j].removeAttribute('disabled');
  }
};

var detectLeftButton = function (evt) {
  evt = evt || window.event;
  if ('buttons' in evt) {
    return evt.buttons === 1;
  }
  var button = evt.which || evt.button;
  return button === 1;
};

mainMark.addEventListener('mousedown', function () {
  if (detectLeftButton()) {
    removeDisabled();
    showSetupPins();
    getAddressBar();
  }
});

mainMark.addEventListener('keydown', function (evt) {
  if (evt.key === ENTER_KEY) {
    removeDisabled();
    showSetupPins();
    getAddressBar();
  }
});

// Валидация формы
var rooms = offerForm.querySelector('#room_number');
var guests = offerForm.querySelector('#capacity');
var adTitle = offerForm.querySelector('#title');
var priceOfRoom = offerForm.querySelector('#price');
var MIN_NAME_LENGTH = 30;
var MAX_NAME_LENGTH = 100;

var ROOMS_FOR_GUESTS = {
  '1': ['1'],
  '2': ['2', '1'],
  '3': ['3', '2', '1'],
  '100': ['0']
};

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
