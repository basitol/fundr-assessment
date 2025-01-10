'use client'

import { useEffect } from 'react'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { AccountCard } from '@/components/dashboard/account-card'
import { DateRangePicker } from '@/components/dashboard/date-range-picker'
import { TimeframeTabs } from '@/components/dashboard/timeframe-tabs'
import { RevenueChart } from '@/components/dashboard/revenue-chart'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import {
  setTimeframe,
  fetchDashboardData,
} from '@/redux/features/dashboardSlice'
import { TimeframeType, RevenueDataPoint } from '@/types/dashboard'

export default function DashboardPage() {
  const dispatch = useAppDispatch()
  const { selectedTimeframe, totalRevenue, percentageChange, revenueData } =
    useAppSelector((state) => state.dashboard)

  useEffect(() => {
    dispatch(fetchDashboardData())
  }, [dispatch])

  const handleTimeframeChange = (timeframe: TimeframeType) => {
    dispatch(setTimeframe(timeframe))
    dispatch(fetchDashboardData())
  }

  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="ml-2 w-fit border-b border-blue-500 pb-2 text-2xl font-semibold">
          Online Payments
        </h1>
        <div className="border-b"></div>
      </div>

      <AccountCard bankName="STERLING BANK" accountNumber="8000000000" />

      <Card className="bg-transparent">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground">
              Showing data for
            </span>
            <DateRangePicker />
          </div>
          <TimeframeTabs
            selected={selectedTimeframe}
            onChange={handleTimeframeChange}
          />
        </CardHeader>
        <CardContent>
          <div className="space-y-4 rounded-[6px] bg-white p-7">
            <div>
              <div className="flex items-baseline gap-2">
                <h2 className="text-2xl font-bold">Revenue</h2>
                <span
                  className={`text-sm font-light ${percentageChange >= 0 ? 'text-green-500' : 'text-red-500'}`}
                >
                  {percentageChange >= 0 ? '+' : ''}
                  {percentageChange.toFixed(2)}%
                </span>
                <span className="text-sm font-light text-muted-foreground">
                  vs Last {selectedTimeframe}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <p className="text-3xl font-bold">
                  ₦{totalRevenue.toLocaleString()}
                </p>
                <p className="text-sm text-muted-foreground">in total value</p>
              </div>
            </div>
            <RevenueChart chartData={revenueData as RevenueDataPoint[]} />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
