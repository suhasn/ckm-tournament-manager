import api from './api'
import { Player, PlayerCreateRequest } from '@/types/player'

export const playerService = {
  list: async (tournamentId: string, page: number = 1, pageSize: number = 20) => {
    const response = await api.get(`/players/${tournamentId}`, {
      params: { page, page_size: pageSize },
    })
    return response.data
  },

  get: async (playerId: string) => {
    const response = await api.get(`/players/${playerId}`)
    return response.data
  },

  add: async (tournamentId: string, data: PlayerCreateRequest): Promise<Player> => {
    const response = await api.post(`/players/${tournamentId}`, data)
    return response.data
  },

  update: async (playerId: string, data: Partial<PlayerCreateRequest>) => {
    const response = await api.put(`/players/${playerId}`, data)
    return response.data
  },

  delete: async (playerId: string) => {
    return api.delete(`/players/${playerId}`)
  },

  bulkImport: async (tournamentId: string, players: PlayerCreateRequest[]) => {
    const response = await api.post(`/players/${tournamentId}/import`, { players })
    return response.data
  },
}
