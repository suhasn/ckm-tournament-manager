import api from './api'

export const roundService = {
  list: async (tournamentId: string) => {
    const response = await api.get(`/rounds/${tournamentId}`)
    return response.data
  },

  generatePairings: async (tournamentId: string) => {
    const response = await api.post(`/rounds/${tournamentId}/generate`)
    return response.data
  },

  startRound: async (roundId: string) => {
    const response = await api.put(`/rounds/${roundId}/start`)
    return response.data
  },

  enterResult: async (result: any) => {
    const response = await api.post('/results', result)
    return response.data
  },
}
