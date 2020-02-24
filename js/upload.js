'use strict';

(function () {
  var URL = 'https://js.dump.academy/keksobooking';

  window.upload = function (data, onSuccess) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        onSuccess(xhr.response);
        window.form.onGetSuccess();
        window.form.closeSuccessMessage();
      } else {
        window.form.onGetError();
        window.form.closeErrorMessage();
      }
    });

    xhr.open('POST', URL);
    xhr.send(data);
  };
})();
