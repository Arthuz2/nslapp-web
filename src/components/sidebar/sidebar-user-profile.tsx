import { UserRound } from 'lucide-react'

export function SidebarUserProfile() {
  return (
    <div className="flex items-center gap-2">
      <UserRound className="h-8 w-8" />
      <div className="flex flex-col">
        <span className="text-foreground font-semibold">
          Arthur Porcino Pereira
        </span>
        <span className="text-muted-foreground text-sm">3ªIM01-EMI-IPI</span>
      </div>
    </div>
  )
}
