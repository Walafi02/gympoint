import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3030',
});

export default api;
