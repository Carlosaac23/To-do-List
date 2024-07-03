const form = document.getElementById('todo-form');
const input = document.getElementById('todo-input');
const list = document.getElementById('todo-list');

form.addEventListener('submit', function (e) {
  e.preventDefault();

  const taskText = input.value.trim();
  if (taskText === '') return;

  const listItem = document.createElement('li');
  listItem.textContent = taskText;
  listItem.className = 'listItem';

  const deleteButton = document.createElement('button');
  deleteButton.textContent = 'Delete';
  deleteButton.className = 'deleteBtn';
  deleteButton.addEventListener('click', function () {
    list.removeChild(listItem);
  });
  listItem.appendChild(deleteButton);

  list.appendChild(listItem);

  input.value = '';
});
