import { cn } from '@/lib/utils'

interface StatusBadgeProps {
  status: 'Processed' | 'Failed'
}

export function StatusBadge({ status }: StatusBadgeProps) {
  return (
    <span
      className={cn(
        'mx-auto inline-flex h-[30px] w-[106px] items-center justify-center rounded-full text-xs font-medium',
        status === 'Processed'
          ? 'border border-[#92EF80] bg-[#EFFDED]'
          : 'border border-[#F14156] bg-[#FEECEE]'
      )}
    >
      <span
        className={cn(
          'mr-1 h-2 w-2 rounded-full',
          status === 'Processed' ? 'bg-[#92EF80]' : 'bg-[#F14156]'
        )}
      />
      <span
        className={status === 'Processed' ? 'text-[#144909]' : 'text-[#740613]'}
      >
        {status}
      </span>
    </span>
  )
}
