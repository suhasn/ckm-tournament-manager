import React from 'react'
import { useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { standingsService } from '@/services/standingsService'
import { Card } from '@/components/common/Card'
import { Badge } from '@/components/common/Badge'

const StandingsPage: React.FC = () => {
  const { id: tournamentId } = useParams<{ id: string }>()
  const { data, isLoading } = useQuery({
    queryKey: ['standings', tournamentId],
    queryFn: () => standingsService.get(tournamentId!),
    enabled: !!tournamentId,
  })

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Standings</h1>

      <Card>
        {isLoading ? (
          <p>Loading...</p>
        ) : data?.standings && data.standings.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b-2 border-slate-300 dark:border-slate-600">
                  <th className="text-left py-3 px-2 font-semibold">Rank</th>
                  <th className="text-left py-3 px-2 font-semibold">Player</th>
                  <th className="text-left py-3 px-2 font-semibold">Rating</th>
                  <th className="text-center py-3 px-2 font-semibold">Points</th>
                  <th className="text-center py-3 px-2 font-semibold">Buchholz</th>
                  <th className="text-center py-3 px-2 font-semibold">SB</th>
                  <th className="text-center py-3 px-2 font-semibold">Games</th>
                </tr>
              </thead>
              <tbody>
                {data.standings.map((standing: any) => (
                  <tr key={standing.player_id} className="table-row">
                    <td className="py-3 px-2 font-bold text-blue-600">{standing.rank}</td>
                    <td className="py-3 px-2 font-medium">{standing.player_name}</td>
                    <td className="py-3 px-2">{standing.rating}</td>
                    <td className="py-3 px-2 text-center font-semibold">{standing.points}</td>
                    <td className="py-3 px-2 text-center">{standing.buchholz_score.toFixed(1)}</td>
                    <td className="py-3 px-2 text-center">{standing.sonneborn_berger_score.toFixed(1)}</td>
                    <td className="py-3 px-2 text-center">{standing.games_played}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-slate-600">No standings available yet</p>
        )}
      </Card>
    </div>
  )
}

export default StandingsPage
