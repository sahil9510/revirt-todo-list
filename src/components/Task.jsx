import React, { useContext } from "react";
import CheckIcon from "../assets/White_check.svg";
import { TaskContext } from "../context/tasks-context";
import styles from "./Task.module.css";

const Task = ({ data,numbering }) => {

  const ctx= useContext(TaskContext)
  return (
    <div className={`${styles.tile} ${data.completed? `${styles.completed}` : ""}`}>
      <div className={styles.info}>
        <span>
          <p className={styles.numbering}>{numbering}.</p>
          <p className={styles.content}>{data.title}</p>
        </span>
        <img src={CheckIcon} />
      </div>
      <hr />
      <div className={styles.actions}>
        <button
          onClick={()=>ctx.updateTask(data)}
          className={`${data.completed ? "" : `${styles.pinkButton}`}`}
        >
          Mark as {data.completed ? "incomplete" : "completed"}
        </button>
        <button onClick={()=>ctx.deleteTask(data.id)}>
          Delete
        </button>
      </div>
    </div>
  );
};

export default Task;
