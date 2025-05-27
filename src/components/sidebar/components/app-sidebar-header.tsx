import { useSidebar } from '@/components/ui/sidebar'

import { ThemeToggle } from '../../theme/theme-toggle'

export function AppSidebarHeader() {
  const { state } = useSidebar()
  const isCollapsed = state === 'collapsed'

  return (
    <div className="flex items-center justify-center gap-3.5">
      <img
        src="/NSL-Brasao.png"
        alt="Brasão da escola Nossa Senhora de Lourdes"
        className="max-w-10.5"
      />
      {!isCollapsed && (
        <div className="flex w-full items-center justify-between">
          <div className="flex min-w-16 flex-col justify-center">
            <h1 className="text-foreground text-2xl font-bold tracking-tight">
              NSL App
            </h1>
            <span className="text-muted-foreground text-sm">
              Por Arthur Porcino
            </span>
          </div>
          <ThemeToggle />
        </div>
      )}
    </div>
  )
}
