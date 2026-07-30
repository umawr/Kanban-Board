'use strict';

const addButtons = {
  toDo: document.querySelector('.add-button-to-do'),
  inProgress: document.querySelector('.add-button-in-progress'),
  completed: document.querySelector('.add-button-completed'),
};

const containers = {
  toDo: document.querySelector('.to-do'),
  inProgress: document.querySelector('.in-progress'),
  completed: document.querySelector('.completed'),
};

let taskCount = 0;

function createTaskElement(number) {
  const newTask = document.createElement('div');
  newTask.classList.add('task');

  newTask.innerHTML = `
                <div class="up-bar">
                  <p class="task-number">${number}.</p>
                  <button class="trash-button">
                    <span class="material-symbols-outlined icon">delete</span>
                  </button>
                </div>
                <p class="text">This is a sample task description.</p>
                <div class="activity-bar">
                  <button class="flag-button">
                    <span class="material-symbols-outlined icon">flag</span>
                  </button>
                  <div class="time-bar">
                    <span class="material-symbols-outlined icon">alarm</span>
                    <p class="time">12:00 PM</p>
                  </div>
                </div>
            `;

  return newTask;
}

function addTask(container) {
  taskCount++;
  const newTask = createTaskElement(taskCount);
  container.appendChild(newTask);
  document.querySelector('.number').innerHTML = `#${taskCount}`;
}

addButtons.toDo.addEventListener('click', () => addTask(containers.toDo));
addButtons.inProgress.addEventListener('click', () =>
  addTask(containers.inProgress),
);
addButtons.completed.addEventListener('click', () =>
  addTask(containers.completed),
);
