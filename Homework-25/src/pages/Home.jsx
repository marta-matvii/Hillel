import { useState } from 'react';
import useTodos from '../hooks/useTodos';

function Home() {
  const { todos, addTodo, deleteTodo } = useTodos();
  const [inputValue, setInputValue] = useState('');
  const [selectedTodo, setSelectedTodo] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValue.trim()) {
      addTodo(inputValue);
      setInputValue('');
    }
  };

  const showTodoDetails = (todo) => {
    setSelectedTodo(todo);
  };

  const closeModal = () => {
    setSelectedTodo(null);
  };

  return (
    <div>
      <h2>Мій список завдань</h2>
      
      <form onSubmit={handleSubmit}>
        <input 
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Додати нове завдання"
        />
        <button type="submit">Додати</button>
      </form>

      {todos.length === 0 ? (
        <p>Завдань поки немає</p>
      ) : (
        <ul>
          {todos.map(todo => (
            <li key={todo.id}>
              <span onClick={() => showTodoDetails(todo)}>
                {todo.text}
              </span>
              <button onClick={() => deleteTodo(todo.id)}>
                Видалити
              </button>
            </li>
          ))}
        </ul>
      )}

      {selectedTodo && (
        <div className="modal">
          <div className="modal-content">
            <h3>Деталі завдання</h3>
            <p><strong>Текст:</strong> {selectedTodo.text}</p>
            <p><strong>Створено:</strong> {selectedTodo.createdAt}</p>
            <button onClick={closeModal}>Закрити</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;