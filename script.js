const form = document.getElementById('todo-form');
const input = document.getElementById('todo-input');
const list = document.getElementById('todo-list');
const btn = document.querySelector('.addBtn');

let editMode = false;
let currentTask = null;

// Red Message Styles
input.addEventListener('invalid', e => {
  e.preventDefault();
  redMessage('You must add something');
  input.classList.add('redMessage');
});

input.addEventListener('input', () => {
  if (input.validity.valid) input.classList.remove('redMessage');
});

// Add Tasks
form.addEventListener('submit', e => {
  e.preventDefault();
  const taskText = input.value.trim();
  if (taskText === '') return;

  if (editMode) {
    currentTask.querySelector('span').textContent = taskText;
    btn.textContent = 'Add';
    editMode = false;
    currentTask = null;
    yellowMessage('Edited Task');
  } else {
    const listItem = document.createElement('li');
    listItem.className = 'listItem';

    const taskTextElement = document.createElement('span');
    taskTextElement.textContent = taskText;

    taskTextElement.addEventListener('click', () => {
      taskTextElement.style.textDecoration = taskTextElement.style.textDecoration === 'line-through' ? 'none' : 'line-through';
      saveTasks();
    });

    const editButton = createButton(
      'edit-button',
      `
      <svg class="svg-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fafafa" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M12 22h6a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v10"></path>
        <path d="M14 2v4a2 2 0 0 0 2 2h4"></path>
        <path d="M10.4 12.6a2 2 0 1 1 3 3L8 21l-4 1 1-4Z"></path>
      </svg>`,
      () => {
        editTask(taskTextElement, listItem);
      }
    );

    const deleteButton = createButton(
      'delete-button',
      `
      <svg class="svg-icon2" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fafafa" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M3 6h18"></path>
        <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
        <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
      </svg>`,
      () => {
        list.removeChild(listItem);
        saveTasks();
      }
    );

    listItem.append(taskTextElement, editButton, deleteButton);
    list.appendChild(listItem);
    greenMessage('Task Added');
  }
  input.value = '';
  saveTasks();
});

// Create Button
function createButton(className, innerHTML, clickHandler) {
  const button = document.createElement('button');
  button.className = className;
  button.innerHTML = innerHTML;
  button.addEventListener('click', clickHandler);
  return button;
}

// Edit Task
function editTask(taskTextElement, listItem) {
  input.value = taskTextElement.textContent;
  btn.textContent = 'Save';
  editMode = true;
  currentTask = listItem;
}

// Show Messages
function showMessage(type, message) {
  const existingMessage = document.querySelector(`.${type}`);
  existingMessage?.remove();

  const mss = document.createElement('p');
  mss.classList.add(type);
  mss.textContent = message;
  form.parentNode.insertBefore(mss, list);

  setTimeout(() => mss.remove(), type === 'redMessage' ? 3000 : 2000);
}

const greenMessage = message => showMessage('greenMessage', message);
const redMessage = message => showMessage('redMessage', message);
const yellowMessage = message => showMessage('yellowMessage', message);

// Save Tasks to LocalStorage
function saveTasks() {
  const tasks = Array.from(document.querySelectorAll('.listItem')).map(item => ({
    text: item.querySelector('span').textContent.trim(),
    completed: item.querySelector('span').style.textDecoration === 'line-through',
  }));
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Load Tasks from LocalStorage
document.addEventListener('DOMContentLoaded', () => {
  (JSON.parse(localStorage.getItem('tasks')) || []).forEach(task => {
    const listItem = document.createElement('li');
    listItem.className = 'listItem';

    const taskTextElement = document.createElement('span');
    taskTextElement.textContent = task.text;
    if (task.completed) taskTextElement.style.textDecoration = 'line-through';

    taskTextElement.addEventListener('click', () => {
      taskTextElement.style.textDecoration = taskTextElement.style.textDecoration === 'line-through' ? 'none' : 'line-through';
      saveTasks();
    });

    const editButton = createButton(
      'edit-button',
      `
      <svg class="svg-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fafafa" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M12 22h6a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v10"></path>
        <path d="M14 2v4a2 2 0 0 0 2 2h4"></path>
        <path d="M10.4 12.6a2 2 0 1 1 3 3L8 21l-4 1 1-4Z"></path>
      </svg>`,
      () => {
        editTask(taskTextElement, listItem);
      }
    );

    const deleteButton = createButton(
      'delete-button',
      `
      <svg class="svg-icon2" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fafafa" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M3 6h18"></path>
        <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
        <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
      </svg>`,
      () => {
        list.removeChild(listItem);
        saveTasks();
      }
    );

    listItem.append(taskTextElement, editButton, deleteButton);
    list.appendChild(listItem);
  });
});
