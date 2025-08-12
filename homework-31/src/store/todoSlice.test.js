import todoReducer, { addTask } from '../store/todoSlice';

describe('todoSlice', () => {
  
  test('should add task to empty state', () => {
    const initialState = {
      tasks: []
    };
    
    const actualState = todoReducer(initialState, addTask('Вивчити тестування'));
    
    expect(actualState.tasks).toHaveLength(1); 
    expect(actualState.tasks[0].text).toBe('Вивчити тестування'); 
    expect(actualState.tasks[0].completed).toBe(false); 
    expect(actualState.tasks[0].id).toBeDefined(); 
  });

  test('should generate unique IDs for different tasks', async () => {
    let state = {
      tasks: []
    };
    
    state = todoReducer(state, addTask('Перше завдання'));
    const firstTaskId = state.tasks[0].id;
    
    await new Promise(resolve => setTimeout(resolve, 1));
    
    state = todoReducer(state, addTask('Друге завдання'));
    const secondTaskId = state.tasks[1].id;
    
    expect(firstTaskId).not.toBe(secondTaskId);
    expect(state.tasks).toHaveLength(2);
  });
});