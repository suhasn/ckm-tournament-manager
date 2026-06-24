import { PlayerStatus } from './constants'

// Player types
export interface Player {
  id: string
  tournament_id: string
  name: string
  federation_code: string
  rating: number
  club?: string
  status: PlayerStatus
  points: number
  games_played: number
  created_at: string
}

export interface PlayerCreateRequest {
  name: string
  federation_code: string
  rating: number
  date_of_birth?: string
  email?: string
  club?: string
  special_notes?: string
}
