const uploadPhotoInput = document.querySelector('.img-upload__input');
const uploadPhotoOverlay = document.querySelector('.img-upload__overlay');
const uploadPhotoOverlayClose = document.querySelector('.img-upload__cancel');

const uploadPhotoForm = document.querySelector('.img-upload__form');
const hashtagField = document.querySelector('.text__hashtags');
const descriptionField = document.querySelector('.text__description');
const uploadSubmitButton = document.querySelector('.img-upload__submit');

uploadPhotoInput.addEventListener('change', () =>{
  uploadPhotoOverlay.classList.remove('hidden');
  document.body.classList.add('modal-open');
});

uploadPhotoOverlayClose.addEventListener('click', () => {
  uploadPhotoOverlay.classList.add('hidden');
  document.body.classList.remove('modal-open');
  uploadPhotoInput.value = '';
});

document.addEventListener('keydown', (evt) => {
  if(evt.key === 'Escape' && !(document.activeElement === hashtagField || document.activeElement === descriptionField)) {
    uploadPhotoOverlay.classList.add('hidden');
    document.body.classList.remove('modal-open');
    uploadPhotoInput.value = '';
  }
});

const pristine = new Pristine(uploadPhotoForm, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper--error',
});

const hashtagRegExp = /^#[a-zа-яё0-9]{1,19}$/i;
const MAX_HASHTAG_AMOUNT = 5;
const MAX_DESCRIPTION_LENGTH = 140;

let errorMessage;

function checkValidHashtag(array) {
  errorMessage = 'Невалидный хэштег';
  return array.every((hashtag) => hashtagRegExp.test(hashtag));
}

function checkHashtagDuplicates(array) {
  errorMessage = 'Хэштеги не могут повторяться';
  return array.filter((hashtag, i) => array.indexOf(hashtag) !== i).length;
}

function checkHashtagAmount(array) {
  errorMessage = `Максимум ${MAX_HASHTAG_AMOUNT} хэштегов`;
  return array.length <= MAX_HASHTAG_AMOUNT;
}

function validateHashtags(value) {
  const hashtags = value.toLowerCase().trim().split(' ');
  if (!hashtags[0] || (checkValidHashtag(hashtags) && !checkHashtagDuplicates(hashtags) && checkHashtagAmount(hashtags))) {
    uploadSubmitButton.removeAttribute('disabled');
    return true;
  }
  uploadSubmitButton.setAttribute('disabled', '');
  return false;
}

function validateDescription(value) {
  if (value.length <= MAX_DESCRIPTION_LENGTH) {
    uploadSubmitButton.removeAttribute('disabled');
    return true;
  }
  uploadSubmitButton.setAttribute('disabled', '');
  return false;
}

pristine.addValidator(hashtagField, validateHashtags, () => errorMessage);
pristine.addValidator(descriptionField, validateDescription, `Максимальное количество символов - ${MAX_DESCRIPTION_LENGTH}`);

uploadPhotoForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  if (pristine.validate() === true) {
    uploadPhotoForm.submit();
  }
});
