import throttle from 'lodash.throttle';

const form = document.querySelector('.feedback-form');
const input = document.querySelector('.feedback-form input');
const textarea = document.querySelector('.feedback-form textarea');

const KEY_FORM = 'feedback-form-state';
const UPDATE_TIME = 500;

const defaultData = { email: '', message: '' };
let data = JSON.parse(window.localStorage.getItem(KEY_FORM)) ?? defaultData;

form.addEventListener('submit', handlerSubmit);
input.addEventListener('input', handlerEmail);
textarea.addEventListener('input', handlerMessage);

const throttleSaveToLS = throttle(saveToLocalStorage, UPDATE_TIME);

function saveToLocalStorage(key, value) {
  if (key) {
    data[key] = value;
    window.localStorage.setItem(KEY_FORM, JSON.stringify(data));
  } else window.localStorage.removeItem(KEY_FORM);
}

function handlerEmail(evt) {
  throttleSaveToLS('email', evt.target.value);
}
function handlerMessage(evt) {
  throttleSaveToLS('message', evt.target.value);
}

function handlerSubmit(evt) {
  evt.preventDefault();
  console.log(data);
  resetForm(evt);
}

function resetForm() {
  form.reset();
  saveToLocalStorage('');
  data = defaultData;
}

function getPrevData() {
  const prevData = JSON.parse(window.localStorage.getItem(KEY_FORM));
  if (!prevData) return;
  input.value = prevData.email;
  textarea.value = prevData.message;
}

getPrevData();
