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

function getRandomInteger(a, b) {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
}

function createIdGenerator(max) {
  const ids = new Set();

  return function getUniqueId() {
    const id = getRandomInteger(1, max);
    if(ids.has(id)){
      return getUniqueId();
    }
    ids.add(id);
    return id;
  };
}

const getPhotoId = createIdGenerator(OBJECT_COUNT);
const getPhotoUrlId = createIdGenerator(OBJECT_COUNT);
const getCommentId = createIdGenerator(1000);

const getRandomArrayElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];

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

const photos = Array.from({length: OBJECT_COUNT}, createPhoto);

