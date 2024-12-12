const COMMENTS_STEP = 5;

const fullPictureWindow = document.querySelector('.big-picture');
const fullPictureWindowClose = document.querySelector('.big-picture__cancel');
const commentSection = fullPictureWindow.querySelector('.social__comments');
const loadButton = fullPictureWindow.querySelector('.comments-loader');
const shownComments = fullPictureWindow.querySelector('.social__comment-shown-count');
const totalComments = fullPictureWindow.querySelector('.social__comment-total-count');

const closeModal = () => {
  fullPictureWindow.classList.add('hidden');
  document.body.classList.remove('modal-open');
  loadButton.onclick = null;
};

fullPictureWindowClose.addEventListener('click', () => {
  closeModal();
});

document.addEventListener('keydown', (evt) => {
  if(evt.key === 'Escape') {
    closeModal();
  }
});

const createNewComment = (commentInfo) => {
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
  return newComment;
};

const renderComments = (comments) => {
  commentSection.innerHTML = '';

  const photoComments = [];
  for(let i = 0; i < comments.length; i++) {
    photoComments[i] = createNewComment(comments[i]);
  }

  let commentsCount = 0;

  const loadComments = () => {
    let i = commentsCount;
    commentsCount += COMMENTS_STEP;

    if (commentsCount > comments.length) {
      commentsCount = comments.length;
    }
    shownComments.textContent = commentsCount;

    for (; i < commentsCount; i++) {
      commentSection.append(photoComments[i]);
    }

    if (commentsCount >= comments.length) {
      loadButton.classList.add('hidden');
    } else {
      loadButton.classList.remove('hidden');
    }
  };

  loadComments();

  loadButton.onclick = loadComments;
  totalComments.textContent = comments.length;
};

const renderFullPhoto = (photo) => {
  fullPictureWindow.classList.remove('hidden');
  document.body.classList.add('modal-open');

  fullPictureWindow.querySelector('.big-picture__img').querySelector('img').src = photo.url;
  fullPictureWindow.querySelector('.likes-count').textContent = photo.likes;
  fullPictureWindow.querySelector('.social__caption').textContent = photo.description;
  fullPictureWindow.querySelector('.social__comment-total-count').textContent = photo.comments.length;

  renderComments(photo.comments);
};

export { renderFullPhoto };
