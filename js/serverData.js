const BASE_URL = 'https://32.javascript.htmlacademy.pro/kekstagram';

const Route = {
  GET_DATA: '/data',
  SEND_DATA: '/',
};

const Method = {
  GET: 'GET',
  POST: 'POST',
};

const ErrorMessageText = {
  [Method.GET]: 'Не удалось загрузить данные, попробуйте ещё раз',
  [Method.POST]: 'Не удалось отправить данные формы, попробуйте ещё раз',
};

async function load(route, method = Method.GET, body = null) {
  const response = await fetch(`${BASE_URL}${route}`, { method, body });
  return (response.ok ? await response.json() : Promise.reject({ message: ErrorMessageText[method], status: response.status }));
}

async function getData() {
  return await load(Route.GET_DATA);
}

async function sendData(body) {
  return await load(Route.SEND_DATA, Method.POST, body);
}

export { getData, sendData };
