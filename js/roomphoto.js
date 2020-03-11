'use strict';

(function () {
  var fileChooser = document.querySelector('#images');
  var photo = document.createElement('img');
  var photoBlock = document.querySelector('.ad-form__photo');

  var onPhotoLoad = function () {
    var file = fileChooser.files[0];
    var fileName = file.name.toLowerCase();

    var matches = window.utils.FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    if (matches) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        photoBlock.appendChild(photo);
        photo.src = reader.result;
        photo.width = '70';
        photo.height = '70';
      });
      reader.readAsDataURL(file);
    }
  };

  fileChooser.addEventListener('change', onPhotoLoad);

  var removeRoomPhoto = function () {
    if (photoBlock.contains(photo)) {
      photoBlock.removeChild(photo);
    }
  };

  window.roomphoto = {
    remove: removeRoomPhoto
  };
})();
