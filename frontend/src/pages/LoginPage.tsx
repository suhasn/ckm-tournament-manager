import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '@/hooks/useAuth'
import { Input } from '@/components/common/Input'
import { Button } from '@/components/common/Button'
import { Card } from '@/components/common/Card'
import { AlertCircle } from 'lucide-react'

const LoginPage: React.FC = () => {
  const navigate = useNavigate()
  const { login } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    try {
      await login({ email, password })
      navigate('/')
    } catch (err: any) {
      setError(err.response?.data?.detail || 'Login failed. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1e293b] via-[#0f172a] to-[#1e293b] flex items-center justify-center p-4">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-[#f56d2f] rounded-full mix-blend-multiply filter blur-3xl opacity-10"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-[#f56d2f] rounded-full mix-blend-multiply filter blur-3xl opacity-10"></div>
      </div>

      <Card className="w-full max-w-md relative z-10 shadow-2xl">
        <div className="mb-8">
          <div className="flex items-center justify-center mb-4">
            <div className="text-5xl font-bold">
              <span className="text-[#1e293b]">Chess</span>
              <span className="text-[#f56d2f]">Klub</span>
            </div>
          </div>
          <h2 className="text-center text-2xl font-bold text-[#1e293b] mb-2">Tournament Manager</h2>
          <p className="text-center text-slate-600">Sign in to manage your tournaments</p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 rounded flex items-start gap-3">
            <AlertCircle size={20} className="flex-shrink-0 mt-0.5" />
            <p className="text-sm">{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Email Address"
            type="email"
            placeholder="your@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <Input
            label="Password"
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <Button type="submit" variant="primary" className="w-full" isLoading={isLoading}>
            Sign In
          </Button>
        </form>

        <div className="mt-6 pt-6 border-t border-slate-200">
          <p className="text-center text-sm text-slate-600">
            Demo credentials: <br />
            <span className="text-[#f56d2f] font-semibold">arbiter@chess.club / password</span>
          </p>
        </div>
      </Card>
    </div>
  )
}

export default LoginPage
