import { createPhotos } from './data';

const miniatureTemplate = document.querySelector('#picture')
  .content
  .querySelector('.picture');
const miniatureList = document.querySelector('.pictures');

const photoFeed = createPhotos();

const miniatureListFragment = document.createDocumentFragment();

const createPhotoFeed = function(photo) {
  const pictureFrame = miniatureTemplate.cloneNode(true);
  pictureFrame.querySelector('.picture__img').src = photo.url;
  pictureFrame.querySelector('.picture__img').alt = photo.description;
  pictureFrame.querySelector('.picture__likes').textContent = photo.likes;
  pictureFrame.querySelector('.picture__comments').textContent = photo.comments.length;
  miniatureListFragment.append(pictureFrame);
};

photoFeed.forEach(createPhotoFeed);

miniatureList.append(miniatureListFragment);
