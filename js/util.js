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

const getRandomArrayElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];

const REMOVE_MESSAGE_TIMEOUT = 5000;
const errorLoadDataTemplate = document.querySelector('#data-error').content;

function showErrorMessage(message) {
  const errorArea = errorLoadDataTemplate.cloneNode(true);
  if(message) {
    errorArea.querySelector('.data-error__title').textContent = message;
  }
  document.body.append(errorArea);

  const errorLoadDataArea = document.body.querySelector('.data-error');

  setTimeout(()=>{
    errorLoadDataArea.remove();
  }, REMOVE_MESSAGE_TIMEOUT);
}

export {createIdGenerator, getRandomArrayElement, getRandomInteger, showErrorMessage};
