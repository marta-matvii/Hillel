import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  tasks: []
};

const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    addTask: (state, action) => {
      const newTask = {
        id: Date.now(),
        text: action.payload,
        completed: false
      };
      state.tasks.push(newTask);
    }
  }
});

export const { addTask } = todoSlice.actions;
export default todoSlice.reducer;