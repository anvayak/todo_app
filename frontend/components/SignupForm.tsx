'use client'

import { useState } from 'react'
import { useAuth } from '@/context/AuthContext'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ThemeSwitcher } from '@/components/ThemeSwitcher'
import Link from 'next/link'

export default function SignupForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    contact: '',
    profession: '',
  })
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const { signup } = useAuth()
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    try {
      if (!formData.name || !formData.email || !formData.contact || !formData.profession) {
        setError('All fields are required')
        setIsLoading(false)
        return
      }

      if (!formData.email.includes('@')) {
        setError('Please enter a valid email')
        setIsLoading(false)
        return
      }

      signup(formData)
      router.push('/dashboard')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Signup failed')
    } finally {
      setIsLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4 relative">
      <div className="absolute top-4 right-4">
        <ThemeSwitcher />
      </div>
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-2">
          <CardTitle className="text-3xl font-bold text-primary">Create Account</CardTitle>
          <CardDescription>Join TaskFlow and start managing your tasks</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="p-3 rounded-lg bg-destructive/10 text-destructive text-sm">
                {error}
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="name" className="text-foreground font-medium">
                Full Name
              </Label>
              <Input
                id="name"
                name="name"
                placeholder="John Doe"
                value={formData.name}
                onChange={handleChange}
                disabled={isLoading}
                className="bg-secondary border-border focus:ring-accent"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-foreground font-medium">
                Email Address
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="john@example.com"
                value={formData.email}
                onChange={handleChange}
                disabled={isLoading}
                className="bg-secondary border-border focus:ring-accent"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="contact" className="text-foreground font-medium">
                Contact Number
              </Label>
              <Input
                id="contact"
                name="contact"
                placeholder="+1 (555) 000-0000"
                value={formData.contact}
                onChange={handleChange}
                disabled={isLoading}
                className="bg-secondary border-border focus:ring-accent"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="profession" className="text-foreground font-medium">
                Profession
              </Label>
              <Input
                id="profession"
                name="profession"
                placeholder="e.g., Software Engineer"
                value={formData.profession}
                onChange={handleChange}
                disabled={isLoading}
                className="bg-secondary border-border focus:ring-accent"
              />
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-accent hover:bg-accent/90 text-accent-foreground font-semibold h-10"
            >
              {isLoading ? 'Creating Account...' : 'Sign Up'}
            </Button>

            <div className="text-center text-sm text-muted-foreground">
              Already have an account?{' '}
              <Link href="/login" className="text-accent hover:underline font-medium">
                Log In
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
