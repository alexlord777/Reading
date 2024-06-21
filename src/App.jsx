import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './Context/AuthContext'
import LoginPage from './pages/LoginPage'
import { Register } from './pages/Register'

const App = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes >
          <Route path='/' element={<h1 className='text-4xl font-bold'>home</h1>} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/register' element={<Register />} />
          <Route path='/tasks' element={<h1 className='text-4xl font-bold'>Hola mundo</h1>} />
          <Route path='/add-task' element={<h1 className='text-4xl font-bold'>Hola mundo</h1>} />
          <Route path='/task/:id' element={<h1 className='text-4xl font-bold'>Hola mundo</h1>} />
          <Route path='/profile' element={<h1 className='text-4xl font-bold'>Hola mundo</h1>} />
        </Routes>

      </BrowserRouter>
    </AuthProvider>
  )
}

export default App
