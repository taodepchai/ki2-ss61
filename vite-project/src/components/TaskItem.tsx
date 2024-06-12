import React from 'react';
import { Task } from './types';

interface TaskItemProps {
  task: Task;
  toggleTaskCompletion: (id: number) => void;
  deleteTask: (id: number) => void;
  setEditingTask: (task: Task) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, toggleTaskCompletion, deleteTask, setEditingTask }) => (
  <li>
    <input
      type="checkbox"
      checked={task.completed}
      onChange={() => toggleTaskCompletion(task.id)}
    />
    <span className={task.completed ? 'completed' : ''}>{task.title}</span>
    <button onClick={() => { setEditingTask(task); }}>Sửa</button>
    <button onClick={() => deleteTask(task.id)}>Xóa</button>
  </li>
);

export default TaskItem;
