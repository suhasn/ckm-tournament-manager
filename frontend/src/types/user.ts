// Auth types
export interface User {
  id: string
  email: string
  full_name: string
  role: 'arbiter' | 'player' | 'spectator' | 'admin'
  is_active: boolean
  created_at: string
}

export interface LoginRequest {
  email: string
  password: string
}

export interface RegisterRequest {
  email: string
  password: string
  full_name: string
  role?: 'arbiter' | 'player' | 'spectator'
}

export interface TokenResponse {
  access_token: string
  token_type: string
  expires_in: number
}
