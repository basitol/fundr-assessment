'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { IconType } from 'react-icons'
import { 
  RiDashboardLine,
  RiAccountCircleLine,
  RiExchangeLine,
  RiFileListLine,
  RiSettings4Line,
  RiGlobalLine
} from 'react-icons/ri'
import Image from 'next/image'

interface NavItem {
  label: string
  href: string
  icon: IconType
}

const navItems: NavItem[] = [
  { label: 'Get Started', href: '/get-started', icon: RiGlobalLine },
  { label: 'Dashboard', href: '/dashboard', icon: RiDashboardLine },
  { label: 'Accounts', href: '/accounts', icon: RiAccountCircleLine },
  { label: 'Transfers', href: '/transfers', icon: RiExchangeLine },
  { label: 'Transactions', href: '/transactions', icon: RiFileListLine },
  { label: 'Settings', href: '/settings', icon: RiSettings4Line },
]

export default function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="w-64 h-screen fixed left-0 top-0 border-r border-gray-200 bg-white">
      <div className="p-6">
        <Link href="/" className="flex items-center">
          <Image src="/fundr-logo.svg" alt="FundR Logo" width={120} height={24} priority />
        </Link>
      </div>
      <nav className="px-2">
        {navItems.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-2.5 rounded-lg mb-1 text-sm ${
                isActive 
                  ? 'bg-[#3B82F6] text-white' 
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <item.icon className="w-5 h-5" />
              <span>{item.label}</span>
            </Link>
          )
        })}
      </nav>
    </aside>
  )
}
