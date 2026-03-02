'use client'

import { useEffect, useState } from 'react'
import { useAuth } from '@/context/AuthContext'
import { useRouter } from 'next/navigation'
import { useTask } from '@/context/TaskContext'
import TaskForm from '@/components/TaskForm'
import TaskList from '@/components/TaskList'
import { ThemeSwitcher } from '@/components/ThemeSwitcher'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { LogOut, Plus, CheckCircle2, Clock } from 'lucide-react'

export default function DashboardPage() {
  const { user, logout, isAuthenticated, loading } = useAuth()
  const { tasks } = useTask()
  const router = useRouter()
  const [showForm, setShowForm] = useState(false)
  const [activeTab, setActiveTab] = useState<'add' | 'view'>('view')

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push('/login')
    }
  }, [isAuthenticated, loading, router])

  const handleLogout = () => {
    logout()
    router.push('/login')
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-accent border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return null
  }

  const completedCount = tasks.filter((t) => t.completed).length
  const totalCount = tasks.length
  const completionRate = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0

  return (
    <main className="min-h-screen bg-background">
      <div className="max-w-6xl mx-auto p-4 md:p-6">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-primary">
                Welcome, {user?.name}!
              </h1>
              <p className="text-muted-foreground mt-2">{user?.profession}</p>
            </div>
            <div className="flex gap-2 w-full md:w-auto">
              <ThemeSwitcher />
              <Button
                onClick={handleLogout}
                variant="outline"
                className="flex items-center gap-2 flex-1 md:flex-none border-border text-foreground hover:bg-secondary"
              >
                <LogOut className="w-4 h-4" />
                Log Out
              </Button>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Card className="bg-card border-border">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-muted-foreground text-sm">Total Tasks</p>
                  <p className="text-3xl font-bold text-primary">{totalCount}</p>
                </div>
                <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center">
                  <Clock className="w-6 h-6 text-accent" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-border">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-muted-foreground text-sm">Completed</p>
                  <p className="text-3xl font-bold text-primary">{completedCount}</p>
                </div>
                <div className="w-12 h-12 rounded-lg bg-green-500/10 flex items-center justify-center">
                  <CheckCircle2 className="w-6 h-6 text-green-600 dark:text-green-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-border">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-muted-foreground text-sm">Completion Rate</p>
                  <p className="text-3xl font-bold text-primary">{completionRate}%</p>
                </div>
                <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center">
                  <span className="text-xl font-bold text-accent">{completionRate}%</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <div className="mb-8">
          <div className="flex gap-2 border-b border-border">
            <button
              onClick={() => setActiveTab('view')}
              className={`px-4 py-3 font-medium transition-colors ${
                activeTab === 'view'
                  ? 'text-accent border-b-2 border-accent'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              View Tasks
            </button>
            <button
              onClick={() => setActiveTab('add')}
              className={`px-4 py-3 font-medium transition-colors ${
                activeTab === 'add'
                  ? 'text-accent border-b-2 border-accent'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              Add Task
            </button>
          </div>
        </div>

        {/* Content */}
        {activeTab === 'view' && <TaskList />}

        {activeTab === 'add' && (
          <div className="max-w-2xl">
            <TaskForm onClose={() => setActiveTab('view')} />
          </div>
        )}
      </div>
    </main>
  )
}
