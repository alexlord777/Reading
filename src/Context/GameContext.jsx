import { createContext, useContext, useState, useEffect, useRef } from "react";
import { startGame as startGameAPI, joinGame, getGame,startNewRound,submitAnswers,scores } from "../api/game";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import io from 'socket.io-client';

const GameContext = createContext();

export const useGame = () => {
    const context = useContext(GameContext);

    if (!context) {
        throw new Error("useGame must be used within a GameProvider");
    }

    return context;
}

export function GameProvider({ children }) {
    const navigate = useNavigate();
    const [game, setGame] = useState({});
    const [creatorId, setCreatorId] = useState(null);
    const [players, setPlayers] = useState([]);
    const [isSeccion, setIsSeccion] = useState(false);
    const socket = useRef(null);

    useEffect(() => {
        const gameSession = Cookies.get('gameSession');
        if (gameSession) {
            const connectSocket = async () => {
                socket.current = io('http://localhost:3000', {
                    withCredentials: true,
                    extraHeaders: {
                        "my-custom-header": "abcd"
                    }
                });

                socket.current.emit('join_game', { accessKey: gameSession, playerId: creatorId });

                socket.current.on('player_joined', (players) => {
                    setPlayers(players);
                });

                socket.current.on('game_started', ({ gameId }) => {

                    navigate('/gameStart');
                });

                try {
                    const res = await getGame({ accessKey: gameSession });
                    setIsSeccion(true);
                    setGame(res.data);
                } catch (error) {
                    setIsSeccion(false);
                }
            }

            connectSocket();

            return () => {
                if (socket.current) {
                    socket.current.disconnect();
                }
            };
        }
    }, [navigate, creatorId]);

    const createGame = async (id) => {
        try {
            const res = await startGameAPI({ playerId: id });
            setGame(res.data);
            const inTenMinutes = new Date(new Date().getTime() + 10 * 60 * 1000);
            Cookies.set('gameSession', res.data.accessKey, { expires: inTenMinutes });
            setCreatorId(id);
            navigate('/gameRoom');
        } catch (error) {
            console.error("Error creating game:", error);
        }
    }

    const joinGame1 = async (accessKey, playerId) => {
        try {
            const res = await joinGame({ accessKey, playerId });
            setGame(res.data);
            setCreatorId(res.data.creator);
            const inTenMinutes = new Date(new Date().getTime() + 10 * 60 * 1000);
            Cookies.set('gameSession', accessKey, { expires: inTenMinutes });
            navigate('/gameRoom');
        } catch (error) {
            console.error("Error joining game:", error);
        }
    };

    const startGame = () => {
        if (socket.current) {
            startNewRound1()
            let ids = players.map(player => player._id);
            socket.current.emit('start_game', { gameId: game._id, players: ids });
            console.log('Emitting start_game event');
        }
    };

    const startNewRound1 = async () => {
        const gameSession = game._id;
        try {
            const res=await startNewRound({ accessKey: gameSession });
            setGame(prevGame => ({
                ...prevGame, // Mantiene las propiedades anteriores del juego
                rounds: [...prevGame.rounds, res.data] // Agrega la nueva ronda al array de rondas
              }));

        } catch (error) {
            console.error("Error starting new round:", error);
        }
    }

    const saveAnswers=async(accessKey,playerId,answers)=>{
       const payload={
        accessKey,
        playerId,
        answers
       }

       console.log("Payload to be sent:", payload);

      //console.log(await submitAnswers(payload));

    }

    const score=async(data)=>{
        const res=await scores({ accessKey:data});
        console.log(res);
        return "";
    }

    return (
        <GameContext.Provider value={{score,saveAnswers,socket ,createGame, joinGame1, game, creatorId, players, isSeccion, startGame,startNewRound1  }}>
            {children}
        </GameContext.Provider>
    );
}
