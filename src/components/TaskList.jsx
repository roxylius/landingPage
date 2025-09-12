import { TaskItem } from './TaskItem';

/**
 * Renders a list of tasks.
 * @param {any[]} props.tasks The array of tasks to display.
 * @param {function} props.onToggleTask The function to call when a task's completion status is toggled.
 * @param {function} props.onDeleteTask The function to call when a task is deleted.
 */
export function TaskList({ tasks, onToggleTask, onDeleteTask }) {
  // If there are no tasks, display a message.
  if (tasks.length === 0) {
    return <p className="empty-message">No tasks found. Add a task to get started!</p>;
  }

  // Render the list of tasks.
  return (
    <div className="task-list">
      {tasks.map(task => (
        <TaskItem
          key={task.id}
          task={task}
          onToggle={onToggleTask}
          onDelete={onDeleteTask}
        />
      ))}
    </div>
  );
}