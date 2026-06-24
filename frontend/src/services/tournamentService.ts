import api from './api'
import { Tournament, TournamentCreateRequest } from '@/types/tournament'

export const tournamentService = {
  list: async (page: number = 1, pageSize: number = 20) => {
    const response = await api.get('/tournaments', {
      params: { page, page_size: pageSize },
    })
    return response.data
  },

  get: async (id: string): Promise<Tournament> => {
    const response = await api.get(`/tournaments/${id}`)
    return response.data
  },

  create: async (data: TournamentCreateRequest): Promise<Tournament> => {
    const response = await api.post('/tournaments', data)
    return response.data
  },

  update: async (id: string, data: Partial<TournamentCreateRequest>) => {
    const response = await api.put(`/tournaments/${id}`, data)
    return response.data
  },

  delete: async (id: string) => {
    return api.delete(`/tournaments/${id}`)
  },
}
