import api from './api'

export const standingsService = {
  get: async (tournamentId: string) => {
    const response = await api.get(`/standings/${tournamentId}`)
    return response.data
  },
}
