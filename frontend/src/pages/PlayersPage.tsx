import React from 'react'
import { useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { playerService } from '@/services/playerService'
import { Card } from '@/components/common/Card'
import { Badge } from '@/components/common/Badge'
import { Button } from '@/components/common/Button'
import { Plus, Users, Zap } from 'lucide-react'

const PlayersPage: React.FC = () => {
  const { id: tournamentId } = useParams<{ id: string }>()
  const { data, isLoading } = useQuery({
    queryKey: ['players', tournamentId],
    queryFn: () => playerService.list(tournamentId!),
    enabled: !!tournamentId,
  })

  return (
    <div className="space-y-6 animate-slide-in">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="section-title">Players</h1>
          <div className="divider-orange w-20 h-1"></div>
        </div>
        <Button variant="primary">
          <Plus size={18} className="inline mr-2" />
          Add Player
        </Button>
      </div>

      <Card accent>
        {isLoading ? (
          <div className="text-center py-8">
            <Zap size={32} className="text-[#f56d2f] animate-spin mx-auto mb-2" />
            <p className="text-slate-600">Loading players...</p>
          </div>
        ) : data?.players && data.players.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="table-header">
                  <th className="text-left py-3 px-4 font-bold">Player Name</th>
                  <th className="text-left py-3 px-4 font-bold">Rating</th>
                  <th className="text-left py-3 px-4 font-bold">Federation</th>
                  <th className="text-center py-3 px-4 font-bold">Points</th>
                  <th className="text-center py-3 px-4 font-bold">Status</th>
                </tr>
              </thead>
              <tbody>
                {data.players.map((player: any) => (
                  <tr key={player.id} className="table-row">
                    <td className="py-3 px-4 font-semibold text-[#1e293b]">{player.name}</td>
                    <td className="py-3 px-4">
                      <span className="inline-block bg-[#fef3e6] text-[#f56d2f] px-3 py-1 rounded-full font-bold">
                        {player.rating}
                      </span>
                    </td>
                    <td className="py-3 px-4">{player.federation_code}</td>
                    <td className="py-3 px-4 text-center font-bold text-[#f56d2f] text-lg">{player.points}</td>
                    <td className="py-3 px-4 text-center">
                      <Badge variant={player.status === 'checked_in' ? 'success' : 'default'}>
                        {player.status.replace('_', ' ').toUpperCase()}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-12">
            <Users size={40} className="text-slate-400 mx-auto mb-3" />
            <p className="text-slate-600 font-medium">No players registered yet</p>
          </div>
        )}
      </Card>
    </div>
  )
}

export default PlayersPage
