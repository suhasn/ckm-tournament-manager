import React, { useEffect } from 'react'
import { useTournamentStore } from '@/store/tournamentStore'
import { tournamentService } from '@/services/tournamentService'
import { useQuery } from '@tanstack/react-query'
import { Card } from '@/components/common/Card'
import { Button } from '@/components/common/Button'
import { Link } from 'react-router-dom'
import { Trophy, Plus } from 'lucide-react'

const DashboardPage: React.FC = () => {
  const { tournaments, setTournaments } = useTournamentStore()
  const { data, isLoading } = useQuery({
    queryKey: ['tournaments'],
    queryFn: () => tournamentService.list(),
  })

  useEffect(() => {
    if (data?.tournaments) {
      setTournaments(data.tournaments)
    }
  }, [data, setTournaments])

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <Link to="/tournament/new">
          <Button>
            <Plus size={18} className="inline mr-2" />
            New Tournament
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card title="Active Tournaments">
          <p className="text-3xl font-bold text-blue-600">
            {tournaments?.filter((t) => t.status === 'active').length || 0}
          </p>
        </Card>
        <Card title="Total Players">
          <p className="text-3xl font-bold text-green-600">
            {tournaments?.reduce((sum, t) => sum + t.total_players, 0) || 0}
          </p>
        </Card>
        <Card title="Completed Tournaments">
          <p className="text-3xl font-bold text-purple-600">
            {tournaments?.filter((t) => t.status === 'completed').length || 0}
          </p>
        </Card>
      </div>

      <Card title="Recent Tournaments">
        {isLoading ? (
          <p className="text-slate-600">Loading...</p>
        ) : tournaments && tournaments.length > 0 ? (
          <div className="space-y-2">
            {tournaments.slice(0, 5).map((tournament) => (
              <Link key={tournament.id} to={`/tournament/${tournament.id}`}>
                <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded hover:bg-slate-100 dark:hover:bg-slate-700 cursor-pointer">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold flex items-center gap-2">
                        <Trophy size={18} />
                        {tournament.name}
                      </h3>
                      <p className="text-sm text-slate-600 dark:text-slate-400">
                        {tournament.location} • {tournament.total_players} players • Round {tournament.current_round}/{tournament.number_of_rounds}
                      </p>
                    </div>
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                      {tournament.status}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <p className="text-slate-600">No tournaments yet</p>
        )}
      </Card>
    </div>
  )
}

export default DashboardPage
