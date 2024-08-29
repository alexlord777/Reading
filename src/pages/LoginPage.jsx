import React from 'react'
import { useForm } from 'react-hook-form'
import { useAuth } from '../Context/AuthContext';
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from 'react';


const LoginPage = () => {

  const { register, handleSubmit, formState: { errors } } = useForm();
  const {login,isAuthenticated, errors:registerErrors}=useAuth();
  const navigate= useNavigate();

  const onSubmit = handleSubmit((values) => {
   login(values)
  })

  useEffect(()=>{
    if(isAuthenticated) navigate('/tasks')
  },[isAuthenticated])
  
  return (
    <div className='flex h-[calc(100vh-100px)] items-center justify-center'>
      <div className='bg-zinc-800 max-w-md w-full p-10 rounded-md'>
      {
        registerErrors.map((error,i)=>(
          <div key={i} className="bg-red-500 p-2 text-white">{error}</div>
        ))
      }
        <h1 className='text-2xl font-bold'>Login</h1>
        <form onSubmit={onSubmit}>
          <input type="text" {...register("username", { required: true })}
            className="w-full bg-zinc-700 text-white  px-4 py-2 rounded-md my-2"
            placeholder='username'
          />{
            errors.username && (
              <p className='text-red-500' >Usename is required</p>
            )
          }

          <input type="password" {...register("password", { required: true })}
            className="w-full bg-zinc-700 text-white  px-4 py-2 rounded-md my-2"
            placeholder='password' />
          {
            errors.password && (
              <p className='text-red-500' >Password is required</p>
            )
          }

          <button type='submit'>Login</button>
        </form>
        <p className='flex gap-x-2 justify-between'>
          Don't have an acount? <Link to="/register"
          className='text-sky-500'>Sing up</Link>
        </p>
      </div>

    </div>
  )
}

export default LoginPage
