import React from "react";
import FilterTasks from "./components/FilterTasks";
import NewTask from "./components/NewTask";
import Tasks from "./components/Tasks";


const App = () =>{
    return <main>
        <h2>To-Do List</h2>
        <NewTask/>
        <FilterTasks />
        <Tasks />
    </main>
}

export default App;