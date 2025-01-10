"use client"

import { Button } from "@/components/ui/button"
import { Download } from 'lucide-react'
import { AccountSelector } from "./account-selector"
import { DateRangeSelector } from "./date-range-selector"
import { TransactionsTable } from "./transactions-table"
import { Pagination } from "./pagination"

export function TransactionsDashboard() {
  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <AccountSelector />
        <div className="flex items-center gap-4">
          <DateRangeSelector />
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
        </div>
      </div>
      
      <TransactionsTable />
      
      <Pagination
        currentPage={1}
        totalPages={9}
        onPageChange={(page) => console.log(`Navigate to page ${page}`)}
      />
    </div>
  )
}

