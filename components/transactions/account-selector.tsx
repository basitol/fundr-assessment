'use client'

import * as React from 'react'
import { Check, ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from '@/components/ui/command'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { useDispatch, useSelector } from 'react-redux'
import {
  selectSelectedAccount,
  setSelectedAccount,
} from '@/redux/features/transactions/transactionSlice'

const accounts = [
  { value: 'all', label: 'All Accounts' },
  { value: 'savings', label: 'Savings Account' },
  { value: 'current', label: 'Current Account' },
]

export function AccountSelector() {
  const [open, setOpen] = React.useState(false)
  const dispatch = useDispatch()
  const selectedAccount = useSelector(selectSelectedAccount)

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          role="combobox"
          aria-expanded={open}
          className="justify-between gap-1.5"
        >
          {selectedAccount
            ? accounts.find((account) => account.value === selectedAccount)
                ?.label
            : 'Select account...'}
          <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[180px] p-0">
        <Command>
          <CommandInput placeholder="Search accounts..." />
          <CommandEmpty>No account found.</CommandEmpty>
          <CommandGroup>
            {accounts.map((account) => (
              <CommandItem
                key={account.value}
                value={account.value}
                onSelect={(currentValue) => {
                  dispatch(setSelectedAccount(currentValue))
                  setOpen(false)
                }}
              >
                <Check
                  className={cn(
                    'mr-2 h-4 w-4',
                    selectedAccount === account.value
                      ? 'opacity-100'
                      : 'opacity-0'
                  )}
                />
                {account.label}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
