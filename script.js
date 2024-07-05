const form = document.getElementById('todo-form');
const input = document.getElementById('todo-input');
const list = document.getElementById('todo-list');

form.addEventListener('submit', function (e) {
  e.preventDefault();

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

document.addEventListener('DOMContentLoaded', loadTasks);

function saveTasks() {
  const tasks = [];
  document.querySelectorAll('.listItem').forEach((item) => {
    tasks.push(item.textContent.replace('Delete', '').trim());
  });
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  tasks.forEach((taskText) => {
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
