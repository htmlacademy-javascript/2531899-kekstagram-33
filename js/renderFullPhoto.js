import { createCommentsList } from './data.js';

const photoMiniatureContainer = document.querySelector('.pictures');
const fullPictureWindow = document.querySelector('.big-picture');
const fullPictureWindowClose = document.querySelector('.big-picture__cancel');
const commentSection = document.querySelector('.social__comments');

photoMiniatureContainer.addEventListener('click', (evt) =>{
  if(evt.target.matches('img')) {
    fullPictureWindow.classList.remove('hidden');
    document.body.classList.add('modal-open');
    fullPictureWindow.querySelector('.social__comment-count').classList.add('hidden');
    fullPictureWindow.querySelector('.comments-loader').classList.add('hidden');
    getPictureInfo(evt.target.parentElement);
    commentSection.innerHTML = '';
    for(let i = 0; i < evt.target.parentElement.querySelector('.picture__comments').textContent; i++) {
      createNewComment();
    }
  }
});

fullPictureWindowClose.addEventListener('click', () => {
  fullPictureWindow.classList.add('hidden');
  document.body.classList.remove('modal-open');
});

document.addEventListener('keydown', (evt) => {
  if(evt.key === 'Escape') {
    fullPictureWindow.classList.add('hidden');
    document.body.classList.remove('modal-open');
  }
});

function getPictureInfo(photo) {
  fullPictureWindow.querySelector('.big-picture__img').querySelector('img').src = photo.querySelector('.picture__img').src;
  fullPictureWindow.querySelector('.likes-count').textContent = photo.querySelector('.picture__likes').textContent;
  // fullPictureWindow.querySelector('.social__comment-shown-count').textContent = photo.querySelector('.picture__comments').textContent;
  fullPictureWindow.querySelector('.social__comment-total-count').textContent = photo.querySelector('.picture__comments').textContent;
  fullPictureWindow.querySelector('.social__caption').textContent = photo.querySelector('.picture__img').alt;
}

function createNewComment() {
  const commentInfo = createCommentsList();

  const newComment = document.createElement('li');
  newComment.classList.add('social__comment');

  const commentUserpic = document.createElement('img');
  commentUserpic.classList.add('social__picture');
  commentUserpic.src = commentInfo.avatar;
  commentUserpic.alt = commentInfo.name;
  commentUserpic.width = 35;
  commentUserpic.height = 35;

  const commentText = document.createElement('p');
  commentText.classList.add('social__text');
  commentText.textContent = commentInfo.message;

  newComment.append(commentUserpic);
  newComment.append(commentText);
  commentSection.append(newComment);
}
