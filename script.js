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

// Renumbers cards independently per column
function renumberCards() {
  Object.keys(containers).forEach(category => {
    const container = containers[category];
    if (!container) return;

    const columnCards = container.querySelectorAll('.task');

    columnCards.forEach((card, index) => {
      const numberElement = card.querySelector('.task-number');
      if (numberElement) {
        numberElement.textContent = `${index + 1}.`;
      }
    });
  });
}
let selectedCard = null;

const dropBoxes = document.querySelectorAll('.to-do, .in-progress, .completed');

dropBoxes.forEach(box => {
  box.addEventListener('dragover', e => {
    e.preventDefault();
  });

  box.addEventListener('drop', e => {
    e.preventDefault();
    if (selectedCard) {
      box.appendChild(selectedCard);
    }
  });
});

// Task Creator
function createTaskElement(category) {
  const newTask = document.createElement('div');
  newTask.classList.add('task');
  newTask.dataset.category = category;

  newTask.setAttribute('draggable', 'true');

  newTask.innerHTML = `
   <div class="card">
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
    </div>
  `;

  // Drag nad Drop
  newTask.addEventListener('dragstart', e => {
    if (['TEXTAREA', 'BUTTON', 'SPAN'].includes(e.target.tagName)) {
      return;
    }
    selectedCard = newTask;
    newTask.classList.add('dragging');
  });

  newTask.addEventListener('dragend', () => {
    selectedCard = null;
    newTask.classList.remove('dragging');
  });

  // Auto Resize Text Area
  const textEntered = newTask.querySelector('.text');
  textEntered.addEventListener('input', function () {
    this.style.height = 'auto';
    this.style.height = this.scrollHeight + 'px';
  });

  // Trash Button
  const deleteButton = newTask.querySelector('.trash-button');
  deleteButton.addEventListener('click', () => {
    newTask.remove();
    counts[category] = Math.max(0, counts[category] - 1);
    updateDisplay(category);
    renumberCards();
  });

  // Delete all
  const resetButton = document.querySelector('.delete-button');
  resetButton.addEventListener('click', () => {
    newTask.remove();
    
  document.querySelector('.numberToDo').innerHTML = '';
  document.querySelector('.numberInProgress').innerHTML = '';
  document.querySelector('.numberCompleted').innerHTML = '';


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
      renumberCards();
    });
  }
});
