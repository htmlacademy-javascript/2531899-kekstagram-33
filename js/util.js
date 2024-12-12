const REMOVE_MESSAGE_TIMEOUT = 5000;
const DEBOUNCE_TIME = 500;

const errorLoadDataTemplate = document.querySelector('#data-error').content;

const showErrorMessage = (message) => {
  const errorArea = errorLoadDataTemplate.cloneNode(true);
  if(message) {
    errorArea.querySelector('.data-error__title').textContent = message;
  }
  document.body.append(errorArea);

  const errorLoadDataArea = document.body.querySelector('.data-error');

  setTimeout(()=>{
    errorLoadDataArea.remove();
  }, REMOVE_MESSAGE_TIMEOUT);
};

const debounce = (callback, timeoutDelay = DEBOUNCE_TIME) => {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};

export { showErrorMessage, debounce};
