import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './Context/AuthContext'
import LoginPage from './pages/LoginPage'
import ProfilePage from './pages/ProfilePage'
import ProtectedRoute from './pages/ProtectedRoute'
import { Register } from './pages/Register'
import TaskFormPage from './pages/TaskFormPage'
import TaskPage from './pages/TaskPage'
import HomePage from './pages/HomePage'
import { TaskProvider } from './Context/TaskContext'
import NavBar from './pages/NavBar'
import GameHomePage from './pages/GameHomePage'
import { GameProvider } from './Context/GameContext'
import GameRoomPage from './pages/GameRoomPage'
import ProtecteGame from './pages/ProtecteGame'
import GameStartPage from './pages/GameStartPage'
import ResultsPage from './pages/ResultsPage'
const App = () => {
  return (
    <AuthProvider>

      <TaskProvider>
        <BrowserRouter>
          <GameProvider>
            <NavBar />
            <Routes >

              <Route path='/' element={<HomePage />} />
              <Route path='/login' element={<LoginPage />} />
              <Route path='/register' element={<Register />} />


              <Route element={<ProtectedRoute />}>
                <Route path='/game' element={<GameHomePage />} />
                <Route element={<ProtecteGame />}>
                  <Route path='/gameRoom' element={<GameRoomPage />} />
                  <Route path='/gameStart' element={<GameStartPage />} />
                  <Route path='/results' element={<ResultsPage />} />
                </Route>


                <Route path='/tasks' element={<TaskPage />} />
                <Route path='/add-task' element={<TaskFormPage />} />
                <Route path='/task/:id' element={<TaskFormPage />} />
                <Route path='/profile' element={<ProfilePage />} />
              </Route>
            </Routes>
          </GameProvider>
        </BrowserRouter>
      </TaskProvider>

    </AuthProvider>
  )
}

export default App
