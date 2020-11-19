import api from './api'

export const createUser = (user) => api.post('/register', user);