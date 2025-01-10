import { NextResponse } from 'next/server'

const transactions = [
  {
    id: '1',
    amount: 43644,
    transactionId: 'TR_8401857902',
    type: 'Transfer',
    date: 'Feb 12, 2022',
    time: '10:30AM',
    status: 'Processed',
    accountType: 'savings',
  },
  {
    id: '2',
    amount: 35471,
    transactionId: 'TR_8401857902',
    type: 'Withdrawal',
    date: 'Feb 12, 2022',
    time: '10:30AM',
    status: 'Failed',
    accountType: 'current',
  },
  {
    id: '3',
    amount: 43644,
    transactionId: 'TR_8401857902',
    type: 'Deposit',
    date: 'Feb 12, 2022',
    time: '10:30AM',
    status: 'Processed',
    accountType: 'savings',
  },
  {
    id: '4',
    amount: 35471,
    transactionId: 'TR_8401857902',
    type: 'Request',
    date: 'Feb 12, 2022',
    time: '10:30AM',
    status: 'Failed',
    accountType: 'current',
  },
  {
    id: '5',
    amount: 12000,
    transactionId: 'TR_8401857903',
    type: 'Deposit',
    date: 'Feb 15, 2022',
    time: '02:15PM',
    status: 'Processed',
    accountType: 'savings',
  },
  {
    id: '6',
    amount: 20000,
    transactionId: 'TR_8401857904',
    type: 'Withdrawal',
    date: 'Feb 18, 2022',
    time: '11:45AM',
    status: 'Processed',
    accountType: 'current',
  },
  {
    id: '7',
    amount: 15000,
    transactionId: 'TR_8401857905',
    type: 'Transfer',
    date: 'Feb 20, 2022',
    time: '09:00AM',
    status: 'Failed',
    accountType: 'savings',
  },
  {
    id: '8',
    amount: 8000,
    transactionId: 'TR_8401857906',
    type: 'Request',
    date: 'Feb 22, 2022',
    time: '03:30PM',
    status: 'Processed',
    accountType: 'current',
  },
  {
    id: '9',
    amount: 5000,
    transactionId: 'TR_8401857907',
    type: 'Deposit',
    date: 'Feb 25, 2022',
    time: '10:15AM',
    status: 'Processed',
    accountType: 'savings',
  },
  {
    id: '10',
    amount: 25000,
    transactionId: 'TR_8401857908',
    type: 'Withdrawal',
    date: 'Feb 28, 2022',
    time: '01:45PM',
    status: 'Failed',
    accountType: 'current',
  },
  {
    id: '11',
    amount: 18000,
    transactionId: 'TR_8401857909',
    type: 'Transfer',
    date: 'Mar 01, 2022',
    time: '04:30PM',
    status: 'Processed',
    accountType: 'savings',
  },
  {
    id: '12',
    amount: 22000,
    transactionId: 'TR_8401857910',
    type: 'Deposit',
    date: 'Mar 05, 2022',
    time: '12:00PM',
    status: 'Processed',
    accountType: 'savings',
  },
  {
    id: '13',
    amount: 3000,
    transactionId: 'TR_8401857911',
    type: 'Withdrawal',
    date: 'Mar 08, 2022',
    time: '08:15AM',
    status: 'Processed',
    accountType: 'current',
  },
  {
    id: '14',
    amount: 7000,
    transactionId: 'TR_8401857912',
    type: 'Request',
    date: 'Mar 10, 2022',
    time: '02:45PM',
    status: 'Failed',
    accountType: 'savings',
  },
  {
    id: '15',
    amount: 14000,
    transactionId: 'TR_8401857913',
    type: 'Transfer',
    date: 'Mar 12, 2022',
    time: '06:30PM',
    status: 'Processed',
    accountType: 'current',
  },
]

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const accountType = searchParams.get('accountType')
  const startDate = searchParams.get('startDate')
  const endDate = searchParams.get('endDate')

  let filteredTransactions = [...transactions]

  if (accountType && accountType !== 'all') {
    filteredTransactions = filteredTransactions.filter(
      (t) => t.accountType === accountType
    )
  }

  if (startDate && endDate) {
    const start = new Date(startDate)
    const end = new Date(endDate)
    filteredTransactions = filteredTransactions.filter((t) => {
      const transactionDate = new Date(t.date)
      return transactionDate >= start && transactionDate <= end
    })
  }

  return NextResponse.json({
    data: filteredTransactions,
    total: filteredTransactions.length,
  })
}
