import { EFFECTS } from './data';
import { pristine, hashtagField, descriptionField } from './validateForms';

const SCALE_STEP = 25;
const MAX_SCALE_VALUE = 100;

const imagePreview = document.querySelector('.img-upload__preview img');
const uploadPhotoInput = document.querySelector('.img-upload__input');
const uploadPhotoOverlay = document.querySelector('.img-upload__overlay');
const uploadPhotoOverlayClose = document.querySelector('.img-upload__cancel');

const sliderContainer = document.querySelector('.img-upload__effect-level');
const scaleControlValue = document.querySelector('.scale__control--value');
const scaleSmallerButton = document.querySelector('.scale__control--smaller');
const scaleBiggerButton = document.querySelector('.scale__control--bigger');

const sliderElement = document.querySelector('.effect-level__slider');
const valueElement = document.querySelector('.effect-level__value');
const defaultEffect = document.querySelector('#effect-none');

let currentScaleValue = MAX_SCALE_VALUE;

const updateScaleValue = (newScaleValue) => {
  currentScaleValue = newScaleValue;
  scaleControlValue.value = `${currentScaleValue}%`;
  imagePreview.style.transform = `scale(${currentScaleValue / 100})`;
};

scaleSmallerButton.addEventListener('click', () => {
  if (currentScaleValue > SCALE_STEP) {
    updateScaleValue(currentScaleValue - SCALE_STEP);
  }
});

scaleBiggerButton.addEventListener('click', () => {
  if (currentScaleValue < MAX_SCALE_VALUE) {
    updateScaleValue(currentScaleValue + SCALE_STEP);
  }
});

const closeOverlay = () => {
  uploadPhotoOverlay.classList.add('hidden');
  document.body.classList.remove('modal-open');
  uploadPhotoInput.value = '';
  sliderContainer.style.display = 'none';
  imagePreview.style.filter = '';
  hashtagField.value = '';
  descriptionField.value = '';
  scaleControlValue.value = `${MAX_SCALE_VALUE}%`;
  currentScaleValue = MAX_SCALE_VALUE;
  imagePreview.style.removeProperty('transform');
  defaultEffect.checked = true;
  pristine.reset();
};

uploadPhotoInput.addEventListener('change', () =>{
  uploadPhotoOverlay.classList.remove('hidden');
  document.body.classList.add('modal-open');

  document.addEventListener('keydown', (evt) => {
    if(evt.key === 'Escape' && !(document.activeElement === hashtagField || document.activeElement === descriptionField)) {
      closeOverlay();
    }
  });
});

uploadPhotoOverlayClose.addEventListener('click', () => {
  closeOverlay();
});


noUiSlider.create(sliderElement, {
  range: {
    min: 0,
    max:  100,
  },
  start: 0,
  step: 1,
  connect: 'lower',
  format: {
    to: (value) => Number.isInteger(value) ? value.toFixed(0) : value.toFixed(1),
    from: (value) => parseFloat(value),
  },
});

const applyEffect = () => {
  const selectedEffect = EFFECTS.find((effect) => effect.querySelector.checked);
  if (selectedEffect) {
    const value = parseFloat(valueElement.value);
    imagePreview.style.filter = `${selectedEffect.filter}(${value}${selectedEffect.unit})`;
  } else {
    imagePreview.style.filter = '';
  }
};

sliderElement.noUiSlider.on('update', () => {
  const value = sliderElement.noUiSlider.get();
  valueElement.value = value;
  applyEffect();
});

EFFECTS.forEach((effect) => {
  effect.querySelector.addEventListener('change', (evt) => {
    if (evt.target.checked) {
      sliderContainer.style.display = 'block';
      sliderElement.noUiSlider.updateOptions({
        range: {
          min: effect.min,
          max: effect.max,
        },
        step: effect.step,
      });

      sliderElement.noUiSlider.set(effect.max);
      applyEffect();
      if (effect.name === 'none') {
        sliderContainer.style.display = 'none';
        imagePreview.style.filter = '';
      }
    }
  });
});

sliderContainer.style.display = 'none';

export { closeOverlay };
