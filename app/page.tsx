import { redirect } from 'next/navigation'

export default function Home() {
  // Redirect all root traffic to the dashboard
  redirect('/dashboard')
}