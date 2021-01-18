import api from './api'

export const createUser = (user) => api.post('/register', user);

export const loginUser = (user) => api.post('/auth/authenticate', user);