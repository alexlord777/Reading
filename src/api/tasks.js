import axios from './axios';


export const getTasks = () => axios.get('/task/');
export const createTask = task => axios.post('/task/', task);
export const getTask = (id) => axios.get(`/task/${id}`);
export const updateTask = task => axios.put(`/task/${task._id}`, task);
export const deleteTask = id => axios.delete(`/task/${id}`);
