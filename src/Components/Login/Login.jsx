import React from 'react'
import { useState } from 'react'
import './index.css'
import axios from "axios";
import Home from '../Home/Home';
const Login = () => {

    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [loginSuccefull,setLoginSuccefull]= useState(false);

    const handdleLongin = async(e) => {
        e.preventDefault();
  
        const data= await axios.post('http://localhost:3000/login/',{
            username:username,
            password:password
            
        });

        if(data.data=="super"){
            console.log("user dont exist");
            setLoginSuccefull(false);
        }
        else{
            localStorage.setItem('token',data.data);
            setLoginSuccefull(true);
            console.log(data.data);
        }
    }
    return (
        <>{loginSuccefull ?<Home/>:<div className='contenedor-login'>
        <form className='login-form' action="">
            <label htmlFor="username">Username:</label>
            <input onChange={(e) => { setUsername(e.target.value) }}
                placeholder="username"
                id="username"
                className='input-field'
                type="text" />
            <label htmlFor="password">Password:</label>
            <input onChange={(e) => { setPassword(e.target.value) }}
                id="password"
                placeholder="password"
                className='input-field'
                type="password"
            />

            <button className='btn-login' onClick={handdleLongin} >Login</button>
            <div className='links'>
                <a className='register-link' href="#">Registrar</a>
                <a className='guest-link' href="#">Ingresar sin registro</a>
            </div>
        </form>
    </div>}</>
    );
}


export default Login
