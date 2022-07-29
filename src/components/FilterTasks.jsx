import React, { useContext } from "react";
import Select from 'react-select'
import { TaskContext } from "../context/tasks-context";
import styles from './FilterTasks.module.css'
const options = [
    {value: true , label: 'Completed'},
    {value: false, label: 'Incomplete'}
]

const FilterTasks = ()=>{
    const ctx = useContext(TaskContext)
    const onChangeHandler = (value)=>{
        const filtered = value.map(val=> val.value)
        ctx.getTasks(filtered)
    }

    return <div className={styles.container}>
        <p>Filter your tasks.</p>
        <Select  defaultValue={options} onChange={onChangeHandler} isMulti={true} className={styles.select} options={options} />
    </div>
}

export default FilterTasks;