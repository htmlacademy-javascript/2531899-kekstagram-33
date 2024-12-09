import { EFFECTS } from './data';

const imagePreview = document.querySelector('.img-upload__preview img');
const scaleSmallerButton = document.querySelector('.scale__control--smaller');
const scaleBiggerButton = document.querySelector('.scale__control--bigger');
const scaleControlValue = document.querySelector('.scale__control--value');

const SCALE_STEP = 25;
const MAX_SCALE_VALUE = 100;
let currentScaleValue = MAX_SCALE_VALUE;

function updateScaleValue(newScaleValue) {
  currentScaleValue = newScaleValue;
  scaleControlValue.value = `${currentScaleValue}%`;
  imagePreview.style.transform = `scale(${currentScaleValue / 100})`;
}

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

const sliderElement = document.querySelector('.effect-level__slider');
const valueElement = document.querySelector('.effect-level__value');
const sliderContainer = document.querySelector('.img-upload__effect-level');

noUiSlider.create(sliderElement, {
  range: {
    min: 0,
    max:  100,
  },
  start: 0,
  step: 1,
  connect: 'lower',
  format: {
    to: function (value) {
      if(Number.isInteger(value)) {
        return value.toFixed(0);
      }
      return value.toFixed(1);
    },
    from: function (value) {
      return parseFloat(value);
    },
  },
});

sliderElement.noUiSlider.on('update', () => {
  const value = sliderElement.noUiSlider.get();
  valueElement.value = value;
  applyEffect();
});

function applyEffect() {
  const selectedEffect = EFFECTS.find((effect) => effect.querySelector.checked);
  if (selectedEffect) {
    const value = parseFloat(valueElement.value);
    imagePreview.style.filter = `${selectedEffect.filter}(${value}${selectedEffect.unit})`;
  } else {
    imagePreview.style.filter = '';
  }
}

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

export {sliderContainer, imagePreview, scaleControlValue, MAX_SCALE_VALUE};
