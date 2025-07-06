const taskInput = document.getElementById('taskInput');
const addButton = document.getElementById('addButton');
const taskList = document.getElementById('taskList');

const API_URL = 'http://localhost:3000/api/todos';

async function loadTasks() {
    try {
        const response = await fetch(API_URL);
        const tasks = await response.json();
        
        while (taskList.firstChild) {
            taskList.removeChild(taskList.firstChild);
        }
        
        tasks.forEach(task => {
            const taskElement = createTaskElement(task);
            taskList.appendChild(taskElement);
        });
    } catch (error) {
        console.error('Error loading tasks:', error);
    }
}

function createTaskElement(task) {
    const li = document.createElement('li');
    li.className = 'task-item';
    li.dataset.id = task.id;
    
    const span = document.createElement('span');
    span.textContent = task.text;
    
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Видалити';
    deleteButton.className = 'delete-btn';
    
    li.appendChild(span);
    li.appendChild(deleteButton);
    
    return li;
}

async function addTask() {
    const taskText = taskInput.value.trim();
    
    if (taskText) {
        try {
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ text: taskText })
            });
            
            const newTask = await response.json();
            
            const taskElement = createTaskElement(newTask);
            taskList.appendChild(taskElement);
            
            taskInput.value = '';
            taskInput.focus();
            
        } catch (error) {
            console.error('Error adding task:', error);
        }
    }
}

async function deleteTask(taskId, taskElement) {
    try {
        const response = await fetch(`${API_URL}/${taskId}`, {
            method: 'DELETE'
        });
        
        if (response.ok) {
            taskList.removeChild(taskElement);
        }
        
    } catch (error) {
        console.error('Error deleting task:', error);
    }
}

function handleTaskListClick(event) {
    if (event.target.classList.contains('delete-btn')) {
        const taskItem = event.target.parentElement;
        const taskId = taskItem.dataset.id;
        
        deleteTask(taskId, taskItem);
    }
}

addButton.addEventListener('click', addTask);

taskInput.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        addTask();
    }
});

taskList.addEventListener('click', handleTaskListClick);

document.addEventListener('DOMContentLoaded', loadTasks);