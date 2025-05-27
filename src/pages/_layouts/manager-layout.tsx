import { Outlet } from 'react-router-dom'

import { ManagerSidebar } from '@/components/sidebar/manager-sidebar'
import { Separator } from '@/components/ui/separator'
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import { Toaster } from '@/components/ui/sonner'

import { PageTitle } from './page-title'

export function ManagerLayout() {
  return (
    <div className="min-h-screen">
      <SidebarProvider>
        <ManagerSidebar />
        <main className="mt-2 mr-1.5 mb-1 flex min-h-[calc(100vh-0.75rem)] flex-1 flex-col rounded-2xl border p-2 dark:bg-gray-950">
          <div className="flex items-center gap-2">
            <SidebarTrigger size="lg" />
            <Separator orientation="vertical" className="h-6" />
            <PageTitle />
          </div>
          <Separator className="my-2" />
          <div className="min-h-0 flex-1 px-3 py-2">
            <Outlet />
            <Toaster />
          </div>
        </main>
      </SidebarProvider>
    </div>
  )
}
