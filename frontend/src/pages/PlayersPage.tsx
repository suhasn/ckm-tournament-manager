import React from 'react'
import { useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { playerService } from '@/services/playerService'
import { Card } from '@/components/common/Card'
import { Badge } from '@/components/common/Badge'
import { Button } from '@/components/common/Button'
import { Plus } from 'lucide-react'

const PlayersPage: React.FC = () => {
  const { id: tournamentId } = useParams<{ id: string }>()
  const { data, isLoading } = useQuery({
    queryKey: ['players', tournamentId],
    queryFn: () => playerService.list(tournamentId!),
    enabled: !!tournamentId,
  })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Players</h1>
        <Button>
          <Plus size={18} className="inline mr-2" />
          Add Player
        </Button>
      </div>

      <Card>
        {isLoading ? (
          <p>Loading...</p>
        ) : data?.players && data.players.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-700">
                  <th className="text-left py-2 px-4 font-semibold">Name</th>
                  <th className="text-left py-2 px-4 font-semibold">Rating</th>
                  <th className="text-left py-2 px-4 font-semibold">Federation</th>
                  <th className="text-left py-2 px-4 font-semibold">Points</th>
                  <th className="text-left py-2 px-4 font-semibold">Status</th>
                </tr>
              </thead>
              <tbody>
                {data.players.map((player: any) => (
                  <tr key={player.id} className="table-row">
                    <td className="py-2 px-4">{player.name}</td>
                    <td className="py-2 px-4">{player.rating}</td>
                    <td className="py-2 px-4">{player.federation_code}</td>
                    <td className="py-2 px-4 font-semibold">{player.points}</td>
                    <td className="py-2 px-4">
                      <Badge variant="success">{player.status}</Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-slate-600">No players registered yet</p>
        )}
      </Card>
    </div>
  )
}

export default PlayersPage
