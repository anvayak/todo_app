'use client'

import { useAuth } from '@/context/AuthContext'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { ThemeSwitcher } from '@/components/ThemeSwitcher'
import { CheckCircle2, Clock, Zap, BarChart3 } from 'lucide-react'
import Link from 'next/link'

export default function Home() {
  const { isAuthenticated, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading && isAuthenticated) {
      router.push('/dashboard')
    }
  }, [isAuthenticated, loading, router])

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

  return (
    <main className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b border-border bg-card">
        <div className="max-w-6xl mx-auto px-4 md:px-6 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-primary">TaskFlow</h1>
          <div className="flex gap-3 items-center">
            <ThemeSwitcher />
            <Button
              variant="outline"
              asChild
              className="border-border text-foreground hover:bg-secondary"
            >
              <Link href="/login">Log In</Link>
            </Button>
            <Button asChild className="bg-accent hover:bg-accent/90 text-accent-foreground">
              <Link href="/signup">Sign Up</Link>
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-6xl mx-auto px-4 md:px-6 py-16 md:py-24">
        <div className="text-center space-y-6">
          <h2 className="text-4xl md:text-6xl font-bold text-primary text-balance">
            Manage Your Tasks Effortlessly
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto text-balance">
            TaskFlow helps you organize, prioritize, and complete your work with ease. Stay on top
            of your goals and boost your productivity.
          </p>
          <div className="flex flex-col md:flex-row gap-4 justify-center pt-4">
            <Button
              asChild
              size="lg"
              className="bg-accent hover:bg-accent/90 text-accent-foreground h-12 text-base font-semibold"
            >
              <Link href="/signup">Get Started Free</Link>
            </Button>
            <Button
              variant="outline"
              size="lg"
              asChild
              className="border-border text-foreground hover:bg-secondary h-12 text-base font-semibold"
            >
              <Link href="/login">Log In</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-card border-t border-border py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-4 md:px-6">
          <h3 className="text-3xl md:text-4xl font-bold text-primary text-center mb-12">
            Why Choose TaskFlow?
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Feature 1 */}
            <div className="p-6 rounded-lg border border-border bg-background hover:border-accent/50 transition-colors">
              <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center mb-4">
                <CheckCircle2 className="w-6 h-6 text-accent" />
              </div>
              <h4 className="text-lg font-semibold text-foreground mb-2">Easy to Use</h4>
              <p className="text-muted-foreground text-sm">
                Intuitive interface designed for simplicity and efficiency
              </p>
            </div>

            {/* Feature 2 */}
            <div className="p-6 rounded-lg border border-border bg-background hover:border-accent/50 transition-colors">
              <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center mb-4">
                <Clock className="w-6 h-6 text-accent" />
              </div>
              <h4 className="text-lg font-semibold text-foreground mb-2">Track Time</h4>
              <p className="text-muted-foreground text-sm">
                Monitor task duration and manage your time effectively
              </p>
            </div>

            {/* Feature 3 */}
            <div className="p-6 rounded-lg border border-border bg-background hover:border-accent/50 transition-colors">
              <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center mb-4">
                <Zap className="w-6 h-6 text-accent" />
              </div>
              <h4 className="text-lg font-semibold text-foreground mb-2">Organize</h4>
              <p className="text-muted-foreground text-sm">
                Categorize tasks by type and set clear deadlines
              </p>
            </div>

            {/* Feature 4 */}
            <div className="p-6 rounded-lg border border-border bg-background hover:border-accent/50 transition-colors">
              <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center mb-4">
                <BarChart3 className="w-6 h-6 text-accent" />
              </div>
              <h4 className="text-lg font-semibold text-foreground mb-2">Track Progress</h4>
              <p className="text-muted-foreground text-sm">
                See your completion rate and stay motivated
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-6xl mx-auto px-4 md:px-6 py-16 md:py-24 text-center">
        <h3 className="text-3xl md:text-4xl font-bold text-primary mb-6">
          Ready to boost your productivity?
        </h3>
        <Button
          asChild
          size="lg"
          className="bg-accent hover:bg-accent/90 text-accent-foreground h-12 text-base font-semibold"
        >
          <Link href="/signup">Create Your Free Account</Link>
        </Button>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-card py-8 text-center text-muted-foreground">
        <p>&copy; 2024 TaskFlow. All rights reserved.</p>
      </footer>
    </main>
  )
}
