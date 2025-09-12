/**
 * Custom React hook for managing a user's tasks with localStorage persistence.
 *
 * @param {string} username - The current user's username.
 * @returns {Object} An object containing:
 *   - tasks: Array of all task objects for the user.
 *   - filteredTasks: Object with arrays for all, completed, and pending tasks.
 *   - addTask: Function to add a new task.
 *   - updateTask: Function to update an existing task by ID.
 *   - deleteTask: Function to delete a task by ID.
 *   - toggleTask: Function to toggle the completion status of a task by ID.
 */
import { useMemo } from 'react';
import { useLocalStorage } from './useLocalStorage';

export function useTasks(username) {
  // Retrieve the userTasks object from localStorage, or initialize as empty object
  const [userTasks, setUserTasks] = useLocalStorage('userTasks', {});

  // Get this user's tasks, or an empty array if none exist
  const tasks = userTasks[username] || [];

  // Helper to update only this user's tasks in the userTasks object
  const setTasksForUser = (newTasks) => {
    setUserTasks(prev => ({
      ...prev,
      [username]: newTasks,
    }));
    console.log("userTasks",userTasks);
  };

  // Add new task
  const addTask = (taskData) => {
    const newTask = {
      id: crypto.randomUUID(),
      title: taskData.title,
      description: taskData.description || '',
      completed: false,
      createdAt: new Date().toISOString(),
    };
    setTasksForUser([...tasks, newTask]);
  };

  // Update user task
  const updateTask = (id, updates) => {
    setTasksForUser(
      tasks.map(task =>
        task.id === id ? { ...task, ...updates } : task
      )
    );
  };

  //delete user task
  const deleteTask = (id) => {
    setTasksForUser(tasks.filter(task => task.id !== id));
  };

  //to check and uncheck task completion
  const toggleTask = (id) => {
    updateTask(
      id,
      { completed: !tasks.find(t => t.id === id)?.completed }
    );
  };

  //task filteration based on completion status
  const filteredTasks = useMemo(
    () => ({
      all: tasks,
      completed: tasks.filter(task => task.completed),
      pending: tasks.filter(task => !task.completed),
    }),
    [tasks]
  );

  return {
    tasks,
    filteredTasks,
    addTask,
    updateTask,
    deleteTask,
    toggleTask,
  };
}
