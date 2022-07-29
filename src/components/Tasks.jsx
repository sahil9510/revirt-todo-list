import React, { useEffect, useState, useContext } from "react";
import { TaskContext } from "../context/tasks-context";
import Task from "./Task";

import styles from "./Tasks.module.css";

const Tasks = () => {
  const ctx = useContext(TaskContext);
  useEffect(() => {
    ctx.getTasks();
  }, []);

  return (
    <section className={styles.container}>
    {ctx.isLoading && <div className={styles.modal}>
        <div className={styles.ring}></div>
      </div>}
      <p style={{ marginBottom: "10px" }}>Added task in to-do list</p>
      <div className={styles.list}>
        {ctx.tasks.map((task, index) => {
          return <Task key={task.id} numbering={index + 1} data={task} />;
        })}
      </div>
    </section>
  );
};

export default Tasks;
