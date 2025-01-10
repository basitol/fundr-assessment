import '@testing-library/jest-dom'
import { render, screen, waitFor } from '@testing-library/react'
import DashboardPage from '../page'
import { mockInitialState } from '@/test/test-utils'

// Mock the chart component since we don't need to test its internal rendering
jest.mock('@/components/dashboard/revenue-chart', () => ({
  RevenueChart: () => <div data-testid="revenue-chart">Revenue Chart</div>,
}))

// Mock the date range picker for simplicity
jest.mock('@/components/ui/date-range-picker', () => ({
  DateRangePicker: () => <div data-testid="date-range-picker">Date Range Picker</div>,
}))

// Mock the timeframe tabs
jest.mock('@/components/ui/timeframe-tabs', () => ({
  TimeframeTabs: () => <div data-testid="timeframe-tabs">Timeframe Tabs</div>,
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
    const { store } = render(<DashboardPage />, {
      preloadedState: mockInitialState,
    })

    await waitFor(() => {
      expect(fetchDashboardData).toHaveBeenCalled()
    })
  })

  it('displays correct timeframe information', () => {
    render(<DashboardPage />, { preloadedState: mockInitialState })

    expect(screen.getByTestId('timeframe-tabs')).toBeInTheDocument()
    expect(screen.getByTestId('date-range-picker')).toBeInTheDocument()
  })

  it('handles positive and negative percentage changes correctly', () => {
    const stateWithPositiveChange = {
      ...mockInitialState,
      dashboard: {
        ...mockInitialState.dashboard,
        percentageChange: 5.2,
      },
    }
    const { rerender } = render(<DashboardPage />, {
      preloadedState: stateWithPositiveChange,
    })

    expect(screen.getByText(/\+5\.2%/)).toBeInTheDocument()

    const stateWithNegativeChange = {
      ...mockInitialState,
      dashboard: {
        ...mockInitialState.dashboard,
        percentageChange: -3.8,
      },
    }
    rerender(<DashboardPage />)
    render(<DashboardPage />, {
      preloadedState: stateWithNegativeChange,
    })

    expect(screen.getByText(/-3\.8%/)).toBeInTheDocument()
  })

  it('formats currency values correctly', () => {
    const state = {
      ...mockInitialState,
      dashboard: {
        ...mockInitialState.dashboard,
        totalRevenue: 1550000,
      },
    }
    render(<DashboardPage />, { preloadedState: state })

    expect(screen.getByText(/\$1,550,000/)).toBeInTheDocument()
  })

  it('handles loading state correctly', () => {
    const loadingState = {
      ...mockInitialState,
      dashboard: {
        ...mockInitialState.dashboard,
        loading: true,
      },
    }
    render(<DashboardPage />, { preloadedState: loadingState })

    expect(screen.getByTestId('revenue-chart')).toBeInTheDocument()
  })
})
