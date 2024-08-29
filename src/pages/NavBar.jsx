import React from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../Context/AuthContext'
const NavBar = () => {
    const { isAuthenticated,logout } = useAuth();

    return (
        <nav className='bg-zinc-700  flex justify-between py-5 px-10 '>
            <h1 className='text-2xl font-bold '>Task Manager</h1>
            <ul className='flex gap-x-2'>
                {isAuthenticated ? (
                    <><li>
                        <Link to='/tasks'>Tasks</Link>
                    </li>
                        <li>
                            <Link to='/add-task'>Add tasks</Link>
                        </li>
                        <li><Link to='/login' onClick={()=>{
                            logout();
                        }}>LogOut</Link></li>
                    </>
                ) : (
                    <>
                        <li><Link to='/login'>login</Link></li>
                        <li><Link to='/register'>Regster</Link></li>
                    </>
                )}

            </ul>
        </nav>
    )
}

export default NavBar
