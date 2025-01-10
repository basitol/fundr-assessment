import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Copy } from 'lucide-react'
import { toast } from 'sonner'

interface AccountCardProps {
  bankName: string
  accountNumber: string
}

export function AccountCard({ bankName, accountNumber }: AccountCardProps) {
  const handleCopy = () => {
    navigator.clipboard.writeText(accountNumber)
    toast.success('Account number copied to clipboard')
  }

  return (
    <Card className="max-w-xs px-7 py-4 shadow-none">
      <CardHeader className="p-0">
        <CardTitle className="text-xs font-normal text-muted-foreground">
          ACCOUNT DETAILS
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="space-y-1">
          <p className="text-sm font-medium">{bankName}</p>
          <div className="flex items-center justify-between gap-2">
            <span className="text-2xl font-bold">{accountNumber}</span>
            <Button
              variant="secondary"
              size="sm"
              className="h-8 cursor-pointer bg-[#9F56D433] text-[#9F56D4] hover:bg-[#9F56D433] hover:text-[#9F56D4]"
              onClick={handleCopy}
            >
              <Copy className="mr-1 h-4 w-4" />
              Copy
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
