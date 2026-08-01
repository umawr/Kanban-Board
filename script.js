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

const numberDisplays = {
  toDo: document.querySelector('.numberToDo'),
  inProgress: document.querySelector('.numberInProgress'),
  completed: document.querySelector('.numberCompleted'),
};

const counts = {
  toDo: 0,
  inProgress: 0,
  completed: 0,
};

function updateDisplay(category) {
  numberDisplays[category].textContent = `${counts[category]}`;
}

function createTaskElement(category) {
  const newTask = document.createElement('div');
  newTask.classList.add('task');
  newTask.dataset.category = category;

  newTask.innerHTML = `
    <div class="up-bar">
       <p class="task-number">1.</p>
      <button class="trash-button">
        <span class="material-symbols-outlined icon">delete</span>
      </button>
    </div>
    <textarea placeholder="type here..." class="text" rows="1"></textarea>
    <div class="activity-bar">
      <button class="flag-button">
        <span class="material-symbols-outlined icon">flag</span>
      </button>
      <div class="date-bar">
        <span class="material-symbols-outlined icon">alarm</span>
        <textarea class="date" rows ="1" placeholder ="4 Oct"></textarea>
      </div>
    </div>
  `;

  const textEntered = newTask.querySelector('.text');

  textEntered.addEventListener('input', function () {
    this.style.height = 'auto';
    this.style.height = this.scrollHeight + 'px';
  });

  const trashButton = newTask.querySelector('.trash-button');

  trashButton.addEventListener('click', () => {
    newTask.remove();
    counts[category] = Math.max(0, counts[category] - 1);
    updateDisplay(category);
  });

  return newTask;
}

const toggleButton = document.querySelector('.toggle-button');

toggleButton.addEventListener('click', () => {
  document.body.classList.toggle('invert-color');

  const isDark = document.body.classList.contains('invert-color');
});

Object.keys(addButtons).forEach(category => {
  addButtons[category].addEventListener('click', () => {
    const task = createTaskElement(category);
    containers[category].appendChild(task);

    counts[category] += 1;
    updateDisplay(category);
  });
});
