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

function createTaskElement() {
  const newTask = document.createElement('div');
  newTask.classList.add('task');

  newTask.innerHTML = `
                <div class="up-bar">
                   <p class="task-number">.</p>
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

  const trashButton = newTask.querySelector('.trash-button');

  trashButton.addEventListener('click', () => {
    newTask.remove();
  });

  return newTask;
}

function addTask(container) {
  const newTask = createTaskElement();
  container.appendChild(newTask);
}

addButtons.toDo.addEventListener('click', () => addTask(containers.toDo));
addButtons.inProgress.addEventListener('click', () =>
  addTask(containers.inProgress),
);
addButtons.completed.addEventListener('click', () =>
  addTask(containers.completed),
);

setupCounter('.add-button-to-do', '.numberToDo');
setupCounter('.add-button-completed', '.numberCompleted');
setupCounter('.add-button-in-progress', '.numberInProgress');

function setupCounter(buttonSelector, numberSelector) {
  const button = document.querySelector(buttonSelector);
  const numberDisplay = document.querySelector(numberSelector);
  let count = 0;
  button.addEventListener('click', function () {
    count += 1;
    numberDisplay.textContent = `#${count}`;
  });
}
