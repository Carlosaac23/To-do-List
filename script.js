const form = document.getElementById('todo-form');
const input = document.getElementById('todo-input');
const list = document.getElementById('todo-list');
const btn = document.querySelector('.addBtn');

let editMode = false;
let currentTask = null;

// Add Tasks
form.addEventListener('submit', function (e) {
  e.preventDefault();

  const taskText = input.value.trim();
  if (taskText === '') return redMessage('You must add something');

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

    const editButton = document.createElement('button');
    editButton.className = 'edit-button';
    editButton.innerHTML = `
              <svg
                class="svg-icon"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#fafafa"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path d="M12 22h6a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v10"></path>
                <path d="M14 2v4a2 2 0 0 0 2 2h4"></path>
                <path d="M10.4 12.6a2 2 0 1 1 3 3L8 21l-4 1 1-4Z"></path>
              </svg>
           `;
    editButton.addEventListener('click', () => {
      editTask(taskTextElement, listItem);
    });

    const deleteButton = document.createElement('button');
    deleteButton.className = 'delete-button';
    deleteButton.innerHTML = `
              <svg
                class="svg-icon2"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#fafafa"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path d="M3 6h18"></path>
                <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
                <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
              </svg>
            `;
    deleteButton.addEventListener('click', () => {
      list.removeChild(listItem);
    });

    listItem.appendChild(taskTextElement);
    listItem.appendChild(editButton);
    listItem.appendChild(deleteButton);

    list.appendChild(listItem);

    greenMessage('Task Added');
  }
  input.value = '';
  saveTasks();
});

// Edit Task
function editTask(taskTextElement, listItem) {
  input.value = taskTextElement.textContent;
  btn.textContent = 'Save';
  editMode = true;
  currentTask = listItem;
}

// Show Green Message
function greenMessage(message) {
  const advanceWarning = document.querySelector('.greenMessage');
  advanceWarning?.remove();

  const mss = document.createElement('p');
  mss.classList.add('greenMessage');
  mss.textContent = message;
  form.parentNode.insertBefore(mss, list);

  setTimeout(() => {
    mss.remove();
  }, 2000);
}

// Show Red Message
function redMessage(message) {
  const advanceWarning = document.querySelector('.redMessage');
  advanceWarning?.remove();

  const mss = document.createElement('p');
  mss.classList.add('redMessage');
  mss.textContent = message;
  form.parentNode.insertBefore(mss, list);

  setTimeout(() => {
    mss.remove();
  }, 3000);
}

// Show Yellow Message
function yellowMessage(message) {
  const advanceWarning = document.querySelector('.yellowMessage');
  advanceWarning?.remove();

  const mss = document.createElement('p');
  mss.classList.add('yellowMessage');
  mss.textContent = message;
  form.parentNode.insertBefore(mss, list);

  setTimeout(() => {
    mss.remove();
  }, 2000);
}

// Save Tasks on LocalStorage
function saveTasks() {
  const tasks = [];
  document.querySelectorAll('.listItem').forEach(item => {
    const taskTextElement = item.querySelector('span');
    const task = {
      text: taskTextElement.textContent.trim(),
      completed: taskTextElement.style.textDecoration === 'line-through',
    };
    tasks.push(task);
  });
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

document.addEventListener('DOMContentLoaded', loadTasks);

// Delete Tasks
function loadTasks() {
  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];

  tasks.forEach(task => {
    const listItem = document.createElement('li');
    listItem.className = 'listItem';

    const taskTextElement = document.createElement('span');
    taskTextElement.textContent = task.text;
    if (task.completed) taskTextElement.style.textDecoration = 'line-through';

    taskTextElement.addEventListener('click', () => {
      taskTextElement.style.textDecoration = taskTextElement.style.textDecoration === 'line-through' ? 'none' : 'line-through';
      saveTasks();
    });

    const editButton = document.createElement('button');
    editButton.className = 'edit-button';
    editButton.innerHTML = `
              <svg
                class="svg-icon"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#fafafa"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path d="M12 22h6a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v10"></path>
                <path d="M14 2v4a2 2 0 0 0 2 2h4"></path>
                <path d="M10.4 12.6a2 2 0 1 1 3 3L8 21l-4 1 1-4Z"></path>
              </svg>
            `;
    editButton.addEventListener('click', () => {
      editTask(taskTextElement, listItem);
    });

    const deleteButton = document.createElement('button');
    deleteButton.className = 'delete-button';
    deleteButton.innerHTML = `
              <svg
                class="svg-icon2"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#fafafa"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path d="M3 6h18"></path>
                <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
                <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
              </svg>
          `;
    deleteButton.addEventListener('click', () => {
      list.removeChild(listItem);
      saveTasks();
    });

    listItem.appendChild(taskTextElement);
    listItem.appendChild(editButton);
    listItem.appendChild(deleteButton);

    list.appendChild(listItem);
  });
}
