import React from 'react'
import { render as rtlRender, RenderResult } from '@testing-library/react'
import { configureStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
import dashboardReducer from '@/redux/features/dashboardSlice'
import transactionReducer from '@/redux/features/transactions/transactionSlice'
import type { RootState } from '@/redux/store'

interface ExtendedRenderOptions {
  preloadedState?: Partial<RootState>
  store?: ReturnType<typeof configureStore>
}

type ExtendedRenderResult = RenderResult & {
  store: ReturnType<typeof configureStore>
}

function render(
  ui: React.ReactElement,
  {
    preloadedState = {},
    store = configureStore({
      reducer: {
        dashboard: dashboardReducer,
        transactions: transactionReducer,
      },
      preloadedState,
    }),
    ...renderOptions
  }: ExtendedRenderOptions = {}
): ExtendedRenderResult {
  function Wrapper({ children }: { children: React.ReactNode }) {
    return <Provider store={store}>{children}</Provider>
  }

  const renderResult = rtlRender(ui, { wrapper: Wrapper, ...renderOptions })

  return {
    store,
    ...renderResult,
  } as ExtendedRenderResult
}

// Re-export everything
export * from '@testing-library/react'

// Override render method
export { render }

// Common test data
export const mockRevenueData = [
  { name: 'Jan', total: 280000 },
  { name: 'Feb', total: 420000 },
  { name: 'Mar', total: 380000 },
  { name: 'Apr', total: 320000 },
  { name: 'May', total: 150000 },
]

export const mockInitialState = {
  dashboard: {
    selectedTimeframe: '7days',
    revenueData: mockRevenueData,
    totalRevenue: 1550000,
    percentageChange: 5.2,
    loading: false,
    error: null,
  },
  transactions: {
    transactions: [],
    loading: false,
    error: null,
    selectedAccount: 'all',
    dateRange: {
      from: null,
      to: null,
    },
  },
}
