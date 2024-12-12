import { renderFullPhoto } from './renderFullPhoto.js';
import { renderFullPhoto } from './renderFullPhoto.js';

const miniatureTemplate = document.querySelector('#picture')
  .content
  .querySelector('.picture');
const miniatureList = document.querySelector('.pictures');
const miniatureListFragment = document.createDocumentFragment();

const createPhoto = (photo) => {
  const pictureFrame = miniatureTemplate.cloneNode(true);
  pictureFrame.querySelector('.picture__img').src = photo.url;
  pictureFrame.querySelector('.picture__img').alt = photo.description;
  pictureFrame.querySelector('.picture__likes').textContent = photo.likes;
  pictureFrame.querySelector('.picture__comments').textContent = photo.comments.length;

  pictureFrame.onclick = function () {
    renderFullPhoto(photo);
    renderFullPhoto(photo);
  };

  return pictureFrame;
};

const createPhotoFeed = (photos) => {
  document.querySelectorAll('.picture').forEach((element) => element.remove());

  photos.forEach((element) => {
    const createElement = createPhoto(element);
    miniatureListFragment.appendChild(createElement);
  });

  miniatureList.append(miniatureListFragment);
};

let pictures = [];

const onContainerClick = (evt) => {
  const thumbnail = evt.target.closest('data-thumbnail-id');

  if(!thumbnail) {
    return;
  }

  evt.preventDefault();
  const picture = pictures.find((item) => item.id === +thumbnail.dataset.thumbnailId
  );

  renderFullPhoto(picture);
};

const renderGallery = (currentPhotos) => {
  pictures = currentPhotos;
  createPhotoFeed(pictures);
  miniatureList.addEventListener('click', onContainerClick);
};

export {createPhotoFeed, renderGallery};
