import api from './api'
import { LoginRequest, RegisterRequest, TokenResponse } from '@/types/user'

export const authService = {
  login: async (credentials: LoginRequest): Promise<TokenResponse> => {
    const response = await api.post('/auth/login', credentials)
    return response.data
  },

  register: async (data: RegisterRequest): Promise<TokenResponse> => {
    const response = await api.post('/auth/register', data)
    return response.data
  },

  logout: async () => {
    // Optional: notify backend
    return true
  },
}
