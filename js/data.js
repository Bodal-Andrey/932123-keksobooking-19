'use strict';

// Модуль, которфй создаёт данные
(function () {
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

  window.data = {
    generateData: function (count) {
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
    }
  };
})();
