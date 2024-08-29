import axios from './axios';

export const startGame= playerId=> axios.post(`/game/start`,playerId);
export const getGame= accessKey=> axios.post(`/game/getGame`,accessKey);
export const joinGame= accessKey=> axios.post(`/game/join`,accessKey);
export const startNewRound = accessKey=> axios.post(`/game/startNewRound`,accessKey);
export const submitAnswers = accessKey=> axios.post(`/game/submitAnswers`,accessKey);
export const scores = accessKey=> axios.post(`/game/scores`,accessKey);