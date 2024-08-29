import React from 'react'
import { useEffect } from 'react';
import { useTask } from '../Context/TaskContext';

const TaskPage = () => {
  const {getTasks1,tasks}= useTask();
  useEffect(()=>{
      getTasks1()
  },[])

  return (
    <>
     {tasks.length === 0 && (
        <div className="flex justify-center items-center p-10">
          <div>
            <h1 className="font-bold text-xl">
              No tasks yet, please add a new task
            </h1>
          </div>
        </div>
      )}

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-2">
        {tasks.map((task,i) => (
          <div key={i}> <p>{task.title}</p></div>
         
        ))}
      </div>
    </>
  )
}

export default TaskPage
