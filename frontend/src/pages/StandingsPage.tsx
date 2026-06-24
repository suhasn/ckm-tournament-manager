import React from 'react'
import { useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { standingsService } from '@/services/standingsService'
import { Card } from '@/components/common/Card'
import { Badge } from '@/components/common/Badge'
import { Trophy, Zap } from 'lucide-react'

const StandingsPage: React.FC = () => {
  const { id: tournamentId } = useParams<{ id: string }>()
  const { data, isLoading } = useQuery({
    queryKey: ['standings', tournamentId],
    queryFn: () => standingsService.get(tournamentId!),
    enabled: !!tournamentId,
  })

  return (
    <div className="space-y-6 animate-slide-in">
      <div>
        <h1 className="section-title">Standings</h1>
        <div className="divider-orange w-20 h-1"></div>
      </div>

      <Card accent>
        {isLoading ? (
          <div className="text-center py-8">
            <Zap size={32} className="text-[#f56d2f] animate-spin mx-auto mb-2" />
            <p className="text-slate-600">Loading standings...</p>
          </div>
        ) : data?.standings && data.standings.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="table-header">
                  <th className="text-center py-3 px-2 font-bold">Rank</th>
                  <th className="text-left py-3 px-2 font-bold">Player</th>
                  <th className="text-center py-3 px-2 font-bold">Rating</th>
                  <th className="text-center py-3 px-2 font-bold">Points</th>
                  <th className="text-center py-3 px-2 font-bold">Buchholz</th>
                  <th className="text-center py-3 px-2 font-bold">SB</th>
                  <th className="text-center py-3 px-2 font-bold">Games</th>
                </tr>
              </thead>
              <tbody>
                {data.standings.map((standing: any, index: number) => (
                  <tr key={standing.player_id} className="table-row hover:bg-[#fef3e6]">
                    <td className="py-3 px-2 text-center">
                      <div className="flex items-center justify-center">
                        {index === 0 && (
                          <Trophy size={20} className="text-[#ffd700] mr-1" />
                        )}
                        {index === 1 && (
                          <Trophy size={20} className="text-[#c0c0c0] mr-1" />
                        )}
                        {index === 2 && (
                          <Trophy size={20} className="text-[#cd7f32] mr-1" />
                        )}
                        <span className="font-bold text-[#f56d2f] text-lg">{standing.rank}</span>
                      </div>
                    </td>
                    <td className="py-3 px-2 font-bold text-[#1e293b]">{standing.player_name}</td>
                    <td className="py-3 px-2 text-center text-[#1e293b]">
                      <Badge variant="secondary">{standing.rating}</Badge>
                    </td>
                    <td className="py-3 px-2 text-center font-bold text-[#f56d2f] text-lg">
                      {standing.points}
                    </td>
                    <td className="py-3 px-2 text-center text-[#1e293b]">
                      {standing.buchholz_score.toFixed(1)}
                    </td>
                    <td className="py-3 px-2 text-center text-[#1e293b]">
                      {standing.sonneborn_berger_score.toFixed(1)}
                    </td>
                    <td className="py-3 px-2 text-center font-semibold text-[#1e293b]">
                      {standing.games_played}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-12">
            <Trophy size={40} className="text-slate-400 mx-auto mb-3" />
            <p className="text-slate-600 font-medium">No standings available yet</p>
            <p className="text-slate-500 text-sm mt-1">Complete a round to see standings</p>
          </div>
        )}
      </Card>
    </div>
  )
}

export default StandingsPage
