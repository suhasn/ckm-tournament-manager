import React from 'react'
import { useTournamentStore } from '@/store/tournamentStore'
import { tournamentService } from '@/services/tournamentService'
import { useQuery } from '@tanstack/react-query'
import { Card } from '@/components/common/Card'
import { Button } from '@/components/common/Button'
import { Badge } from '@/components/common/Badge'
import { Link } from 'react-router-dom'
import { Trophy, Plus, Users, Zap, TrendingUp } from 'lucide-react'

const DashboardPage: React.FC = () => {
  const { tournaments, setTournaments } = useTournamentStore()
  const { data, isLoading } = useQuery({
    queryKey: ['tournaments'],
    queryFn: () => tournamentService.list(),
  })

  React.useEffect(() => {
    if (data?.tournaments) {
      setTournaments(data.tournaments)
    }
  }, [data, setTournaments])

  const activeTournaments = tournaments?.filter((t) => t.status === 'active').length || 0
  const totalPlayers = tournaments?.reduce((sum, t) => sum + t.total_players, 0) || 0
  const completedTournaments = tournaments?.filter((t) => t.status === 'completed').length || 0

  return (
    <div className="space-y-8 animate-slide-in">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="section-title">Dashboard</h1>
          <div className="divider-orange w-20 h-1"></div>
        </div>
        <Link to="/tournament/new">
          <Button variant="primary">
            <Plus size={18} className="inline mr-2" />
            New Tournament
          </Button>
        </Link>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card accent className="hover:shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600 dark:text-slate-400 font-medium">Active Tournaments</p>
              <p className="text-4xl font-bold text-[#f56d2f] mt-2">{activeTournaments}</p>
            </div>
            <Trophy size={40} className="text-[#f56d2f] opacity-20" />
          </div>
        </Card>

        <Card accent className="hover:shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600 dark:text-slate-400 font-medium">Total Players</p>
              <p className="text-4xl font-bold text-[#1e293b] mt-2">{totalPlayers}</p>
            </div>
            <Users size={40} className="text-[#1e293b] opacity-20" />
          </div>
        </Card>

        <Card accent className="hover:shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600 dark:text-slate-400 font-medium">Completed Tournaments</p>
              <p className="text-4xl font-bold text-green-600 mt-2">{completedTournaments}</p>
            </div>
            <TrendingUp size={40} className="text-green-600 opacity-20" />
          </div>
        </Card>
      </div>

      {/* Recent Tournaments */}
      <Card title="Recent Tournaments" accent>
        {isLoading ? (
          <div className="text-center py-8">
            <div className="inline-block animate-spin">
              <Zap size={32} className="text-[#f56d2f]" />
            </div>
            <p className="mt-2 text-slate-600">Loading tournaments...</p>
          </div>
        ) : tournaments && tournaments.length > 0 ? (
          <div className="space-y-3">
            {tournaments.slice(0, 5).map((tournament) => (
              <Link key={tournament.id} to={`/tournament/${tournament.id}`}>
                <div className="p-4 bg-gradient-to-r from-[#fef3e6] to-white border border-[#f56d2f] border-opacity-30 rounded-lg hover:border-[#f56d2f] hover:shadow-md transition-all cursor-pointer group">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <h3 className="font-bold text-[#1e293b] flex items-center gap-2 group-hover:text-[#f56d2f] transition-colors">
                        <Trophy size={18} className="text-[#f56d2f]" />
                        {tournament.name}
                      </h3>
                      <p className="text-sm text-slate-600 mt-1">
                        {tournament.location} • {tournament.total_players} players • Round {tournament.current_round}/{tournament.number_of_rounds}
                      </p>
                    </div>
                    <Badge variant={tournament.status === 'active' ? 'primary' : 'secondary'}>
                      {tournament.status.toUpperCase()}
                    </Badge>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <Trophy size={32} className="text-slate-400 mx-auto mb-2" />
            <p className="text-slate-600">No tournaments yet. Create one to get started!</p>
          </div>
        )}
      </Card>
    </div>
  )
}

export default DashboardPage
