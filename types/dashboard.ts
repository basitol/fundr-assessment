// types/dashboard.ts
export type TimeframeType = 'today' | '7days' | '30days'

export interface RevenueDataPoint {
  name: string
  total: number
}

export type RevenueData = RevenueDataPoint

export interface DashboardData {
  revenueData: RevenueDataPoint[]
  totalRevenue: number
  percentageChange: number
}
