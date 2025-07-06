const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

let todos = [
    { id: 1, text: 'Learn Express', completed: false },
    { id: 2, text: 'Create API', completed: false }
];

app.get('/', (req, res) => {
    res.json({ message: 'TODO API is working!' });
});

app.get('/api/todos', (req, res) => {
    res.json(todos);
});

app.post('/api/todos', (req, res) => {
    const newTodo = {
        id: Date.now(),
        text: req.body.text,
        completed: false
    };
    todos.push(newTodo);
    res.json(newTodo);
});

app.put('/api/todos/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const todo = todos.find(t => t.id === id);
    
    if (!todo) {
        return res.status(404).json({ error: 'Task not found' });
    }
    
    todo.text = req.body.text || todo.text;
    todo.completed = req.body.completed ?? todo.completed;
    
    res.json(todo);
});

app.delete('/api/todos/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = todos.findIndex(t => t.id === id);
    
    if (index === -1) {
        return res.status(404).json({ error: 'Task not found' });
    }
    
    todos.splice(index, 1);
    res.json({ message: 'Task deleted' });
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});