import { create } from 'zustand'
import { Tournament } from '@/types/tournament'

interface TournamentState {
  selectedTournament: Tournament | null
  tournaments: Tournament[]
  setSelectedTournament: (tournament: Tournament | null) => void
  setTournaments: (tournaments: Tournament[]) => void
}

export const useTournamentStore = create<TournamentState>((set) => ({
  selectedTournament: null,
  tournaments: [],
  setSelectedTournament: (tournament) => set({ selectedTournament: tournament }),
  setTournaments: (tournaments) => set({ tournaments }),
}))
