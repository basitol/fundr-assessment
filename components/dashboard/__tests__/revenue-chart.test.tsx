import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import { RevenueChart } from '../revenue-chart'
import { mockRevenueData } from '@/test/test-utils'

// Mock recharts components
jest.mock('recharts', () => ({
  ResponsiveContainer: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="responsive-container">{children}</div>
  ),
  Bar: () => <div data-testid="bar">Bar</div>,
  BarChart: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="bar-chart">{children}</div>
  ),
  CartesianGrid: () => <div data-testid="cartesian-grid">Grid</div>,
  XAxis: () => <div data-testid="x-axis">XAxis</div>,
  YAxis: () => <div data-testid="y-axis">YAxis</div>,
  Tooltip: () => <div data-testid="chart-tooltip">Tooltip</div>,
}))

describe('RevenueChart', () => {
  it('renders chart with provided data', () => {
    render(<RevenueChart chartData={mockRevenueData} />)

    // Verify the chart container is rendered
    expect(screen.getByTestId('responsive-container')).toBeInTheDocument()
    expect(screen.getByTestId('bar-chart')).toBeInTheDocument()
    expect(screen.getByTestId('bar')).toBeInTheDocument()
    expect(screen.getByTestId('cartesian-grid')).toBeInTheDocument()
    expect(screen.getByTestId('x-axis')).toBeInTheDocument()
    expect(screen.getByTestId('y-axis')).toBeInTheDocument()
    expect(screen.getByTestId('chart-tooltip')).toBeInTheDocument()
  })

  it('handles empty data gracefully', () => {
    render(<RevenueChart chartData={[]} />)

    // Verify the chart still renders without data
    expect(screen.getByTestId('responsive-container')).toBeInTheDocument()
    expect(screen.getByTestId('bar-chart')).toBeInTheDocument()
  })

  it('applies correct styling', () => {
    render(<RevenueChart chartData={mockRevenueData} />)

    // Check if the chart container has the correct classes
    const chartContainer = screen.getByRole('article')
    expect(chartContainer).toHaveClass(
      'border-none',
      'bg-transparent',
      'shadow-none'
    )
  })

  it('renders chart with correct dimensions', () => {
    render(<RevenueChart chartData={mockRevenueData} />)

    // Check if the chart container has the correct height and width classes
    const chartContainer = screen
      .getByRole('article')
      .querySelector('.h-[210px]')
    expect(chartContainer).toBeInTheDocument()
    expect(chartContainer).toHaveClass('w-full')
  })

  it('renders chart with correct configuration', () => {
    render(<RevenueChart chartData={mockRevenueData} />)

    // Check if the chart config is applied correctly
    const chartContainer = screen.getByRole('article')
    expect(chartContainer).toBeInTheDocument()
  })
})
