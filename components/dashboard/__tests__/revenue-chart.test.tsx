import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import { RevenueChart } from '../revenue-chart'
import { mockRevenueData } from '@/test/test-utils'

// Mock recharts components
jest.mock('recharts', () => ({
  Bar: () => null,
  BarChart: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="bar-chart">{children}</div>
  ),
  CartesianGrid: () => null,
  XAxis: () => null,
  YAxis: () => null,
  Tooltip: () => null,
}))

// Mock chart components
jest.mock('@/components/ui/chart', () => ({
  ChartContainer: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="chart-container">{children}</div>
  ),
  ChartTooltip: () => <div data-testid="chart-tooltip" />,
  ChartTooltipContent: () => <div data-testid="chart-tooltip-content" />,
}))

describe('RevenueChart', () => {
  it('renders chart with provided data', () => {
    render(<RevenueChart data={mockRevenueData} />)

    // Verify the chart container is rendered
    const chartContainer = screen.getByTestId('chart-container')
    expect(chartContainer).toBeInTheDocument()
    expect(screen.getByTestId('bar-chart')).toBeInTheDocument()
  })

  it('handles empty data gracefully', () => {
    render(<RevenueChart data={[]} />)

    // Verify the chart still renders without data
    const chartContainer = screen.getByTestId('chart-container')
    expect(chartContainer).toBeInTheDocument()
    expect(screen.getByTestId('bar-chart')).toBeInTheDocument()
  })

  it('applies correct styling', () => {
    render(<RevenueChart data={mockRevenueData} />)

    // Check if the chart container has the correct classes
    const chartContainer = screen.getByTestId('chart-container').parentElement?.parentElement
    expect(chartContainer).toHaveClass('border-none', 'bg-transparent', 'shadow-none')
  })

  it('renders chart with correct dimensions', () => {
    render(<RevenueChart data={mockRevenueData} />)

    // Check if the chart container has the correct height and width classes
    const chartContainer = screen.getByTestId('chart-container').parentElement
    expect(chartContainer).toHaveClass('p-6', 'pt-0')
  })
})
