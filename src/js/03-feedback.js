//Напиши скрипт который будет сохранять значения полей в локальное хранилище
// когда пользователь что - то печатает.
import throttle from 'lodash.throttle';

const FEEDBACK_STORAGE_KEY = 'feedback-form-state';