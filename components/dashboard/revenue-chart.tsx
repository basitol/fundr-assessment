'use client'

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from 'recharts'
import { Card, CardContent } from '@/components/ui/card'
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart'
import { RevenueDataPoint } from '@/types/dashboard'

interface RevenueChartProps {
  chartData: RevenueDataPoint[]
}

export function RevenueChart({ chartData }: RevenueChartProps) {
  const chartConfig = {
    revenue: {
      label: 'Revenue',
      color: '#FFC145',
    },
  } satisfies ChartConfig

  return (
    <Card className="border-none bg-transparent shadow-none">
      <CardContent>
        <ChartContainer
          config={chartConfig}
          className="h-[210px] w-full border-none"
        >
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <YAxis
              tickLine={false}
              tickMargin={10}
              axisLine={true}
              tickFormatter={(value) => `₦${(value / 1000).toFixed(0)}K`}
            />
            <XAxis
              dataKey="name"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar
              dataKey="total"
              fill="var(--color-total)"
              radius={[4, 4, 0, 0]}
              barSize={20}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
