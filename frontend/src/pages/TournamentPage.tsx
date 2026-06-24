import React from 'react'
import { useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { tournamentService } from '@/services/tournamentService'
import { Card } from '@/components/common/Card'
import { Badge } from '@/components/common/Badge'
import { Calendar, MapPin, Users, Zap } from 'lucide-react'

const TournamentPage: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const { data: tournament, isLoading } = useQuery({
    queryKey: ['tournament', id],
    queryFn: () => tournamentService.get(id!),
    enabled: !!id,
  })

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-96">
        <Zap size={32} className="text-[#f56d2f] animate-spin" />
      </div>
    )
  }

  if (!tournament) {
    return (
      <Card>
        <p className="text-center text-slate-600">Tournament not found</p>
      </Card>
    )
  }

  return (
    <div className="space-y-6 animate-slide-in">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="section-title">{tournament.name}</h1>
          <div className="divider-orange w-20 h-1"></div>
        </div>
        <Badge variant={tournament.status === 'active' ? 'primary' : 'secondary'}>
          {tournament.status.toUpperCase()}
        </Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card accent>
          <div className="flex items-center gap-3">
            <MapPin size={24} className="text-[#f56d2f]" />
            <div>
              <p className="text-xs text-slate-600 font-semibold">LOCATION</p>
              <p className="text-lg font-bold text-[#1e293b]">{tournament.location}</p>
            </div>
          </div>
        </Card>

        <Card accent>
          <div className="flex items-center gap-3">
            <Users size={24} className="text-[#f56d2f]" />
            <div>
              <p className="text-xs text-slate-600 font-semibold">PLAYERS</p>
              <p className="text-lg font-bold text-[#1e293b]">{tournament.total_players}</p>
            </div>
          </div>
        </Card>

        <Card accent>
          <div className="flex items-center gap-3">
            <Calendar size={24} className="text-[#f56d2f]" />
            <div>
              <p className="text-xs text-slate-600 font-semibold">ROUNDS</p>
              <p className="text-lg font-bold text-[#1e293b]">
                {tournament.current_round}/{tournament.number_of_rounds}
              </p>
            </div>
          </div>
        </Card>

        <Card accent>
          <div className="flex items-center gap-3">
            <Zap size={24} className="text-[#f56d2f]" />
            <div>
              <p className="text-xs text-slate-600 font-semibold">TIME CONTROL</p>
              <p className="text-lg font-bold text-[#1e293b] capitalize">{tournament.time_control}</p>
            </div>
          </div>
        </Card>
      </div>

      <Card title="Tournament Details" accent>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          <div className="border-l-4 border-[#f56d2f] pl-4">
            <p className="text-xs text-slate-600 font-semibold uppercase">Chief Arbiter</p>
            <p className="text-lg font-bold text-[#1e293b]">{tournament.chief_arbiter}</p>
          </div>
          <div className="border-l-4 border-[#f56d2f] pl-4">
            <p className="text-xs text-slate-600 font-semibold uppercase">Rating Type</p>
            <p className="text-lg font-bold text-[#1e293b] capitalize">{tournament.rating_type}</p>
          </div>
          <div className="border-l-4 border-[#f56d2f] pl-4">
            <p className="text-xs text-slate-600 font-semibold uppercase">Status</p>
            <Badge variant="primary" className="inline-block mt-1">
              {tournament.status.toUpperCase()}
            </Badge>
          </div>
        </div>
      </Card>
    </div>
  )
}

export default TournamentPage
