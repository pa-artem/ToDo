'use strict';

import 'normalize.css';

function taskHtml(text, onDelete, onChecked) {
  const root = document.createElement('div');
  root.classList.add('task');

  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.addEventListener('click', onChecked);
  root.appendChild(checkbox);

  const taskText = document.createElement('span');
  taskText.classList.add('task-text');
  taskText.textContent = text;
  root.appendChild(taskText);

  const deleteButton = document.createElement('button');
  deleteButton.classList.add('delete-button', 'btn');
  deleteButton.addEventListener('click', onDelete);
  deleteButton.textContent = '❌';
  root.appendChild(deleteButton);

  return root;
}

const tasksList = document.querySelector('.list');
tasksList.appendChild(taskHtml('test'));
tasksList.appendChild(taskHtml('test'));
tasksList.appendChild(taskHtml('test'));
tasksList.appendChild(taskHtml('test'));
