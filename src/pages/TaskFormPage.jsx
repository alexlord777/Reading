import {useForm} from 'react-hook-form';
import { useTask } from '../Context/TaskContext';

const TaskFormPage = () => {

  const {register, handleSubmit}= useForm();
  const {tasks,createTask1}=useTask();

  const onSubmit=handleSubmit((data)=>{
    console.log(data);
      createTask1(data)
  })
  return (
    <div className='bg-zinc-800 max-w-md w-full p-10 rounded-md'>
      <form onSubmit={onSubmit}>
        <input 
        type="text"
        placeholder='Title'
        {...register("title")}
        className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md'
        autoFocus />
      
        <textarea rows="3" placeholder='Description'
        {...register("description")}
        className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md'
        ></textarea>
        <button>Save</button>
      </form>
    </div>
  )
}

export default TaskFormPage
