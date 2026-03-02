import SignupForm from '@/components/SignupForm'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Sign Up - TaskFlow',
  description: 'Create a new TaskFlow account to start managing your tasks',
}

export default function SignupPage() {
  return <SignupForm />
}
