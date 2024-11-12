/*
В файле main.js напишите необходимые функции для создания массива из 25 сгенерированных объектов. Каждый объект массива — описание фотографии, опубликованной пользователем.

Структура каждого объекта должна быть следующей:

    id, число — идентификатор опубликованной фотографии. Это число от 1 до 25. Идентификаторы не должны повторяться.

    url, строка — адрес картинки вида photos/{{i}}.jpg, где {{i}} — это число от 1 до 25. Адреса картинок не должны повторяться.

    description, строка — описание фотографии. Описание придумайте самостоятельно.

    likes, число — количество лайков, поставленных фотографии. Случайное число от 15 до 200.

    comments, массив объектов — список комментариев, оставленных другими пользователями к этой фотографии. Количество комментариев к каждой фотографии — случайное число от 0 до 30. Все комментарии генерируются случайным образом. Пример описания объекта с комментарием:

    {
      id: 135,
      avatar: 'img/avatar-6.svg',
      message: 'В целом всё неплохо. Но не всё.',
      name: 'Артём',
    }

У каждого комментария есть идентификатор — id — любое число. Идентификаторы не должны повторяться.

Поле avatar — это строка, значение которой формируется по правилу img/avatar-{{случайное число от 1 до 6}}.svg. Аватарки подготовлены в директории img.

Для формирования текста комментария — message — вам необходимо взять одно или два случайных предложения из представленных ниже:

Всё отлично!
В целом всё неплохо. Но не всё.
Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.
Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.
Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.
Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!

Имена авторов также должны быть случайными. Набор имён для комментаторов составьте сами. Подставляйте случайное имя в поле name.
*/

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

console.log(photos);
