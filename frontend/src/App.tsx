import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { useAuthStore } from './store/authStore'
import Layout from './components/layout/Layout'
import LoginPage from './pages/LoginPage'
import DashboardPage from './pages/DashboardPage'
import TournamentPage from './pages/TournamentPage'
import PlayersPage from './pages/PlayersPage'
import RoundsPage from './pages/RoundsPage'
import StandingsPage from './pages/StandingsPage'

const queryClient = new QueryClient()

function App() {
  const { isAuthenticated } = useAuthStore()

  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          
          {isAuthenticated ? (
            <Route element={<Layout />}>
              <Route path="/" element={<DashboardPage />} />
              <Route path="/tournaments" element={<DashboardPage />} />
              <Route path="/tournament/:id" element={<TournamentPage />} />
              <Route path="/tournament/:id/players" element={<PlayersPage />} />
              <Route path="/tournament/:id/rounds" element={<RoundsPage />} />
              <Route path="/tournament/:id/standings" element={<StandingsPage />} />
            </Route>
          ) : (
            <Route path="*" element={<Navigate to="/login" replace />} />
          )}
        </Routes>
      </Router>
    </QueryClientProvider>
  )
}

export default App
