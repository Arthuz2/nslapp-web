import { ChevronRight } from 'lucide-react'
import React from 'react'
import { Link, useLocation } from 'react-router-dom'

import {
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from '@/components/ui/sidebar'
import { useIsMobile } from '@/hooks/use-mobile'

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '../../ui/collapsible'

interface SidebarNavItemProps {
  icon: React.ReactElement<{ className?: string }>
  title: string
  route?: string
  isCollapsed: boolean
  className?: string
  items?: {
    title: string
    route: string
  }[]
}

export function SidebarNavItem({
  icon,
  title,
  route,
  isCollapsed,
  items,
  className,
}: SidebarNavItemProps) {
  const location = useLocation()
  const isActive = location.pathname === route
  const isMobile = useIsMobile()

  return (
    <>
      {route && !items ? (
        <SidebarMenuButton asChild isActive={isActive} className={className}>
          <Link to={route}>
            <div
              className={`flex items-center ${isCollapsed ? 'justify-center' : 'gap-1.5'}`}
            >
              {React.cloneElement(icon, {
                className: isCollapsed ? 'h-6 w-6' : 'h-5.5 w-5.5',
              })}
              {!isCollapsed && isMobile && (
                <span className="text-base font-medium">{title}</span>
              )}
              {!isCollapsed && !isMobile && (
                <span className="text-base font-medium">{title}</span>
              )}
            </div>
          </Link>
        </SidebarMenuButton>
      ) : (
        <Collapsible
          asChild
          defaultOpen={isActive}
          className="group/collapsible disabled:cursor-not-allowed"
          disabled={isCollapsed}
        >
          <SidebarMenuItem>
            <CollapsibleTrigger asChild>
              <SidebarMenuButton
                tooltip={title}
                className={`flex w-full items-center justify-between gap-1.5 hover:cursor-pointer ${className}`}
              >
                <div className="flex items-center gap-1.5">
                  {React.cloneElement(icon, {
                    className: isCollapsed ? 'h-6 w-6' : 'h-5.5 w-5.5',
                  })}
                  {!isCollapsed && isMobile && (
                    <span className="text-base font-medium">{title}</span>
                  )}

                  {!isCollapsed && !isMobile && (
                    <span className="text-base font-medium">{title}</span>
                  )}
                </div>
                {!isCollapsed && (
                  <div>
                    <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                  </div>
                )}
              </SidebarMenuButton>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <div className="flex flex-col">
                <SidebarMenuSub>
                  {items?.map((item) => (
                    <SidebarMenuSubItem key={item.title}>
                      <SidebarMenuSubButton asChild>
                        <Link to={route + item.route}>
                          <span className="text-sm font-semibold text-wrap">
                            {item.title}
                          </span>
                        </Link>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                  ))}
                </SidebarMenuSub>
              </div>
            </CollapsibleContent>
          </SidebarMenuItem>
        </Collapsible>
      )}
    </>
  )
}
