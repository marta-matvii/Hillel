const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/todoapp');

const todoSchema = new mongoose.Schema({
    text: String,
    completed: { type: Boolean, default: false }
});

const Todo = mongoose.model('Todo', todoSchema);

app.get('/', (req, res) => {
    res.json({ message: 'TODO API is working!' });
});

app.get('/api/todos', async (req, res) => {
    try {
        const todos = await Todo.find();
        res.json(todos);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});

app.post('/api/todos', async (req, res) => {
    try {
        const newTodo = new Todo({
            text: req.body.text
        });
        const savedTodo = await newTodo.save();
        res.json(savedTodo);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});

app.put('/api/todos/:id', async (req, res) => {
    try {
        const todo = await Todo.findByIdAndUpdate(
            req.params.id,
            { 
                text: req.body.text,
                completed: req.body.completed
            },
            { new: true }
        );
        
        if (!todo) {
            return res.status(404).json({ error: 'Task not found' });
        }
        
        res.json(todo);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});

app.delete('/api/todos/:id', async (req, res) => {
    try {
        const todo = await Todo.findByIdAndDelete(req.params.id);
        
        if (!todo) {
            return res.status(404).json({ error: 'Task not found' });
        }
        
        res.json({ message: 'Task deleted' });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});