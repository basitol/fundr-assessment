'use client'

import * as React from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Checkbox } from '@/components/ui/checkbox'
import { format, parseISO } from 'date-fns'
import { StatusBadge } from './status-badge'
import { useDispatch, useSelector } from 'react-redux'
import {
  fetchTransactions,
  selectTransactions,
  selectTransactionsLoading,
  selectSelectedAccount,
  selectDateRange,
} from '@/redux/features/transactions/transactionSlice'
import { AppDispatch } from '@/redux/store'
import { Pagination } from './pagination'

export function TransactionsTable() {
  const dispatch = useDispatch<AppDispatch>()
  const transactions = useSelector(selectTransactions) || [] // Provide default empty array
  const loading = useSelector(selectTransactionsLoading)
  const selectedAccount = useSelector(selectSelectedAccount)
  const dateRange = useSelector(selectDateRange)
  const [selectedRows, setSelectedRows] = React.useState<string[]>([])
  const [currentPage, setCurrentPage] = React.useState(1)
  const itemsPerPage = 10

  React.useEffect(() => {
    dispatch(fetchTransactions({ accountType: selectedAccount, dateRange }))
  }, [dispatch, selectedAccount, dateRange])

  React.useEffect(() => {
    // Reset to first page when filters change
    setCurrentPage(1)
  }, [selectedAccount, dateRange])

  const toggleRow = (id: string) => {
    setSelectedRows((prev) =>
      prev.includes(id) ? prev.filter((rowId) => rowId !== id) : [...prev, id]
    )
  }

  const toggleAll = () => {
    setSelectedRows((prev) =>
      prev.length === paginatedData.length ? [] : paginatedData.map((t) => t.id)
    )
  }

  const formatDate = (dateString: string) => {
    try {
      return format(parseISO(dateString), 'MMM dd, yyyy')
    } catch (error) {
      console.error('Error parsing date:', error)
      return dateString
    }
  }

  const formatTime = (timeString: string) => {
    try {
      return format(parseISO(timeString), 'hh:mm a')
    } catch (error) {
      console.error('Error parsing time:', error)
      return timeString
    }
  }

  const formatAmount = (amount: string) => {
    const num = parseFloat(amount)
    return isNaN(num) ? amount : `₦${num.toFixed(2)}`
  }

  if (loading) {
    return <div>Loading...</div>
  }

  if (!transactions?.length) {
    return <div>No transactions found</div>
  }

  // Calculate pagination
  const totalPages = Math.ceil(transactions.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedData = transactions.slice(
    startIndex,
    startIndex + itemsPerPage
  )

  return (
    <div className="flex flex-col gap-4">
      <div className="rounded-md border-none">
        <Table className="border-none">
          <TableHeader className="border-none capitalize">
            <TableRow className="capitalize">
              <TableHead className="w-[50px] bg-transparent p-4 capitalize">
                <Checkbox
                  checked={
                    paginatedData.length > 0 &&
                    selectedRows.length === paginatedData.length
                  }
                  onCheckedChange={toggleAll}
                />
              </TableHead>
              <TableHead>AMOUNT</TableHead>
              <TableHead>TYPE</TableHead>
              <TableHead>ACCOUNT</TableHead>
              <TableHead>DATE</TableHead>
              <TableHead>TIME</TableHead>
              <TableHead>STATUS</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="bg-white">
            {paginatedData.map((transaction) => (
              <TableRow key={transaction.id} className="">
                <TableCell className="p-4">
                  <Checkbox
                    checked={selectedRows.includes(transaction.id)}
                    onCheckedChange={() => toggleRow(transaction.id)}
                  />
                </TableCell>
                <TableCell>{formatAmount(transaction.amount)}</TableCell>
                <TableCell className="capitalize">{transaction.type}</TableCell>
                <TableCell className="capitalize">
                  {transaction.accountType.replace('_', ' ')}
                </TableCell>
                <TableCell>{formatDate(transaction.date)}</TableCell>
                <TableCell>{formatTime(transaction.time)}</TableCell>
                <TableCell>
                  <StatusBadge
                    status={transaction.status ? 'Processed' : 'Failed'}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <div className="px-4">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  )
}
