const FILE_TYPES = ['jpg', 'jpeg', 'png'];
const uploadPhotoInput = document.querySelector('.img-upload__input');
const previewPhoto = document.querySelector('.img-upload__preview img');
const previewEffects = document.querySelectorAll('.effects__preview');

uploadPhotoInput.addEventListener('change', () => {
  const file = uploadPhotoInput.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));
  if(matches) {
    previewPhoto.src = URL.createObjectURL(file);
    previewEffects.forEach((preview) => {
      preview.style.backgroundImage = `url('${URL.createObjectURL(file)}')`;
    });
  }
});
