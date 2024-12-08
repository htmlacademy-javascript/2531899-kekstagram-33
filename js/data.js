import {createIdGenerator, getRandomArrayElement, getRandomInteger} from './util.js';

const OBJECT_COUNT = 25;
const MIN_LIKES_NUMBER = 15;
const MAX_LIKES_NUMBER = 200;
const MIN_COMMENTS_NUMBER = 0;
const MAX_COMMENTS_NUMBER = 30;

const DESCRIPTIONS = [
  'Кот спит.',
  'Кот проснулся',
  'Кот умывается.',
  'Кот требует у людей еды.',
  'Кот поел.',
  'Кот смотрит в окно.',
  'Люди смотрят на то, как кот смотрит в окно.',
  'Кот смотрит на людей',
  'Кот играет с мухой.',
  'Кот съел муху.',
  'Кот лёг спать.',
];

const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];

const NAMES = [
  'Иван',
  'Хуан Себастьян',
  'Мария',
  'Кристоф',
  'Виктор',
  'Юлия',
  'Люпита',
  'Вашингтон',
];

const EFFECTS = [
  {
    name: 'none',
    querySelector: document.querySelector('#effect-none'),
    filter: 'none',
    min: 0,
    max: 100,
    step: 1,
    unit: '',
  },
  {
    name: 'chrome',
    querySelector: document.querySelector('#effect-chrome'),
    filter: 'grayscale',
    min: 0,
    max: 1,
    step: 0.1,
    unit: '',
  },
  {
    name: 'sepia',
    querySelector: document.querySelector('#effect-sepia'),
    filter: 'sepia',
    min: 0,
    max: 1,
    step: 0.1,
    unit: '',
  },
  {
    name: 'marvin',
    querySelector: document.querySelector('#effect-marvin'),
    filter: 'invert',
    min: 0,
    max: 100,
    step: 0.1,
    unit: '%',
  },
  {
    name: 'phobos',
    querySelector: document.querySelector('#effect-phobos'),
    filter: 'blur',
    min: 0,
    max: 3,
    step: 0.1,
    unit: 'px',
  },
  {
    name: 'heat',
    querySelector: document.querySelector('#effect-heat'),
    filter: 'brightness',
    min: 1,
    max: 3,
    step: 0.1,
    unit: '',
  },
];

const getPhotoId = createIdGenerator(OBJECT_COUNT);
const getPhotoUrlId = createIdGenerator(OBJECT_COUNT);
const getCommentId = createIdGenerator(1000);

function createCommentText() {
  if (getRandomInteger(1, 2) === 2) {
    return `${getRandomArrayElement(MESSAGES) } ${ getRandomArrayElement(MESSAGES)}`;
  }
  return getRandomArrayElement(MESSAGES);
}

function createCommentsList(){
  return {
    id: getCommentId(),
    avatar: `img/avatar-${ getRandomInteger(1, 6) }.svg`,
    message: createCommentText(),
    name: getRandomArrayElement(NAMES),
  };
}

function createPhoto(){
  return {
    id: getPhotoId(),
    url: `photos/${ getPhotoUrlId() }.jpg`,
    description: getRandomArrayElement(DESCRIPTIONS),
    likes: getRandomInteger(MIN_LIKES_NUMBER, MAX_LIKES_NUMBER),
    comments: Array.from({length: getRandomInteger(MIN_COMMENTS_NUMBER, MAX_COMMENTS_NUMBER)}, createCommentsList),
  };
}

const createPhotos = () => Array.from({length: OBJECT_COUNT}, createPhoto);

export {createPhotos, createCommentsList, EFFECTS};
