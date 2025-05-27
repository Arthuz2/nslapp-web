import { UserRound } from 'lucide-react'

interface SidebarUserProfileProps {
  name: string
  classRoom: string
  isCollapsed: boolean
}

export function SidebarUserProfile({
  isCollapsed,
  name,
  classRoom,
}: SidebarUserProfileProps) {
  return (
    <div className="flex items-center gap-2">
      <UserRound className="h-8 w-8" />
      {!isCollapsed && (
        <div className="flex flex-col">
          <span className="text-foreground font-semibold">{name}</span>
          <span className="text-muted-foreground text-sm">{classRoom}</span>
        </div>
      )}
    </div>
  )
}
