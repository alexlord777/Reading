import React from 'react'

const LoginPage = () => {
  return (
    <div className='bg-zinc-800 max-w-md p-10 rounded-md'>
      {
        registerErrors.map((error,i)=>(
          <div key={i} className="bg-red-500 p-2 text-white">{error}</div>
        ))
      }
        <form onSubmit={onSubmit}>
           <input type="text" {...register("username",{required:true})}
           className="w-full bg-zinc-700 text-white  px-4 py-2 rounded-md my-2"
           placeholder='username'
           />{
            errors.username &&(
              <p className='text-red-500' >Usename is required</p>
            )
           }
           <input type="email" {...register("email",{required:true})}
           className="w-full bg-zinc-700 text-white  px-4 py-2 rounded-md my-2"
           placeholder='email(optional)'/>
           {
            errors.email &&(
              <p className='text-red-500' >Email is required</p>
            )
           }

           <input type="password" {...register("password",{required:true})}
           className="w-full bg-zinc-700 text-white  px-4 py-2 rounded-md my-2"
           placeholder='password'/>
           {
            errors.password &&(
              <p className='text-red-500' >Password is required</p>
            )
           }

           <button type='submit'>Register</button>
        </form>
    </div>
  )
}

export default LoginPage
