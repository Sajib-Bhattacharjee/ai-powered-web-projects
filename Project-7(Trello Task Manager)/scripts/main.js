let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
let history = [];
let historyIndex = -1;

// Render tasks
function renderTasks(filter = '') {
  const categories = ['personal', 'work', 'shopping'];
  categories.forEach((category) => {
    const taskList = document.querySelector(
      `.task-list[data-category="${category}"]`,
    );
    taskList.innerHTML = tasks
      .filter(
        (task) =>
          task.category === category &&
          task.title.toLowerCase().includes(filter.toLowerCase()),
      )
      .map(
        (task) => `
        <li class="task ${task.completed ? 'completed' : ''}" data-id="${
          task.id
        }" draggable="true">
          <input type="checkbox" ${
            task.completed ? 'checked' : ''
          } onchange="toggleTaskStatus(${task.id})">
          <span>${task.title}</span>
          <button onclick="deleteTask(${task.id})">Delete</button>
        </li>
      `,
      )
      .join('');
  });
  updateProgress();
  checkDueDates();
}

// Add task
function addTask(event) {
  event.preventDefault();
  const task = {
    id: Date.now(),
    title: document.getElementById('task-title').value,
    description: document.getElementById('task-description').value,
    dueDate: document.getElementById('task-due-date').value,
    priority: document.getElementById('task-priority').value,
    category: document.getElementById('task-category').value,
    completed: false,
  };
  tasks.push(task);
  saveState();
  renderTasks();
  document.getElementById('task-form').reset();
}

// Delete task
function deleteTask(id) {
  tasks = tasks.filter((task) => task.id !== id);
  saveState();
  renderTasks();
}

// Toggle task status
function toggleTaskStatus(id) {
  tasks = tasks.map((task) =>
    task.id === id ? { ...task, completed: !task.completed } : task,
  );
  saveState();
  renderTasks();
}

// Save state for undo/redo
function saveState() {
  history = history.slice(0, historyIndex + 1);
  history.push([...tasks]);
  historyIndex++;
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Undo
function undo() {
  if (historyIndex > 0) {
    historyIndex--;
    tasks = [...history[historyIndex]];
    localStorage.setItem('tasks', JSON.stringify(tasks));
    renderTasks();
  }
}

// Redo
function redo() {
  if (historyIndex < history.length - 1) {
    historyIndex++;
    tasks = [...history[historyIndex]];
    localStorage.setItem('tasks', JSON.stringify(tasks));
    renderTasks();
  }
}

// Search/filter tasks
document.getElementById('search').addEventListener('input', (e) => {
  renderTasks(e.target.value);
});

// Dark/light mode toggle
document.getElementById('theme-toggle').addEventListener('click', () => {
  const themeStyle = document.getElementById('theme-style');
  if (themeStyle.getAttribute('href') === 'styles/main.css') {
    themeStyle.setAttribute('href', 'styles/dark-mode.css');
  } else {
    themeStyle.setAttribute('href', 'styles/main.css');
  }
});

// Progress tracking
function updateProgress() {
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((task) => task.completed).length;
  const progress = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;
  document.querySelector('.progress').style.width = `${progress}%`;
}

// Due date reminders
function checkDueDates() {
  const now = new Date();
  tasks.forEach((task) => {
    const dueDate = new Date(task.dueDate);
    if (dueDate < now && !task.completed) {
      alert(`Task "${task.title}" is overdue!`);
    }
  });
}

// Export tasks
document.getElementById('export-tasks').addEventListener('click', () => {
  const data = JSON.stringify(tasks, null, 2);
  const blob = new Blob([data], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'tasks.json';
  a.click();
  URL.revokeObjectURL(url);
});

// Import tasks
document.getElementById('import-tasks').addEventListener('change', (e) => {
  const file = e.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (event) => {
      tasks = JSON.parse(event.target.result);
      saveState();
      renderTasks();
    };
    reader.readAsText(file);
  }
});

// Share tasks (collaboration)
document.getElementById('share-link').addEventListener('click', () => {
  const data = JSON.stringify(tasks);
  const encodedData = encodeURIComponent(data);
  const url = `${window.location.origin}${window.location.pathname}?tasks=${encodedData}`;
  navigator.clipboard.writeText(url).then(() => {
    alert('Link copied to clipboard! Share it with others.');
  });
});

// Load shared tasks
function loadSharedTasks() {
  const urlParams = new URLSearchParams(window.location.search);
  const sharedTasks = urlParams.get('tasks');
  if (sharedTasks) {
    tasks = JSON.parse(decodeURIComponent(sharedTasks));
    saveState();
    renderTasks();
  }
}

// Drag-and-drop functionality
let draggedTask = null;

document.querySelectorAll('.task-list').forEach((list) => {
  list.addEventListener('dragstart', (e) => {
    draggedTask = e.target;
    e.target.style.opacity = '0.4';
  });

  list.addEventListener('dragover', (e) => {
    e.preventDefault();
    const afterElement = getDragAfterElement(list, e.clientY);
    if (afterElement == null) {
      list.appendChild(draggedTask);
    } else {
      list.insertBefore(draggedTask, afterElement);
    }
  });

  list.addEventListener('dragend', (e) => {
    e.target.style.opacity = '1';
  });
});

function getDragAfterElement(list, y) {
  const draggableElements = [...list.querySelectorAll('.task:not(.dragging)')];
  return draggableElements.reduce(
    (closest, child) => {
      const box = child.getBoundingClientRect();
      const offset = y - box.top - box.height / 2;
      if (offset < 0 && offset > closest.offset) {
        return { offset: offset, element: child };
      } else {
        return closest;
      }
    },
    { offset: Number.NEGATIVE_INFINITY },
  ).element;
}

// Event listeners
document.getElementById('task-form').addEventListener('submit', addTask);
document.addEventListener('keydown', (e) => {
  if (e.ctrlKey && e.key === 'z') undo();
  if (e.ctrlKey && e.key === 'y') redo();
});
loadSharedTasks();
renderTasks();
