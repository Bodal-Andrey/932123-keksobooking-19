'use strict';

(function () {
  var BASIC_PICTURE = 'img/muffin-grey.svg';

  var fileChooser = document.querySelector('#avatar');
  var preview = document.querySelector('.ad-form-header__preview img');

  var onAvatarLoad = function () {
    var file = fileChooser.files[0];
    var fileName = file.name.toLowerCase();

    var matches = window.utils.FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    if (matches) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        preview.src = reader.result;
      });
      reader.readAsDataURL(file);
    }
  };

  fileChooser.addEventListener('change', onAvatarLoad);

  var removeAvatar = function () {
    preview.src = BASIC_PICTURE;
  };

  window.avatar = {
    remove: removeAvatar
  };
})();
