import React, { useEffect, useRef, useState } from 'react';
import { useGame } from '../Context/GameContext';
import { useAuth } from '../Context/AuthContext';
import Cookies from "js-cookie";
import { useNavigate } from 'react-router-dom';
import io from 'socket.io-client';
import Modal from 'react-modal';

const GameRoomPage = () => {
    const navigate = useNavigate();
    const { game, creatorId, players, startGame } = useGame();
    const { user } = useAuth();
    const [codeModalIsOpen, setCodeModalIsOpen] = useState(false);
    const socket = useRef(null);

    useEffect(() => {
        const gameSession = Cookies.get('gameSession');
        if (!gameSession) {
             navigate('/game');
            return;
        }

        socket.current = io('http://localhost:3000', {
            withCredentials: true,
            extraHeaders: {
                "my-custom-header": "abcd"
            }
        });

        socket.current.emit('join_game', { accessKey: gameSession, playerId: user.id });

        

        socket.current.on('game_started', () => {
            navigate('/gameStart');
            console.log("empezar")
        });

        return () => {
            if (socket.current) {
                socket.current.disconnect();
            }
        };
    }, [navigate, user.id]);

    const handleStartGame = () => {
        startGame();
    };

    const handleOpenCodeModal = () => {
        setCodeModalIsOpen(true);
    };

    const handleCloseCodeModal = () => {
        setCodeModalIsOpen(false);
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-zinc-800 p-4">
            <div className="space-y-4 w-full max-w-xs">
                <h1 className="text-white text-center text-2xl">Game Page</h1>
                {user.id === creatorId && (
                    <>
                        <button onClick={handleStartGame} className="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                            Comenzar Juego
                        </button>
                        <button onClick={handleOpenCodeModal} className="w-full px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600">
                            Mostrar Código
                        </button>
                    </>
                )}
                <div className="mt-4 bg-gray-700 p-4 rounded">
                    <h2 className="text-white text-center text-xl mb-2">Jugadores en la sala:</h2>
                    {players.length === 0 ? (
                        <p className="text-white text-center">No hay jugadores en la sala.</p>
                    ) : (
                        <ul className="space-y-2">
                            {players.map(player => (
                                <li key={player._id} className="text-white text-center bg-gray-800 p-2 rounded">{player.username}</li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>
            <Modal
                isOpen={codeModalIsOpen}
                onRequestClose={handleCloseCodeModal}
                contentLabel="Game Code Modal"
                className="bg-white rounded-lg p-6 w-full max-w-md mx-auto my-20"
                overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
            >
                <h2 className="text-xl font-bold mb-4 text-blue-700">Código de la Sesión</h2>
                <p className="text-gray-900">{game.accessKey}</p>
                <div className="flex justify-end space-x-4 mt-4">
                    <button onClick={handleCloseCodeModal} className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">
                        Cerrar
                    </button>
                </div>
            </Modal>
        </div>
    );
};

export default GameRoomPage;
