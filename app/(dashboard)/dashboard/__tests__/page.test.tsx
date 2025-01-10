import '@testing-library/jest-dom'
import { screen, waitFor } from '@testing-library/react'
import DashboardPage from '../page'
import { render, mockInitialState } from '@/test/test-utils'
import { fetchDashboardData } from '@/redux/features/dashboardSlice'

// Mock the chart component since we don't need to test its internal rendering
jest.mock('@/components/dashboard/revenue-chart', () => ({
  RevenueChart: () => <div data-testid="revenue-chart">Revenue Chart</div>,
}))

// Mock the date range picker for simplicity
jest.mock('@/components/dashboard/date-range-picker', () => ({
  DateRangePicker: () => <div>Date Range Picker</div>,
}))

// Mock the async thunk
jest.mock('@/redux/features/dashboardSlice', () => ({
  ...jest.requireActual('@/redux/features/dashboardSlice'),
  fetchDashboardData: jest.fn(() => ({
    type: 'dashboard/fetchDashboardData/pending',
  })),
}))

describe('DashboardPage', () => {
  beforeEach(() => {
    // Clear all mocks before each test
    jest.clearAllMocks()
  })

  it('renders dashboard page with all components', () => {
    render(<DashboardPage />, { preloadedState: mockInitialState })

    // Check if main components are rendered
    expect(screen.getByText('Online Payments')).toBeInTheDocument()
    expect(screen.getByTestId('revenue-chart')).toBeInTheDocument()
    expect(screen.getByText('Revenue')).toBeInTheDocument()

    // Check if the revenue amount is displayed correctly
    expect(screen.getByText('₦1,550,000')).toBeInTheDocument()

    // Check if percentage change is displayed
    expect(screen.getByText('+5.20%')).toBeInTheDocument()
  })

  it('fetches dashboard data on mount', async () => {
    render(<DashboardPage />, { preloadedState: mockInitialState })

    await waitFor(() => {
      expect(fetchDashboardData).toHaveBeenCalled()
    })
  })

  it('displays correct timeframe information', () => {
    render(<DashboardPage />, { preloadedState: mockInitialState })
    expect(screen.getByText('vs Last 7days')).toBeInTheDocument()
  })

  it('handles positive and negative percentage changes correctly', () => {
    // Test with negative percentage
    render(<DashboardPage />, {
      preloadedState: {
        dashboard: {
          ...mockInitialState.dashboard!,
          percentageChange: -2.5,
        },
      },
    })

    const negativePercentage = screen.getByText('-2.50%')
    expect(negativePercentage).toHaveClass('text-red-500')

    // Test with positive percentage
    render(<DashboardPage />, { preloadedState: mockInitialState })
    const positivePercentage = screen.getByText('+5.20%')
    expect(positivePercentage).toHaveClass('text-green-500')
  })

  it('formats currency values correctly', () => {
    render(<DashboardPage />, { preloadedState: mockInitialState })
    const formattedRevenue = screen.getByText('₦1,550,000')
    expect(formattedRevenue).toBeInTheDocument()
  })

  it('handles loading state correctly', () => {
    render(<DashboardPage />, {
      preloadedState: {
        dashboard: {
          ...mockInitialState.dashboard!,
          loading: true,
        },
      },
    })

    expect(screen.getByTestId('revenue-chart')).toBeInTheDocument()
  })
})
