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
  SidebarRail,
  useSidebar,
} from '@/components/ui/sidebar'

import { AppSidebarHeader } from './app-sidebar-header'
import { SidebarNavItem } from './sidebar-nav-item'
import { SidebarUserProfile } from './sidebar-user-profile'

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
    items: [
      { title: 'Geral', route: '/geral' },
      { title: 'Por Disciplina', route: '/disciplina' },
    ],
  },
  {
    title: 'Provas',
    icon: <ScrollText />,
    route: '/provas',
    items: [
      { title: 'Lançar Provas', route: '/lancar' },
      { title: 'Ver Resultados', route: '/resultados' },
    ],
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
        <SidebarNavItem
          icon={<Cog />}
          title="Configurações"
          route="/configuracoes"
          isCollapsed={isCollapsed}
          className={isCollapsed ? 'mb-8' : ''}
        />
        {!isCollapsed && (
          <SidebarUserProfile
            name={sidebarUser.name}
            classRoom={sidebarUser.classRoom}
          />
        )}
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
