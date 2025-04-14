import {
  Bot,
  CalendarDays,
  Cog,
  Home,
  LineChart,
  MessageCircle,
  ScrollText,
} from 'lucide-react'

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  useSidebar,
} from '@/components/ui/sidebar'

import { AppSidebarHeader } from './app-sidebar-header'
import { SidebarNavItem } from './sidebar-nav-item'
import { SidebarUserProfile } from './sidebar-user-profile'

const sidebarMenuButtons = [
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

export function AppSidebar() {
  const { state } = useSidebar()
  const isCollapsed = state === 'collapsed'

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
              icon={button.icon}
              title={button.title}
              route={button.route}
              isCollapsed={isCollapsed}
            />
          ))}
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="space-y-2">
        <SidebarNavItem
          icon={<Cog />}
          title="Configurações"
          route="/configuracoes"
          isCollapsed={isCollapsed}
          className={isCollapsed ? 'mb-8' : ''}
        />
        {!isCollapsed && <SidebarUserProfile />}
      </SidebarFooter>
    </Sidebar>
  )
}
