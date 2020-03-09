'use strict';

(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

  var fileChooser = document.querySelector('#images');
  var photo = document.createElement('img');
  var photoBlock = document.querySelector('.ad-form__photo');

  fileChooser.addEventListener('change', function () {
    var file = fileChooser.files[0];
    var fileName = file.name.toLowerCase();

    var matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    if (matches) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        photoBlock.append(photo);
        photo.src = reader.result;
        photo.width = '70';
        photo.height = '70';
      });
      reader.readAsDataURL(file);
    }
  });
})();
