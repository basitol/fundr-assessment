'use client'

import { Button } from '@/components/ui/button'
import { TimeframeType } from '@/types/dashboard'
import { useCallback } from 'react'

interface TimeframeTabsProps {
  selected?: TimeframeType
  onChange: (value: TimeframeType) => void
}

export function TimeframeTabs({
  selected = '7days',
  onChange,
}: TimeframeTabsProps) {
  const handleChange = useCallback(
    (value: TimeframeType) => {
      if (onChange) {
        onChange(value)
      }
    },
    [onChange]
  )

  return (
    <div className="flex items-center gap-2">
      <Button
        variant={selected === 'today' ? 'secondary' : 'ghost'}
        size="sm"
        className={
          selected === 'today' ? 'bg-[#00C6FB0F] hover:bg-[#00C6FB0F]' : ''
        }
        onClick={() => handleChange('today')}
      >
        Today
      </Button>
      <Button
        variant={selected === '7days' ? 'secondary' : 'ghost'}
        size="sm"
        className={
          selected === '7days' ? 'bg-[#00C6FB0F] hover:bg-[#00C6FB0F]' : ''
        }
        onClick={() => handleChange('7days')}
      >
        Last 7 days
      </Button>
      <Button
        variant={selected === '30days' ? 'secondary' : 'ghost'}
        size="sm"
        className={
          selected === '30days' ? 'bg-[#00C6FB0F] hover:bg-[#00C6FB0F]' : ''
        }
        onClick={() => handleChange('30days')}
      >
        Last 30 days
      </Button>
    </div>
  )
}
