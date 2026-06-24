import { TournamentStatus, TimeControl, RatingType, TiebreakSystem } from './constants'

// Tournament types
export interface Tournament {
  id: string
  name: string
  location: string
  start_date: string
  number_of_rounds: number
  time_control: TimeControl
  rating_type: RatingType
  chief_arbiter: string
  status: TournamentStatus
  total_players: number
  current_round: number
  created_at: string
  updated_at: string
}

export interface TournamentCreateRequest {
  name: string
  location: string
  start_date: string
  number_of_rounds: number
  time_control: TimeControl
  rating_type?: RatingType
  chief_arbiter: string
  contact_email?: string
  tiebreak_systems?: TiebreakSystem[]
}
