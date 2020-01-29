'use strict';

var typeOfRoom = ['palace', 'flat', 'house', 'bungalo'];
var checkinTime = ['12:00', '13:00', '14:00'];
var checkoutTime = ['12:00', '13:00', '14:00'];

var avatarNumber = [
    'img/avatars/user01.png', 
    'img/avatars/user02.png', 
    'img/avatars/user03.png', 
    'img/avatars/user04.png', 
    'img/avatars/user05.png', 
    'img/avatars/user06.png', 
    'img/avatars/user07.png', 
    'img/avatars/user08.png'
];

var getAvatar = function () {
    var authors = [];

    for (var i = 0; i < avatarNumber.length; i++) {
        authors[i] = {
            avatar: avatarNumber[i]
          };
    }
  return authors;
};

var getOffer = function () {
    var offer = {
        title: '',
        address: '600, 350',
        price: 100,
        type: ,
        rooms: ,
        guests: ,
        checkin: ,
        checkout: ,
    };
}
