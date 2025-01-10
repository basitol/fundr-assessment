'use client'

import { AccountSelector } from '@/components/transactions/account-selector'
import { DateRangeSelector } from '@/components/transactions/date-range-selector'
import { TransactionsTable } from '@/components/transactions/transactions-table'
import { Button } from '@/components/ui/button'
import { format } from 'date-fns'
import { useAppSelector } from '@/redux/hooks'
import React from 'react'
import { CloudUpload } from 'lucide-react'

export default function TransactionsPage() {
  const { transactions } = useAppSelector((state) => state.transactions)

  const exportToCSV = () => {
    // Create CSV headers
    const headers = ['Amount', 'Type', 'Account', 'Date', 'Time', 'Status']

    // Convert transactions to CSV rows
    const csvRows = transactions.map((t) => [
      t.amount,
      t.type,
      t.accountType.replace('_', ' '),
      format(new Date(t.date), 'MMM dd, yyyy'),
      format(new Date(t.time), 'hh:mm a'),
      t.status ? 'Processed' : 'Failed',
    ])

    // Combine headers and rows
    const csvContent = [
      headers.join(','),
      ...csvRows.map((row) => row.join(',')),
    ].join('\n')

    // Create and trigger download
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
    const link = document.createElement('a')
    const url = URL.createObjectURL(blob)
    link.setAttribute('href', url)
    link.setAttribute(
      'download',
      `transactions_${format(new Date(), 'yyyy-MM-dd')}.csv`
    )
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <AccountSelector />
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <p>Select Date Range:</p>
            <DateRangeSelector />
          </div>
          <Button
            onClick={exportToCSV}
            variant="outline"
            className="flex items-center gap-2"
          >
            <CloudUpload className="h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      <TransactionsTable />
      {/* 
      <Pagination
        currentPage={1}
        totalPages={9}
        onPageChange={(page) => console.log(`Navigate to page ${page}`)}
      /> */}
    </div>
  )
}
