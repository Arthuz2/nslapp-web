import {
  Bot,
  CalendarDays,
  Home,
  LineChart,
  MessageCircle,
  ScrollText,
} from 'lucide-react'
import type React from 'react'
import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarRail,
  useSidebar,
} from '@/components/ui/sidebar'

import { AppSidebarHeader } from './components/app-sidebar-header'
import { SidebarNavItem } from './components/sidebar-nav-item'
import { SidebarUserProfile } from './components/sidebar-user-profile'

export type SidebarMenuButtonProps = {
  title: string
  icon: React.ReactElement<{ className?: string }>
  route?: string
  items?: {
    title: string
    route: string
  }[]
}

const sidebarUser = {
  name: 'Arthur Porcino Pereira',
  classRoom: '3ªIM01-EMI-IPI',
}

const sidebarMenuButtons: SidebarMenuButtonProps[] = [
  {
    title: 'Home',
    icon: <Home />,
    route: '/',
  },
  {
    title: 'Desempenho',
    icon: <LineChart />,
    route: '/desempenho',
  },
  {
    title: 'Provas',
    icon: <ScrollText />,
    route: '/provas',
  },
  {
    title: 'Calendário',
    icon: <CalendarDays />,
    route: '/calendario',
  },
  {
    title: 'Chat',
    icon: <MessageCircle />,
    route: '/chat',
  },
  {
    title: 'A.I',
    icon: <Bot />,
    route: '/ia',
  },
]

export function StudentSidebar() {
  const { state, setOpen } = useSidebar()
  const location = useLocation()
  const isCollapsed = state === 'collapsed'

  // Auto-collapse sidebar for A.I and Chat pages
  useEffect(() => {
    const chatAndAiRoutes = ['/chat', '/ia']
    if (chatAndAiRoutes.includes(location.pathname)) {
      setOpen(false)
    }
  }, [location.pathname, setOpen])

  return (
    <Sidebar variant="inset" collapsible="icon">
      <SidebarHeader>
        <AppSidebarHeader />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup className="mt-3 space-y-2">
          <SidebarGroupLabel className="text-base">
            Principais
          </SidebarGroupLabel>
          {sidebarMenuButtons.map((button) => (
            <SidebarNavItem
              key={button.route}
              title={button.title}
              icon={button.icon}
              route={button.route}
              items={button.items}
              isCollapsed={isCollapsed}
              className={isCollapsed ? 'flex items-center justify-center' : ''}
            />
          ))}
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="space-y-2">
        <SidebarUserProfile
          isCollapsed={isCollapsed}
          name={sidebarUser.name}
          classRoom={sidebarUser.classRoom}
        />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
