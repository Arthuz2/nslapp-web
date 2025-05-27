import {
  Award,
  Bot,
  Cog,
  GraduationCap,
  Home,
  MessageCircle,
  ScrollText,
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
  name: 'Prof. Alex Menezes',
  classRoom: 'Matemática',
}

const mainMenuButtons: SidebarMenuButtonProps[] = [
  {
    title: 'Dashboard',
    icon: <Home />,
    route: '/professor',
  },
  {
    title: 'Minhas Turmas',
    icon: <Users />,
    route: '/professor/turmas',
  },
  {
    title: 'Meus Alunos',
    icon: <GraduationCap />,
    route: '/professor/alunos',
  },
]

const academicMenuButtons: SidebarMenuButtonProps[] = [
  {
    title: 'Provas',
    icon: <ScrollText />,
    route: '/professor/provas',
  },
  {
    title: 'Notas',
    icon: <Award />,
    route: '/professor/notas',
  },
]

const specialMenuButtons: SidebarMenuButtonProps[] = [
  {
    title: 'Eletivas',
    icon: <GraduationCap />,
    route: '/professor/eletivas',
  },
  {
    title: 'Tutoria',
    icon: <Users />,
    route: '/professor/tutoria',
  },
]

const communicationMenuButtons: SidebarMenuButtonProps[] = [
  {
    title: 'Chat',
    icon: <MessageCircle />,
    route: '/professor/chat',
  },
  {
    title: 'A.I',
    icon: <Bot />,
    route: '/professor/ia',
  },
]

export function TeacherSidebar() {
  const { state, setOpen } = useSidebar()
  const location = useLocation()
  const isCollapsed = state === 'collapsed'

  // Auto-collapse sidebar for A.I and Chat pages
  useEffect(() => {
    const chatAndAiRoutes = ['/professor/chat', '/professor/ia']
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
          <SidebarGroupLabel className="text-base">Especiais</SidebarGroupLabel>
          {specialMenuButtons.map((button) => (
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
          icon={<Cog />}
          title="Configurações"
          route="/professor/configuracoes"
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
