'use strict';

import 'normalize.css';

function taskHtml(text, onDelete, onChecked) {
  const root = document.createElement('div');
  root.classList.add('task');

  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.addEventListener('click', e => onChecked(e, root));
  root.appendChild(checkbox);

  const taskText = document.createElement('span');
  taskText.classList.add('task-text');
  taskText.textContent = text;
  root.appendChild(taskText);

  const deleteButton = document.createElement('button');
  deleteButton.classList.add('delete-button', 'btn');
  deleteButton.addEventListener('click', e => onDelete(e, root));
  deleteButton.textContent = '❌';
  root.appendChild(deleteButton);

  return root;
}

const tasksList = document.querySelector('.list');
const tasks = [];
const filterSelector = document.querySelector('select.filter');

const tasksPlaceholder = document.createElement('div');
tasksPlaceholder.textContent = 'No tasks here yet...';
tasksPlaceholder.classList.add('tasks-placeholder');

function displayTasks() {
  while (tasksList.firstChild) {
    tasksList.removeChild(tasksList.firstChild);
  }
  const filtered = tasks.filter(task =>
    filterSelector.value === 'task' ||
    filterSelector.value === 'unsuccess' && !task.classList.contains('completed') ||
    filterSelector.value === 'success' && task.classList.contains('completed'));
  filtered.forEach(task => tasksList.appendChild(task));

  if (filtered.length === 0) {
    tasksList.appendChild(tasksPlaceholder);
  }
}

displayTasks();

const onTaskCheck = (e, task) => {
  task.classList.toggle('completed');
  displayTasks();
};

const onTaskDelete = (e, task) => {
  const i = tasks.indexOf(task);
  if (i >= 0) {
    tasks.splice(i, 1);
  }
  displayTasks();
};

const taskTextInput = document.querySelector('input.field');
const addTaskButton = document.querySelector('button.add');

function addTask() {
  const taskText = taskTextInput.value.trim();
  if (taskText === '') {
    return;
  }
  const task = taskHtml(taskText, onTaskDelete, onTaskCheck);
  tasks.push(task);
  taskTextInput.value = '';
  displayTasks();
}

addTaskButton.addEventListener('click', addTask);
taskTextInput.addEventListener('keyup', ({ key }) => {
  if (key === 'Enter') {
    addTask();
  }
});

filterSelector.addEventListener('input', () => {
  displayTasks();
});
