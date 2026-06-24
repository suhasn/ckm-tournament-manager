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
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Rounds</h1>
        <Button onClick={() => generatePairingsMutation.mutate()} isLoading={generatePairingsMutation.isPending}>
          <Zap size={18} className="inline mr-2" />
          Generate Pairings
        </Button>
      </div>

      {isLoading ? (
        <p>Loading...</p>
      ) : data?.rounds && data.rounds.length > 0 ? (
        <div className="space-y-4">
          {data.rounds.map((round: any) => (
            <Card key={round.id} title={`Round ${round.round_number}`}>
              <div className="flex items-center justify-between mb-4">
                <Badge variant="default">{round.status}</Badge>
                <span className="text-sm text-slate-600">{round.pairings?.length || 0} pairings</span>
              </div>
              
              {round.pairings && round.pairings.length > 0 && (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-slate-200">
                        <th className="text-left py-2 px-2">Board</th>
                        <th className="text-left py-2 px-2">White</th>
                        <th className="text-left py-2 px-2">Black</th>
                        <th className="text-left py-2 px-2">Result</th>
                      </tr>
                    </thead>
                    <tbody>
                      {round.pairings.map((pairing: any) => (
                        <tr key={pairing.id} className="border-b border-slate-100">
                          <td className="py-2 px-2 font-semibold">{pairing.board_number}</td>
                          <td className="py-2 px-2">{pairing.white_player_name}</td>
                          <td className="py-2 px-2">{pairing.black_player_name}</td>
                          <td className="py-2 px-2">{pairing.result || '-'}</td>
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
        <Card>
          <p className="text-slate-600">No rounds yet. Click "Generate Pairings" to start.</p>
        </Card>
      )}
    </div>
  )
}

export default RoundsPage
