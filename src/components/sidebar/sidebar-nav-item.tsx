import React from 'react'
import { Link, useLocation } from 'react-router-dom'

import { SidebarMenuButton } from '@/components/ui/sidebar'

interface SidebarNavItemProps {
  icon: React.ReactElement<{ className?: string }>
  title: string
  route: string
  isCollapsed: boolean
  className?: string
}

export function SidebarNavItem({
  icon,
  title,
  route,
  isCollapsed,
  className = '',
}: SidebarNavItemProps) {
  const location = useLocation()
  const isActive = location.pathname === route

  return (
    <SidebarMenuButton
      asChild
      isActive={isActive}
      className={`mr-2 ${isCollapsed ? 'justify-center' : 'ml-2 py-4.5'} ${className}`}
    >
      <Link to={route}>
        <div
          className={`flex items-center ${isCollapsed ? 'justify-center' : 'gap-1.5'}`}
        >
          {React.cloneElement(icon, {
            className: isCollapsed ? 'h-6 w-6' : 'h-5.5 w-5.5',
          })}
          {!isCollapsed && (
            <span className="text-base font-medium">{title}</span>
          )}
        </div>
      </Link>
    </SidebarMenuButton>
  )
}
