import axios from "axios";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import FilterButtons from "./FilterButtons";
import "./style.scss";
import TaskForm from "./TaskForm";
import TaskList from "./TaskList";
import { Task } from "./types";

const Todo: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filter, setFilter] = useState<"all" | "completed" | "active">("all");
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await axios.get("http://localhost:3000/tasks");
      setTasks(response.data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  const addTask = async (title: string) => {
    if (title.trim() === "") return alert("Tên công việc không được để trống");
    try {
      const response = await axios.post("http://localhost:3000/tasks", {
        title,
        completed: false,
      });
      setTasks([...tasks, response.data]);
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  const updateTask = async (id: number, title: string) => {
    if (title.trim() === "") return alert("Tên công việc không được để trống");
    try {
      await axios.put(`http://localhost:3000/tasks/${id}`, { title });
      setTasks(
        tasks.map((task) => (task.id === id ? { ...task, title } : task))
      );
      setEditingTask(null);
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  const deleteTask = async (id: number) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(`http://localhost:3000/tasks/${id}`);
          setTasks(tasks.filter((task) => task.id !== id));
        } catch (error) {
          console.error("Error deleting task:", error);
        }
      }
    });
  };

  const toggleTaskCompletion = async (id: number) => {
    const task = tasks.find((task) => task.id === id);
    if (!task) return;
    try {
      await axios.patch(`http://localhost:3000/tasks/${id}`, {
        completed: !task.completed,
      });
      setTasks(
        tasks.map((task) =>
          task.id === id ? { ...task, completed: !task.completed } : task
        )
      );
    } catch (error) {
      console.error("Error toggling task completion:", error);
    }
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === "completed") return task.completed;
    if (filter === "active") return !task.completed;
    return true;
  });

  return (
    <div className="container">
      <h1>Quản lý công việc</h1>
      <TaskForm
        addTask={addTask}
        editingTask={editingTask}
        updateTask={updateTask}
        setEditingTask={setEditingTask}
      />
      <FilterButtons setFilter={setFilter} />
      <TaskList
        tasks={filteredTasks}
        toggleTaskCompletion={toggleTaskCompletion}
        deleteTask={deleteTask}
        setEditingTask={setEditingTask}
      />
    </div>
  );
};

export default Todo;
