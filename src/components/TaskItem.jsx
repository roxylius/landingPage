import { useState } from 'react';
import * as Checkbox from '@radix-ui/react-checkbox';
import * as Dialog from '@radix-ui/react-dialog';
import { CheckIcon, TrashIcon } from '@radix-ui/react-icons';
import '../styles/taskItem.css';

/**
 * A component representing a single task in the task list.
 * @param {object} props.task The task object to display.
 * @param {function} props.onToggle The function to call when the task's completion status is toggled.
 * @param {function} props.onDelete The function to call when the task is deleted.
 */
export function TaskItem({ task, onToggle, onDelete }) {
  // State to control the delete confirmation dialog.
  const [open, setOpen] = useState(false);

  // Format the task date for display.
  const formattedDate = new Date(task.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });

  return (
    <div className={`task-item ${task.completed ? 'completed' : 'pending'}`}>
      <Checkbox.Root
        className="CheckboxRoot"
        checked={task.completed}
        onCheckedChange={() => onToggle(task.id)}
        id={`checkbox-${task.id}`}
      >
        <Checkbox.Indicator className="CheckboxIndicator">
          <CheckIcon />
        </Checkbox.Indicator>
      </Checkbox.Root>
      <div className="task-details">
        <label htmlFor={`checkbox-${task.id}`} className="task-title">
          {task.title}
        </label>
        {task.description && <p className="task-description">{task.description}</p>}
        <time className="task-date">Created: {formattedDate}</time>
      </div>
      <button className="delete-button" onClick={() => setOpen(true)} aria-label="Delete task">
        <TrashIcon />
      </button>

      <Dialog.Root open={open} onOpenChange={setOpen}>
        <Dialog.Portal>
          <Dialog.Overlay className="DialogOverlay" />
          <Dialog.Content className="DialogContent">
            <Dialog.Title>Confirm Delete</Dialog.Title>
            <Dialog.Description>Are you sure you want to delete this task?</Dialog.Description>
            <div className="DialogActions">
              <button onClick={() => setOpen(false)}>Cancel</button>
              <button
                onClick={() => {
                  onDelete(task.id);
                  setOpen(false);
                }}
              >
                Delete
              </button>
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  );
}