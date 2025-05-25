const form = document.querySelector('.js--form');
const input = document.querySelector('.js--form__input');
const todosWrapper = document.querySelector('.js--todos-wrapper');

let todos = [];

const STORAGE_KEY = 'todos';

function generateId() {
    return Date.now();
}

function saveTodos() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
}

function loadTodos() {
    const savedTodos = localStorage.getItem(STORAGE_KEY);
    todos = savedTodos ? JSON.parse(savedTodos) : [];
}

function createTodoElement(todo) {
    const li = document.createElement('li');
    li.className = `todo-item ${todo.completed ? 'todo-item--checked' : ''}`;
    
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = todo.completed;
    
    const span = document.createElement('span');
    span.className = 'todo-item__description';
    span.textContent = todo.text;
    
    const deleteButton = document.createElement('button');
    deleteButton.className = 'todo-item__delete';
    deleteButton.textContent = 'Видалити';
    
    checkbox.addEventListener('change', () => toggleTodo(todo.id));
    deleteButton.addEventListener('click', () => deleteTodo(todo.id));
    
    li.appendChild(checkbox);
    li.appendChild(span);
    li.appendChild(deleteButton);
    
    return li;
}

function renderTodos() {
    todosWrapper.replaceChildren();
    
    todos.forEach(todo => {
        const todoElement = createTodoElement(todo);
        todosWrapper.appendChild(todoElement);
    });
}

function addTodo(text) {
    if (!text.trim()) {
        return;
    }
    
    const newTodo = {
        id: generateId(),
        text: text.trim(),
        completed: false
    };
    
    todos.push(newTodo);
    
    saveTodos();
    renderTodos();
}

function deleteTodo(id) {
    todos = todos.filter(todo => todo.id !== id);
    
    saveTodos();
    renderTodos();
}

function toggleTodo(id) {
    const todo = todos.find(todo => todo.id === id);
    if (todo) {
        todo.completed = !todo.completed;
        
        saveTodos();
        renderTodos();
    }
}

function handleFormSubmit(event) {
    event.preventDefault();
    
    const text = input.value;
    
    addTodo(text);
    
    input.value = '';
}

function init() {
    loadTodos();
    
    renderTodos();
    
    form.addEventListener('submit', handleFormSubmit);
}

document.addEventListener('DOMContentLoaded', init);