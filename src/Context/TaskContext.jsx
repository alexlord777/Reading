import { useState } from "react";
import { useContext } from "react";
import { createContext } from "react";
import { getTasks,createTask,updateTask,deleteTask } from "../api/tasks";
const TaskContext= createContext();

export const useTask=()=>{
    const context=useContext(TaskContext);

    if(!context){
        throw new Error("useTask must be used within a TaskProvider")
    }

    return context;
}


export function TaskProvider({children}){
    const [tasks,setTasks]= useState([]);

    const createTask1=async (task)=>{
        try {
            const res=  await createTask(task)
        console.log(res);
        } catch (error) {
            console.log(error);
        }
        
    }

    const getTasks1=async()=>{
        try {
            const res=await getTasks();
            setTasks(res.data)
        } catch (error) {
            console.log(error);
        }
    }
    return(
        <TaskContext.Provider value={{
            tasks,
            createTask1,
            getTasks1
        }}>
            {children}
        </TaskContext.Provider>
    )
}