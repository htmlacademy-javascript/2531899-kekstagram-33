import { closeOverlay } from './changeEffects';
import { sendData } from './serverData';

const HASHTAGREGEXP = /^#[a-zа-яё0-9]{1,19}$/i;
const MAX_HASHTAG_AMOUNT = 5;
const MAX_DESCRIPTION_LENGTH = 140;

const SubmitButtonText = {
  IDLE: 'Опубликовать',
  SENDING: 'Публикую...',
};

const uploadPhotoForm = document.querySelector('.img-upload__form');
const hashtagField = document.querySelector('.text__hashtags');
const descriptionField = document.querySelector('.text__description');
const uploadSubmitButton = document.querySelector('.img-upload__submit');

const templateSuccess = document.querySelector('#success').content;
const templateError = document.querySelector('#error').content;

const pristine = new Pristine(uploadPhotoForm, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper--error',
});

let errorMessage;

const checkValidHashtag = (array) => {
  errorMessage = 'Невалидный хэштег';
  return array.every((hashtag) => HASHTAGREGEXP.test(hashtag));
};

const checkHashtagDuplicates = (array) => {
  errorMessage = 'Хэштеги не могут повторяться';
  return array.filter((hashtag, i) => array.indexOf(hashtag) !== i).length;
};

const checkHashtagAmount = (array) => {
  errorMessage = `Максимум ${MAX_HASHTAG_AMOUNT} хэштегов`;
  return array.length <= MAX_HASHTAG_AMOUNT;
};

const validateHashtags = (value) => {
  const hashtags = value.toLowerCase().trim().split(' ').filter((hashtag) => hashtag !== '');
  if (!hashtags[0] || (checkValidHashtag(hashtags) && !checkHashtagDuplicates(hashtags) && checkHashtagAmount(hashtags))) {
    uploadSubmitButton.removeAttribute('disabled');
    return true;
  }
  uploadSubmitButton.setAttribute('disabled', '');
  return false;
};

const validateDescription = (value) => {
  if (value.length <= MAX_DESCRIPTION_LENGTH) {
    uploadSubmitButton.removeAttribute('disabled');
    return true;
  }
  uploadSubmitButton.setAttribute('disabled', '');
  return false;
};

pristine.addValidator(hashtagField, validateHashtags, () => errorMessage);
pristine.addValidator(descriptionField, validateDescription, `Максимальное количество символов - ${MAX_DESCRIPTION_LENGTH}`);

const disabledButton = (text) => {
  uploadSubmitButton.disabled = true;
  uploadSubmitButton.textContent = text;
};

const enableButton = (text) => {
  uploadSubmitButton.disabled = false;
  uploadSubmitButton.textContent = text;
};

const buttonClickHandler = (evt) => {
  evt.stopPropagation();
  const existElement = document.querySelector('.success') || document.querySelector('.error');
  const closeButton = existElement.querySelector('button');
  if(evt.target === existElement || evt.target === closeButton) {
    existElement.remove();
    document.body.removeEventListener('click', buttonClickHandler);
  }
};

const buttonKeydownHandler = (evt) => {
  evt.stopPropagation();
  const existElement = document.querySelector('.success') || document.querySelector('.error');
  const closeButton = existElement.querySelector('button');
  if(evt.target === existElement || evt.target === closeButton || evt.key === 'Escape') {
    existElement.remove();
    document.body.removeEventListener('keydown', buttonKeydownHandler);
  }
};

const appendNotification = (template, trigger = null) => {
  trigger?.();
  const notificationNode = template.cloneNode(true);
  document.body.append(notificationNode);
  document.body.addEventListener('click', buttonClickHandler);
  document.body.addEventListener('keydown', buttonKeydownHandler);
};

const sendFormData = async (formElement) => {
  if (pristine.validate() === true) {
    disabledButton(SubmitButtonText.SENDING);

    try {
      await sendData(new FormData(formElement));
      appendNotification(templateSuccess, () => {
        closeOverlay();
      });
    } catch (error) {
      appendNotification(templateError);
    } finally {
      enableButton(SubmitButtonText.IDLE);
    }
  }
};

const formSubmitHandler = (evt) => {
  evt.preventDefault();
  sendFormData(evt.target);
};

uploadPhotoForm.addEventListener('submit', formSubmitHandler);

export { pristine, hashtagField, descriptionField };
