import { Outlet } from 'react-router-dom'

import { AppSidebar } from '@/components/sidebar/app-sidebar'
import { Separator } from '@/components/ui/separator'
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'

import { PageTitle } from './page-title'

export function DefaultLayout() {
  return (
    <div>
      <SidebarProvider>
        <AppSidebar />
        <main className="mt-2 mr-1.5 mb-1 flex flex-1 flex-col rounded-2xl border p-2 dark:bg-gray-950">
          <div className="flex items-center gap-2">
            <SidebarTrigger size="lg" />
            <Separator orientation="vertical" className="" />
            <PageTitle />
          </div>
          <Separator className="my-2" />
          <div className="mt-1 flex-1 px-3 py-2">
            <Outlet />
          </div>
        </main>
      </SidebarProvider>
    </div>
  )
}
