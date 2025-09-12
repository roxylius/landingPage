// src/components/TaskForm.jsx
// The main component for displaying and managing tasks.
import { useState } from 'react';
import { MagnifyingGlassIcon, PlusIcon, ExitIcon } from '@radix-ui/react-icons';
import { motion, AnimatePresence } from 'framer-motion';
import '../styles/taskform.css';
import { TaskFilter } from './TaskFilter';
import { TaskList } from './TaskList';
import { useTasks } from '../hooks/useTasks';

/**
 * A form component for adding, viewing, and filtering tasks.
 * @param {function} props.onLogout Callback function to handle user logout.
 * @param {string} props.username The username of the current user.
 */
const TaskForm = ({ onLogout, username }) => {
  // State for expanding the search input.
  const [searchExpanded, setSearchExpanded] = useState(false);
  // State for the search query.
  const [searchQuery, setSearchQuery] = useState('');
  // State for the current filter.
  const [filter, setFilter] = useState('all');
  // State for the new task input.
  const [newTask, setNewTask] = useState('');
  // Custom hook for task management.
  const { tasks, filteredTasks, addTask, deleteTask, toggleTask } = useTasks(username);

  // Handles adding a new task.
  const handleAddTask = (e) => {
    e.preventDefault();
    if (newTask.trim()) {
      addTask({ title: newTask });
      setNewTask('');
    }
  };

  // Filters and returns the tasks to be displayed.
  const displayedTasks = () => {
    let taskList = filteredTasks[filter];
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      taskList = taskList.filter(task => task.title.toLowerCase().includes(query));
    }
    return taskList;
  };

  return (
    <div className="box">
      <div className="mdl">
        <div className="circles">
          <div className="circle circle-1"></div>
          <div className="circle circle-2"></div>
        </div>
        <div className="card-nav">
          <div className="nav-left">
            <button
              className="search-icon-btn"
              onClick={() => setSearchExpanded(!searchExpanded)}
              aria-label="Toggle search"
            >
              <MagnifyingGlassIcon width="20" height="20" />
            </button>
            <AnimatePresence>
              {searchExpanded && (
                <motion.input
                  key="search-input"
                  type="text"
                  className="search-input"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  initial={{ width: 0, opacity: 0, paddingLeft: 0, paddingRight: 0 }}
                  animate={{ width: '100%', opacity: 1, paddingLeft: '12px', paddingRight: '12px' }}
                  exit={{ width: 0, opacity: 0, paddingLeft: 0, paddingRight: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  autoFocus
                />
              )}
            </AnimatePresence>
          </div>
          <div className="nav-right">
            <TaskFilter filter={filter} setFilter={setFilter} />
            <button onClick={onLogout} className="logout-btn" aria-label="Logout">
              <ExitIcon width="20" height="20" />
            </button>
          </div>
        </div>
        <div className="card">
          <form onSubmit={handleAddTask}>
            <div className="group">
              <input
                type="text"
                placeholder="Add new task"
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
                className="task-input"
              />
              <button type="submit" className="add-task-btn" aria-label="Add task">
                <PlusIcon width={22} height={22}/>
              </button>
            </div>
            <TaskList
              tasks={displayedTasks()}
              onToggleTask={toggleTask}
              onDeleteTask={deleteTask}
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default TaskForm;