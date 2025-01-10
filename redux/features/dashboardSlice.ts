// import { createSlice, PayloadAction } from '@reduxjs/toolkit'

// interface RevenueData {
//   name: string
//   total: number
// }

// interface DashboardState {
//   selectedTimeframe: 'today' | '7days' | '30days'
//   revenueData: RevenueData[]
//   totalRevenue: number
//   percentageChange: number
// }

// const initialState: DashboardState = {
//   selectedTimeframe: '7days',
//   revenueData: [
//     { name: "Jan", total: 280000 },
//     { name: "Feb", total: 420000 },
//     { name: "Mar", total: 380000 },
//     { name: "Apr", total: 320000 },
//     { name: "May", total: 150000 },
//     { name: "Jun", total: 220000 },
//     { name: "Jul", total: 190000 },
//     { name: "Aug", total: 210000 },
//     { name: "Sep", total: 180000 },
//     { name: "Oct", total: 200000 },
//     { name: "Nov", total: 240000 },
//     { name: "Dec", total: 0 },
//   ],
//   totalRevenue: 2790000, // Sum of all revenue
//   percentageChange: 5.2,
// }

// export const dashboardSlice = createSlice({
//   name: 'dashboard',
//   initialState,
//   reducers: {
//     setTimeframe: (state, action: PayloadAction<'today' | '7days' | '30days'>) => {
//       state.selectedTimeframe = action.payload
//     },
//     setRevenueData: (state, action: PayloadAction<RevenueData[]>) => {
//       state.revenueData = action.payload
//     },
//     setTotalRevenue: (state, action: PayloadAction<number>) => {
//       state.totalRevenue = action.payload
//     },
//     setPercentageChange: (state, action: PayloadAction<number>) => {
//       state.percentageChange = action.payload
//     },
//   },
// })

// export const {
//   setTimeframe,
//   setRevenueData,
//   setTotalRevenue,
//   setPercentageChange
// } = dashboardSlice.actions

// export default dashboardSlice.reducer

import { TimeframeType, RevenueData } from '@/types/dashboard'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

interface DashboardState {
  revenueData: RevenueData[]
  loading: boolean
  error: string | null
  selectedTimeframe: TimeframeType
  totalRevenue: number
  percentageChange: number
}

const initialState: DashboardState = {
  revenueData: [],
  loading: false,
  error: null,
  selectedTimeframe: 'today',
  totalRevenue: 0,
  percentageChange: 0,
}

export const fetchDashboardData = createAsyncThunk(
  'dashboard/fetchDashboardData',
  async () => {
    console.log('Fetching dashboard data...')
    try {
      const response = await fetch('https://fundr.free.beeceptor.com/dashboard')
      if (!response.ok) {
        throw new Error('Failed to fetch dashboard data')
      }
      const data = await response.json()
      console.log('Dashboard data received:', data)
      return data
    } catch (error) {
      console.error('Error fetching dashboard data:', error)
      throw error
    }
  }
)

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    setTimeframe: (state, action) => {
      console.log('Setting timeframe:', action.payload)
      state.selectedTimeframe = action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDashboardData.pending, (state) => {
        console.log('Dashboard data fetch pending')
        state.loading = true
        state.error = null
      })
      .addCase(fetchDashboardData.fulfilled, (state, action) => {
        console.log('Dashboard data fetch fulfilled:', action.payload)
        state.loading = false
        state.revenueData = action.payload.revenue
        state.totalRevenue = action.payload.totalRevenue || 0
        state.percentageChange = action.payload.percentageChange || 0
      })
      .addCase(fetchDashboardData.rejected, (state, action) => {
        console.error('Dashboard data fetch rejected:', action.error)
        state.loading = false
        state.error = action.error.message || 'Failed to fetch data'
      })
  },
})

export const { setTimeframe } = dashboardSlice.actions
export default dashboardSlice.reducer
