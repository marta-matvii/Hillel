const taskInput = document.getElementById('taskInput');
const addButton = document.getElementById('addButton');
const taskList = document.getElementById('taskList');

function createTaskElement(taskText) {
    const li = document.createElement('li');
    li.className = 'task-item';
    
    const span = document.createElement('span');
    span.textContent = taskText;
    
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Видалити';
    deleteButton.className = 'delete-btn';
    
    li.appendChild(span);
    li.appendChild(deleteButton);
    
    return li;
}

function addTask() {
    const taskText = taskInput.value.trim();
    
    if (taskText) {
        const taskElement = createTaskElement(taskText);
        taskList.appendChild(taskElement);
        taskInput.value = '';
        taskInput.focus();
    }
}

function handleTaskListClick(event) {
    if (event.target.classList.contains('delete-btn')) {
        const taskItem = event.target.parentElement;
        taskList.removeChild(taskItem);
    }
}

addButton.addEventListener('click', addTask);

taskInput.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        addTask();
    }
});

taskList.addEventListener('click', handleTaskListClick);

const initialTasks = ['Завдання 1', 'Завдання 2', 'Завдання 3'];
initialTasks.forEach(task => {
    taskList.appendChild(createTaskElement(task));
});