const COMMENTS_STEP = 5;
const fullPictureWindow = document.querySelector('.big-picture');
const commentSection = fullPictureWindow.querySelector('.social__comments');
const loadButton = fullPictureWindow.querySelector('.comments-loader');
const shownComments = fullPictureWindow.querySelector('.social__comment-shown-count');
const totalComments = fullPictureWindow.querySelector('.social__comment-total-count');

function createNewComment(commentInfo) {
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
}

function renderComments(comments) {
  commentSection.innerHTML = '';

  const photoComments = [];
  for(let i = 0; i < comments.length; i++) {
    photoComments[i] = createNewComment(comments[i]);
  }

  let commentsCount = 0;
  loadComments();

  loadButton.addEventListener('click', () => {
    loadComments();
  });

  totalComments.textContent = comments.length;

  function loadComments() {
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
  }
}

export {renderComments};
