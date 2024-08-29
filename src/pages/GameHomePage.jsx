import React, { useState, useEffect } from 'react';
import { useGame } from '../Context/GameContext';
import { useAuth } from '../Context/AuthContext';
import Cookies from "js-cookie";
import { useNavigate } from 'react-router-dom';
import Modal from 'react-modal';

const HomePage = () => {
  const navigate = useNavigate();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [accessKey, setAccessKey] = useState('');
  const { createGame, joinGame1 } = useGame();
  const { user } = useAuth();

  useEffect(() => {
    const gameSession = Cookies.get('gameSession');
    if (gameSession) {
      navigate('/gameRoom');
    }
  }, [navigate]);



  const handleCreate = () => {
    createGame(user.id);
  };

  const handleJoin = () => {
    console.log(accessKey, user.id)
   joinGame1(accessKey, user.id);
    setModalIsOpen(false);
  };

  const handleOpenModal = () => {
    setModalIsOpen(true);
  };

  const handleCloseModal = () => {
    setModalIsOpen(false);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-zinc-800">
      <div className="space-y-4 w-full max-w-xs">
        <button onClick={handleCreate} className="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
          Crear Sesión
        </button>
        <button onClick={handleOpenModal} className="w-full px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">
          Unirse a Sesión
        </button>
      </div>
      <Modal 
        isOpen={modalIsOpen} 
        onRequestClose={handleCloseModal} 
        contentLabel="Join Game Modal"
        className="bg-gray-900 rounded-lg p-6 w-full max-w-md mx-auto my-20"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
      >
        <h2 className="text-xl font-bold mb-4 text-white-700">Unirse a una sesión</h2>
        <input 
          type="text" 
          placeholder="Ingrese el código de la sesión" 
          value={accessKey}
          onChange={(e) => setAccessKey(e.target.value)}
          className="w-full px-4 py-2 mb-4 border border-gray-300 rounded focus:outline-none focus:border-blue-500 text-gray-900"
        />
        <div className="flex justify-end space-x-4">
          <button onClick={handleCloseModal} className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">
            Cancelar
          </button>
          <button onClick={handleJoin} className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">
            Unirse
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default HomePage;