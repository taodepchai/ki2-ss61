import React, { useState, useEffect } from 'react';
import { Task } from './types';

interface TaskFormProps {
  addTask: (title: string) => void;
  editingTask: Task | null;
  updateTask: (id: number, title: string) => void;
  setEditingTask: (task: Task | null) => void;
}

const TaskForm: React.FC<TaskFormProps> = ({ addTask, editingTask, updateTask, setEditingTask }) => {
  const [taskInput, setTaskInput] = useState<string>('');

  useEffect(() => {
    if (editingTask) {
      setTaskInput(editingTask.title);
    }
  }, [editingTask]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (editingTask) {
      updateTask(editingTask.id, taskInput);
    } else {
      addTask(taskInput);
    }
    setTaskInput('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={taskInput}
        onChange={(e) => setTaskInput(e.target.value)}
        placeholder="Nhập tên công việc"
      />
      <button type="submit">{editingTask ? 'Cập nhật' : 'Thêm công việc'}</button>
      {editingTask && (
        <button type="button" onClick={() => setEditingTask(null)}>Hủy</button>
      )}
    </form>
  );
};

export default TaskForm;
