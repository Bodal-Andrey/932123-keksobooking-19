'use strict';

(function () {
  var URL_L = 'https://js.dump.academy/keksobooking/data';

  window.load = function (onSuccess) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      onSuccess(xhr.response);
    });

    xhr.open('GET', URL_L);
    xhr.send();
  };
})();
