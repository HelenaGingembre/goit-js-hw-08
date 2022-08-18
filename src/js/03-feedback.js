//Напиши скрипт который будет сохранять значения полей в локальное хранилище
// когда пользователь что - то печатает.
import throttle from 'lodash.throttle';

// Пусть ключом для хранилища будет строка "feedback-form-state".
const FEEDBACK_STORAGE_KEY = 'feedback-form-state';


//1.Отслеживай на форме событие input, и каждый раз записывай в локальное 
//хранилище объект с полями email и message, в которых сохраняй текущие
// значения полей формы.
const form = document.querySelector('.feedback-form');
const emailInput = document.querySelector('input');
const messageTextarea = document.querySelector('textarea');

const formData = {};

form.addEventListener('input', throttle(onInputForm, 500));
form.addEventListener('submit', onFormSubmit);

onCheckForm(); //вызов функции - проверки при загрузке страницы состояния хранилища

function onTakeInputValue() {
  formData.email = emailInput.value;
  formData.message = messageTextarea.value;
}

function onInputForm() {

  onTakeInputValue();
  localStorage.setItem(FEEDBACK_STORAGE_KEY, JSON.stringify(formData));
}

//При загрузке страницы проверяй состояние хранилища, и если там есть сохраненные
//данные, заполняй ими поля формы.В противном случае поля должны быть пустыми.
function onCheckForm() {
  const savedData = localStorage.getItem(FEEDBACK_STORAGE_KEY);

    if (savedData) {
      //если есть уже ранее введеные данные
    const { email, message } = JSON.parse(savedData);
    messageTextarea.value = message;
    emailInput.value = email;
  }
}


//При сабмите формы очищай хранилище и поля формы, а также выводи
// объект с полями email, message и текущими их значениями в консоль.
function onFormSubmit(event) {
    event.preventDefault();

  if (emailInput.value === '' || messageTextarea.value === '') {
    alert('All fields must be filled!');
  } else {
    onTakeInputValue();
    
    console.log(formData);
    //При сабмите формы очищай хранилище и поля формы
    event.currentTarget.reset();
    localStorage.removeItem(FEEDBACK_STORAGE_KEY);
  }
}