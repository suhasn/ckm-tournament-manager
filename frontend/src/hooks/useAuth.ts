import { useAuthStore } from '@/store/authStore'
import { authService } from '@/services/authService'
import { LoginRequest, RegisterRequest } from '@/types/user'

export const useAuth = () => {
  const { login: storeLogin, logout: storeLogout } = useAuthStore()

  const login = async (credentials: LoginRequest) => {
    try {
      const response = await authService.login(credentials)
      storeLogin(response)
      return response
    } catch (error) {
      throw error
    }
  }

  const register = async (data: RegisterRequest) => {
    try {
      const response = await authService.register(data)
      storeLogin(response)
      return response
    } catch (error) {
      throw error
    }
  }

  const logout = async () => {
    await authService.logout()
    storeLogout()
  }

  return { login, register, logout }
}
