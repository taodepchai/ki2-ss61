import React from 'react';
import TaskItem from './TaskItem';
import { Task } from './types';

interface TaskListProps {
  tasks: Task[];
  toggleTaskCompletion: (id: number) => void;
  deleteTask: (id: number) => void;
  setEditingTask: (task: Task | null) => void;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, toggleTaskCompletion, deleteTask, setEditingTask }) => (
  <ul>
    {tasks.map(task => (
      <TaskItem
        key={task.id}
        task={task}
        toggleTaskCompletion={toggleTaskCompletion}
        deleteTask={deleteTask}
        setEditingTask={setEditingTask}
      />
    ))}
  </ul>
);

export default TaskList;
