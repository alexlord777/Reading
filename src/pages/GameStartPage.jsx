import React, { useState, useEffect } from 'react';
import { useGame } from '../Context/GameContext';
import { useNavigate } from 'react-router-dom';
import CategoryInput from './CategoryInput';
import Cookies from "js-cookie";
import { useAuth } from '../Context/AuthContext';

const GameStartPage = () => {
  const categories = ["Name", "Animal", "City", "Meal", "Color", "Profession"];
  const initialAnswersState = categories.reduce((acc, category) => {
    acc[category] = '';
    return acc;
  }, {});

  const { game, socket,saveAnswers } = useGame();
  const [currentCategoryIndex, setCurrentCategoryIndex] = useState(0);
  const [answers, setAnswers] = useState(initialAnswersState);
  const [currentAnswer, setCurrentAnswer] = useState('');
  const [timer, setTimer] = useState(null);
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isFinishButtonDisabled, setIsFinishButtonDisabled] = useState(false);

 


  useEffect(() => {
   

    if (game && game.categories && game.categories.length > 0) {
      setCurrentCategoryIndex(0);
      setCurrentAnswer(answers[game.categories[0]] || ''); // Para llenar el input si hay una respuesta previa
    }
  }, [game]);

  useEffect(() => {

    const gameSession = Cookies.get('gameSession');

    if (!gameSession) {
      navigate('/game');
      return;
    }


    socket.current.emit('join_game', { accessKey: gameSession, playerId: user.id });


    // Escuchar el evento de cuenta regresiva desde el servidor
    socket.current.on('countdown', (timeLeft) => {
      setTimer(timeLeft);
    });

    // Escuchar el evento cuando la cuenta regresiva termine
    socket.current.on('countdown_finished', () => {
      console.log(answers,"into over here");
      navigate('/results');
    });

    return () => {
      socket.current.off('countdown');
      socket.current.off('countdown_finished');
    };

  }, [navigate,user.id]);

  useEffect(() => {
    socket.current.on('disable_finish_button', () => {
      console.log("bloqueo")
      setIsFinishButtonDisabled(true);
    });

    return () => {
      socket.current.off('disable_finish_button');
    };
  }, []);

  const saveCurrentAnswer = () => {
    const currentCategory = game.categories[currentCategoryIndex];
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [currentCategory]: currentAnswer,
    }));
  };

  
  const handlePrevCategory = () => {
    saveCurrentAnswer();

    if (currentCategoryIndex > 0) {
      setCurrentCategoryIndex((prevIndex) => prevIndex - 1);
    }
  };

  const handleNextCategory = () => {
    saveCurrentAnswer();

    if (currentCategoryIndex < game.categories.length - 1) {
      setCurrentCategoryIndex((prevIndex) => prevIndex + 1);
    }
  };

  
  if(timer==1){
    console.log(answers)
  }
  useEffect(() => {
    // Actualiza el valor del input con la respuesta guardada o con un string vacío
    setCurrentAnswer(answers[game.categories[currentCategoryIndex]] || '');
  }, [currentCategoryIndex, answers, game.categories]);


  if(timer==1){
    saveAnswers( "haha",game._id,answers)
  }

  const handleFinishGame = () => {
    const gameSession = Cookies.get('gameSession');
    setIsFinishButtonDisabled(true);
    // Emitir evento para iniciar la cuenta regresiva
    socket.current.emit('start_countdown', { players: game.players, gameId: game._id });

    socket.current.emit('join_game', { accessKey: gameSession, playerId: user.id });

    socket.current.emit('disable_finish_button', { players: game.players });
  };

  if (!game || !game.categories) {
    return <div>Cargando...</div>;
  }

  return (
    <div className="min-h-screen bg-zinc-800 p-4 flex flex-col items-center">
      <h1 className="text-white text-2xl mb-4">Letra: {game.rounds[game.rounds.length - 1]?.letter}</h1>
      {timer !== null && <h2 className="text-red-500 text-xl mb-4">Tiempo restante: {timer} segundos</h2>}
      <div className="w-full max-w-md">
        <CategoryInput
          category={game.categories[currentCategoryIndex]}
          onChange={(category, value) => setCurrentAnswer(value)}
          value={currentAnswer}
        />
        <div className="flex justify-between mt-4">
          <button
            onClick={handlePrevCategory}
            disabled={currentCategoryIndex === 0}
            className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
          >
            Anterior
          </button>
          <button
            onClick={handleNextCategory}
            disabled={currentCategoryIndex === game.categories.length - 1}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Siguiente
          </button>
        </div>
        <button
          onClick={handleFinishGame}
          disabled={isFinishButtonDisabled}
          className="w-full px-4 py-2 mt-4 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Terminar
        </button>
      </div>
    </div>
  );
};

export default GameStartPage;
