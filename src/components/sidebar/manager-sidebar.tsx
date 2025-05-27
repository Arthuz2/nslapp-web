import {
  BookOpen,
  Calendar,
  GraduationCap,
  Home,
  LineChart,
  Megaphone,
  MessageCircle,
  School,
  Settings,
  UserCheck,
  Users,
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
  name: 'João Silva',
  classRoom: 'Diretor Geral',
}

const mainMenuButtons: SidebarMenuButtonProps[] = [
  {
    title: 'Dashboard',
    icon: <Home />,
    route: '/gestor',
  },
  {
    title: 'Alunos',
    icon: <GraduationCap />,
    route: '/gestor/alunos',
  },
  {
    title: 'Professores',
    icon: <Users />,
    route: '/gestor/professores',
  },
  {
    title: 'Turmas',
    icon: <School />,
    route: '/gestor/turmas',
  },
  {
    title: 'Disciplinas',
    icon: <BookOpen />,
    route: '/gestor/disciplinas',
  },
]

const academicMenuButtons: SidebarMenuButtonProps[] = [
  {
    title: 'Desempenho',
    icon: <LineChart />,
    route: '/gestor/desempenho',
  },
  {
    title: 'Eletivas',
    icon: <GraduationCap />,
    route: '/gestor/eletivas',
  },
  {
    title: 'Tutoria',
    icon: <UserCheck />,
    route: '/gestor/tutoria',
  },
]

const managementMenuButtons: SidebarMenuButtonProps[] = [
  {
    title: 'Anúncios',
    icon: <Megaphone />,
    route: '/gestor/anuncios',
  },
  {
    title: 'Eventos',
    icon: <Calendar />,
    route: '/gestor/eventos',
  },
]

const communicationMenuButtons: SidebarMenuButtonProps[] = [
  {
    title: 'Chat',
    icon: <MessageCircle />,
    route: '/gestor/chat',
  },
]

export function ManagerSidebar() {
  const { state, setOpen } = useSidebar()
  const location = useLocation()
  const isCollapsed = state === 'collapsed'

  // Auto-collapse sidebar for A.I and Chat pages
  useEffect(() => {
    const chatAndAiRoutes = ['/gestor/chat', '/gestor/ia']
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
          <SidebarGroupLabel className="text-base">Principal</SidebarGroupLabel>
          {mainMenuButtons.map((button) => (
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

        <SidebarGroup className="space-y-2">
          <SidebarGroupLabel className="text-base">Acadêmico</SidebarGroupLabel>
          {academicMenuButtons.map((button) => (
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

        <SidebarGroup className="space-y-2">
          <SidebarGroupLabel className="text-base">Gestão</SidebarGroupLabel>
          {managementMenuButtons.map((button) => (
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

        <SidebarGroup className="space-y-2">
          <SidebarGroupLabel className="text-base">
            Comunicação
          </SidebarGroupLabel>
          {communicationMenuButtons.map((button) => (
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
          icon={<Settings />}
          title="Configurações"
          route="/gestor/configuracoes"
          isCollapsed={isCollapsed}
          className={isCollapsed ? 'mb-8 flex justify-center' : ''}
        />
        {!isCollapsed && (
          <SidebarUserProfile
            isCollapsed={isCollapsed}
            name={sidebarUser.name}
            classRoom={sidebarUser.classRoom}
          />
        )}
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
