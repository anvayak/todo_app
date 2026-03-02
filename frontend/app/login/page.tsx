import LoginForm from '@/components/LoginForm'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Log In - TaskFlow',
  description: 'Log in to your TaskFlow account to access your tasks',
}

export default function LoginPage() {
  return <LoginForm />
}
