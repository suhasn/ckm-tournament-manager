import React from 'react'
import { useParams } from 'react-router-dom'
import { useQuery, useMutation } from '@tanstack/react-query'
import { roundService } from '@/services/roundService'
import { Card } from '@/components/common/Card'
import { Button } from '@/components/common/Button'
import { Badge } from '@/components/common/Badge'
import { Zap } from 'lucide-react'

const RoundsPage: React.FC = () => {
  const { id: tournamentId } = useParams<{ id: string }>()
  const { data, isLoading, refetch } = useQuery({
    queryKey: ['rounds', tournamentId],
    queryFn: () => roundService.list(tournamentId!),
    enabled: !!tournamentId,
  })

  const generatePairingsMutation = useMutation({
    mutationFn: () => roundService.generatePairings(tournamentId!),
    onSuccess: () => {
      refetch()
    },
  })

  return (
    <div className="space-y-6 animate-slide-in">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="section-title">Rounds & Pairings</h1>
          <div className="divider-orange w-20 h-1"></div>
        </div>
        <Button
          variant="primary"
          onClick={() => generatePairingsMutation.mutate()}
          isLoading={generatePairingsMutation.isPending}
        >
          <Zap size={18} className="inline mr-2" />
          Generate Pairings
        </Button>
      </div>

      {isLoading ? (
        <Card>
          <div className="text-center py-8">
            <Zap size={32} className="text-[#f56d2f] animate-spin mx-auto mb-2" />
            <p className="text-slate-600">Loading rounds...</p>
          </div>
        </Card>
      ) : data?.rounds && data.rounds.length > 0 ? (
        <div className="space-y-6">
          {data.rounds.map((round: any) => (
            <Card key={round.id} title={`Round ${round.round_number}`} accent>
              <div className="flex items-center justify-between mb-4">
                <Badge variant={round.status === 'active' ? 'primary' : 'default'}>
                  {round.status.toUpperCase()}
                </Badge>
                <span className="text-sm font-semibold text-[#1e293b]">
                  {round.pairings?.length || 0} Pairings
                </span>
              </div>

              {round.pairings && round.pairings.length > 0 && (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-[#1e293b] text-white border-b-2 border-[#f56d2f]">
                        <th className="text-center py-2 px-3 font-bold">Board</th>
                        <th className="text-left py-2 px-3 font-bold">White</th>
                        <th className="text-left py-2 px-3 font-bold">Black</th>
                        <th className="text-center py-2 px-3 font-bold">Result</th>
                      </tr>
                    </thead>
                    <tbody>
                      {round.pairings.map((pairing: any) => (
                        <tr key={pairing.id} className="table-row">
                          <td className="py-3 px-3 text-center font-bold text-[#f56d2f]">{pairing.board_number}</td>
                          <td className="py-3 px-3 font-semibold text-[#1e293b]">{pairing.white_player_name}</td>
                          <td className="py-3 px-3 font-semibold text-[#1e293b]">{pairing.black_player_name}</td>
                          <td className="py-3 px-3 text-center font-bold text-[#f56d2f]">{pairing.result || '-'}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </Card>
          ))}
        </div>
      ) : (
        <Card accent>
          <div className="text-center py-12">
            <Zap size={40} className="text-slate-400 mx-auto mb-3" />
            <p className="text-slate-600 font-medium">No rounds yet</p>
            <p className="text-slate-500 text-sm mt-1">Click "Generate Pairings" to create the first round</p>
          </div>
        </Card>
      )}
    </div>
  )
}

export default RoundsPage
