'use client'

import { IoNotificationsOutline } from 'react-icons/io5'
import Image from 'next/image'

export default function Navbar() {
  return (
    <nav className="h-16 border-b border-gray-200 bg-white fixed top-0 left-0 right-0 z-10">
      <div className="h-full flex items-center justify-between max-w-screen-2xl mx-auto px-8">
        <div>
          <Image src="/fundr-logo.svg" alt="FundR Logo" width={120} height={24} priority className="mt-1" />
        </div>
        <div className="flex items-center gap-4">
          <button className="p-2 hover:bg-gray-100 rounded-full">
            <IoNotificationsOutline className="w-6 h-6 text-gray-600" />
          </button>
          <button className="flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500 text-white text-sm">
            <span>GA</span>
          </button>
        </div>
      </div>
    </nav>
  )
}
