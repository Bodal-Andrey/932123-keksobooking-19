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
        type: typeOfRoom[randomInteger(0, typeOfRoom.length - 1)],
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

document.querySelector('.map').classList.remove('map--faded');

var similarPinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
var similarListPin = document.querySelector('.map__pins');

var renderPin = function (data) {
  var pinElement = similarPinTemplate.cloneNode(true);

  pinElement.style.left = (data.location.x - 25) + 'px';
  pinElement.style.top = (data.location.y - 70) + 'px';
  pinElement.querySelector('img').src = data.author.avatar;
  pinElement.querySelector('img').alt = data.offer.title;

  return pinElement;
};

var showSetup = function () {
  var datas = generateData(COUNTER);

  var fragment = document.createDocumentFragment();
  for (var i = 0; i < datas.length; i++) {
    fragment.appendChild(renderPin(datas[i]));
  }
  similarListPin.appendChild(fragment);
};

showSetup();
