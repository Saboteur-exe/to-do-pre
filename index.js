let items = [
  'Сделать проектную работу',
  'Полить цветы',
  'Пройти туториал по Реакту',
  'Сделать фронт для своего проекта',
  'Прогуляться по улице в солнечный день',
  'Помыть посуду'
];

const listElement = document.querySelector('.to-do__list');
const formElement = document.querySelector('.to-do__form');
const inputElement = document.querySelector('.to-do__input');
const templateElement = document.querySelector('#to-do__item-template');

function getTasksFromDOM() {
  const itemsNamesElements = document.querySelectorAll('.to-do__item-text');
  const tasks = [];

  itemsNamesElements.forEach((item) => tasks.push(item.textContent));

  return tasks;
}

function saveTasks(tasks) {
  localStorage.setItem('todo-tasks', JSON.stringify(tasks));
}

function loadTasks() {
  const storedTasks = localStorage.getItem('todo-tasks');

  if (storedTasks) return JSON.parse(storedTasks);

  return items;
}

function createItem(item) {
  const clone = templateElement.content
    .querySelector('.to-do__item')
    .cloneNode(true);
  
  const textElement = clone.querySelector('.to-do__item-text');
  const deleteButton = clone.querySelector('.to-do__item-button_type_delete');
  const duplicateButton = clone.querySelector('.to-do__item-button_type_duplicate');
  const editButton = clone.querySelector('.to-do__item-button_type_edit');

  textElement.textContent = item;

  deleteButton.addEventListener('click', () => {
    clone.remove();

    const currentTasks = getTasksFromDOM();

    saveTasks(currentTasks);
  });

  duplicateButton.addEventListener('click', () => {
    const originalText = textElement.textContent;
    const newItem = createItem(originalText);

    listElement.prepend(newItem);
    
    const currentTasks = getTasksFromDOM();

    saveTasks(currentTasks);
  });

  editButton.addEventListener('click', () => {
    textElement.setAttribute('contenteditable', 'true');
    textElement.focus();
  });

  textElement.addEventListener('blur', () => {
    textElement.setAttribute('contenteditable', 'false');

    const currentTasks = getTasksFromDOM();

    saveTasks(currentTasks);
  });

  return clone;
}

function handleFormSubmit(evt) {
  evt.preventDefault();

  const taskText = inputElement.value;
  const newItem = createItem(taskText);

  listElement.prepend(newItem);

  inputElement.value = '';

  const currentTasks = getTasksFromDOM();

  saveTasks(currentTasks);
}

items = loadTasks();

items.forEach((item) => {
  const newItem = createItem(item);
  
  listElement.append(newItem);
});

formElement.addEventListener('submit', handleFormSubmit);
