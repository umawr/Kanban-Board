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

// Global renumbering function across all cards currently in the DOM
function renumberCards() {
  const allCards = document.querySelectorAll('.task');
  allCards.forEach((card, index) => {
    const numberElement = card.querySelector('.task-number');
    if (numberElement) {
      numberElement.textContent = `${index + 1}.`;
    }
  });
}

function createTaskElement(category) {
  const newTask = document.createElement('div');
  newTask.classList.add('task');
  newTask.dataset.category = category;

  newTask.innerHTML = `
    <div class="up-bar">
       <p class="task-number"></p>
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
        <textarea class="date" rows="1" placeholder="4 Oct"></textarea>
      </div>
    </div>
  `;

  // Auto-resize textarea logic
  const textEntered = newTask.querySelector('.text');
  textEntered.addEventListener('input', function () {
    this.style.height = 'auto';
    this.style.height = this.scrollHeight + 'px';
  });

  // Single combined delete button listener
  const deleteButton = newTask.querySelector('.trash-button');
  deleteButton.addEventListener('click', () => {
    newTask.remove();
    counts[category] = Math.max(0, counts[category] - 1);
    updateDisplay(category);
    renumberCards(); // Update task numbers after removal
  });

  return newTask;
}

// Dark Mode Toggle
const toggleButton = document.querySelector('.toggle-button');
if (toggleButton) {
  toggleButton.addEventListener('click', () => {
    document.body.classList.toggle('invert-color');
  });
}

// Add Task Button Handlers
Object.keys(addButtons).forEach(category => {
  if (addButtons[category]) {
    addButtons[category].addEventListener('click', () => {
      const task = createTaskElement(category);
      containers[category].appendChild(task);

      counts[category] += 1;
      updateDisplay(category);
      renumberCards(); // Update task numbers when new card is added
    });
  }
});
