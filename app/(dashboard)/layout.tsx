'use client'

import Navbar from '@/components/layout/Navbar'
import Sidebar from '@/components/layout/Sidebar'
import { Toaster } from 'sonner';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-background">
      <Toaster />
      <Navbar />
      <div className="flex min-h-screen pt-16">
        <Sidebar />
        <div className="flex-1 ml-64 bg-[#fbfbfb]">{children}</div>
      </div>
    </div>
  )
}