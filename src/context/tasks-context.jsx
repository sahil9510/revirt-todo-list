import React, { useState, useCallback } from "react";
import Multiselect from 'multiselect-react-dropdown'
export const TaskContext = React.createContext({
  getTasks: (filtered) => {},
  tasks: [],
  deleteTask: (id) => {},
  updateTask: (body) => {},
  addTask: (body) => {},
});

const getAllTasks = async (filtered) => {
  try {
    const response = await fetch("https://todo-backend-assignment.herokuapp.com/todos");
    const data = await response.json();
    if (!response.ok) throw new Error(data.message || "Something went wrong");
    const tasks = data.tasks.filter(task =>filtered.find(filter => filter===task.completed)!==undefined)
    return tasks.slice(0, 50);
  } catch (err) {
    console.log(err.message);
  }
};

const newTaskHandler = async (body) => {
  try {
    const response = await fetch("https://todo-backend-assignment.herokuapp.com/todos", {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || "Something went wrong");
    }
    console.log(data);
  } catch (err) {
    console.log(err.message);
  }
};

const deleteTaskHandler = async (id) => {
  try {
    const response = await fetch("https://todo-backend-assignment.herokuapp.com/todos/" + id, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const responseData = await response.json();
    if (!response.ok) {
      throw new Error(responseData.message || "Something went wrong.");
    }
    console.log(responseData);
  } catch (err) {
    console.log(err.message);
  }
};

const updateTaskHandler = async (data) => {
  try {
    const body = { ...data, completed: !data.completed };
    const response = await fetch("https://todo-backend-assignment.herokuapp.com/todos/" + data.id, {
      method: "PATCH",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const responseData = await response.json();
    if (!response.ok)
      throw new Error(responseData.message || "Something went wrong");
    console.log(responseData);
  } catch (err) {
    console.log(err.message);
  }
};

const TaskContextProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const getNewTask = useCallback(async (filtered=[false,true]) => {
    setIsLoading(true);
    const responseTasks = await getAllTasks(filtered);
    setTasks(responseTasks);
    setIsLoading(false);
  }, []);

  const addNewTask = useCallback(async (body) => {
    setIsLoading(true);
    await newTaskHandler(body);
    getNewTask();
    setIsLoading(false);
  }, []);

  const updateGivenTask = useCallback(async (data) => {
    setIsLoading(true);
    await updateTaskHandler(data);
    getNewTask();
    setIsLoading(false);
  }, []);

  const deleteGivenTask = useCallback(async (id) => {
    setIsLoading(true);
    await deleteTaskHandler(id);
    getNewTask();
    setIsLoading(false);
  }, []);
  return (
    <TaskContext.Provider
      value={{
        tasks,
        getTasks: getNewTask,
        addTask: addNewTask,
        updateTask: updateGivenTask,
        deleteTask: deleteGivenTask,
        isLoading,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};

export default TaskContextProvider;
