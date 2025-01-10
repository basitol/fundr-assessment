'use client'

import * as React from 'react'
import { format } from 'date-fns'
import { DateRange } from 'react-day-picker'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Calendar as CalendarIcon } from 'iconsax-react'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { useDispatch, useSelector } from 'react-redux'
import {
  selectDateRange,
  setDateRange,
} from '@/redux/features/transactions/transactionSlice'

export function DateRangeSelector() {
  const dispatch = useDispatch()
  const dateRange = useSelector(selectDateRange)
  const [date, setDate] = React.useState<DateRange | undefined>({
    from: dateRange.from || undefined,
    to: dateRange.to || undefined,
  })

  const handleSelect = (range: DateRange | undefined) => {
    setDate(range)
    dispatch(
      setDateRange({
        from: range?.from || null,
        to: range?.to || null,
      })
    )
  }

  return (
    <div className="grid gap-2">
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={'outline'}
            className={cn(
              'w-[300px] justify-start text-left font-normal',
              !date && 'text-muted-foreground'
            )}
          >
            <CalendarIcon size={32} color="#71717A" className="mr-2 h-4 w-4" />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, 'LLL dd, y')} -{' '}
                  {format(date.to, 'LLL dd, y')}
                </>
              ) : (
                format(date.from, 'LLL dd, y')
              )
            ) : (
              <span>Pick a date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={handleSelect}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>
    </div>
  )
}
