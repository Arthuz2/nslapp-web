import { UserRound } from 'lucide-react'

interface SidebarUserProfileProps {
  name: string
  classRoom: string
}

export function SidebarUserProfile({
  name,
  classRoom,
}: SidebarUserProfileProps) {
  return (
    <div className="flex items-center gap-2">
      <UserRound className="h-8 w-8" />
      <div className="flex flex-col">
        <span className="text-foreground font-semibold">{name}</span>
        <span className="text-muted-foreground text-sm">{classRoom}</span>
      </div>
    </div>
  )
}
