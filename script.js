const form = document.getElementById('todo-form');
const input = document.getElementById('todo-input');
const list = document.getElementById('todo-list');

const container = document.querySelector('.container');

form.addEventListener('submit', function (e) {
  e.preventDefault();

  input.value === '' ? alertMessage('You must add something') : addedMessage('Task added successfully');

  const taskText = input.value.trim();
  if (taskText === '') return;

  const listItem = document.createElement('LI');
  listItem.textContent = taskText;
  listItem.className = 'listItem';

  const deleteButton = document.createElement('BUTTON');
  deleteButton.textContent = 'Delete';
  deleteButton.className = 'deleteBtn';
  deleteButton.addEventListener('click', function () {
    list.removeChild(listItem);
  });
  listItem.appendChild(deleteButton);

  list.appendChild(listItem);

  input.value = '';
  saveTasks();
});

function addedMessage(message) {
  const advanceWarning = document.querySelector('.addedMessage');
  advanceWarning?.remove();

  const alertMss = document.createElement('p');
  alertMss.classList.add('addedMessage');
  alertMss.textContent = message;
  container.appendChild(alertMss);

  setTimeout(() => {
    alertMss.remove();
  }, 2000);
}

function alertMessage(message) {
  const advanceWarning = document.querySelector('.alertMessage');
  advanceWarning?.remove();

  const alertMss = document.createElement('p');
  alertMss.classList.add('alertMessage');
  alertMss.textContent = message;
  container.appendChild(alertMss);

  setTimeout(() => {
    alertMss.remove();
  }, 3000);
}

document.addEventListener('DOMContentLoaded', loadTasks);

function saveTasks() {
  const tasks = [];
  document.querySelectorAll('.listItem').forEach(item => {
    tasks.push(item.textContent.replace('Delete', '').trim());
  });
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  tasks.forEach(taskText => {
    const listItem = document.createElement('LI');
    listItem.textContent = taskText;
    listItem.className = 'listItem';

    const deleteButton = document.createElement('BUTTON');
    deleteButton.textContent = 'Delete';
    deleteButton.className = 'deleteBtn';
    deleteButton.addEventListener('click', function () {
      list.removeChild(listItem);
      saveTasks();
    });
    listItem.appendChild(deleteButton);

    list.appendChild(listItem);
  });
}
