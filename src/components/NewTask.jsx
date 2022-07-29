import React, { useContext, useRef } from "react";
import { TaskContext } from "../context/tasks-context";
import styles from './NewTask.module.css'

const NewTask = () =>{
    const ctx = useContext(TaskContext)
    const ref = useRef();

    const formSubmitHandler = (event)=>{
        event.preventDefault();
        const body = {
            userId : 10001,
            id : 10,
            title: ref.current.value,
            completed: false
        }
        ref.current.value="";
       ctx.addTask(body)
    }



    return <div className={styles.container}>
        <p>Add a new task in the list</p>
        <form onSubmit={formSubmitHandler}>
            <input ref={ref} type="text" placeholder="Enter the task here"/>
            <button type="submit" >Submit</button>
        </form>
    </div>
}
export default NewTask;