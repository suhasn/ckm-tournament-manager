export type TournamentStatus = 'draft' | 'active' | 'paused' | 'completed' | 'cancelled'
export type TimeControl = 'blitz' | 'rapid' | 'classical'
export type RatingType = 'fide' | 'national' | 'local'
export type TiebreakSystem = 'buchholz' | 'sonneborn_berger' | 'direct_encounter' | 'rating_performance'
export type PlayerStatus = 'registered' | 'checked_in' | 'withdrawn' | 'disqualified'
export type RoundStatus = 'draft' | 'active' | 'completed'

export const TOURNAMENT_STATUS_LABELS: Record<TournamentStatus, string> = {
  draft: 'Draft',
  active: 'Active',
  paused: 'Paused',
  completed: 'Completed',
  cancelled: 'Cancelled',
}

export const TIME_CONTROL_LABELS: Record<TimeControl, string> = {
  blitz: 'Blitz',
  rapid: 'Rapid',
  classical: 'Classical',
}

export const PLAYER_STATUS_LABELS: Record<PlayerStatus, string> = {
  registered: 'Registered',
  checked_in: 'Checked In',
  withdrawn: 'Withdrawn',
  disqualified: 'Disqualified',
}
