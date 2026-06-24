import React from 'react'
import { useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { tournamentService } from '@/services/tournamentService'
import { Card } from '@/components/common/Card'
import { Badge } from '@/components/common/Badge'

const TournamentPage: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const { data: tournament, isLoading } = useQuery({
    queryKey: ['tournament', id],
    queryFn: () => tournamentService.get(id!),
    enabled: !!id,
  })

  if (isLoading) return <div>Loading...</div>
  if (!tournament) return <div>Tournament not found</div>

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">{tournament.name}</h1>
        <Badge variant="success">{tournament.status}</Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card title="Location">
          <p className="text-lg font-semibold">{tournament.location}</p>
        </Card>
        <Card title="Chief Arbiter">
          <p className="text-lg font-semibold">{tournament.chief_arbiter}</p>
        </Card>
        <Card title="Players">
          <p className="text-lg font-semibold">{tournament.total_players}</p>
        </Card>
        <Card title="Rounds">
          <p className="text-lg font-semibold">
            {tournament.current_round}/{tournament.number_of_rounds}
          </p>
        </Card>
      </div>

      <Card title="Details">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-slate-600">Time Control</p>
            <p className="font-semibold capitalize">{tournament.time_control}</p>
          </div>
          <div>
            <p className="text-sm text-slate-600">Rating Type</p>
            <p className="font-semibold capitalize">{tournament.rating_type}</p>
          </div>
        </div>
      </Card>
    </div>
  )
}

export default TournamentPage
