import { useState } from 'react'

import type { CalendarDay } from '@/types/calendar'

import { EventDetailsDialog } from './event-details-dialog'
import { EventItem } from './event-item'

interface CalendarDayCellProps {
  day: CalendarDay
  isToday: boolean
  className?: string
}

export function CalendarDayCell({
  day,
  isToday,
  className,
}: CalendarDayCellProps) {
  const [dialogOpen, setDialogOpen] = useState(false)

  const hasExams = day.events.some((event) => event.type === 'exam')
  const hasEvents = day.events.some((event) => event.type === 'event')
  const hasHolidays = day.events.some((event) => event.type === 'holiday')

  // Determine background styling based on event types
  const getBackgroundClass = () => {
    if (isToday) {
      return 'bg-red-500/20'
    }
    if (hasHolidays) {
      return 'bg-blue-500/20'
    }
    if (hasExams && hasEvents) {
      return 'bg-gradient-to-br from-green-500/20 to-purple-500/20'
    }
    if (hasExams) {
      return 'bg-green-500/20'
    }
    if (hasEvents) {
      return 'bg-purple-500/20'
    }
    return ''
  }

  const getBorderClass = () => {
    if (isToday) {
      return 'border-red-500'
    }
    if (hasHolidays) {
      return 'border-blue-500'
    }
    if (hasExams) {
      return 'border-green-500'
    }
    if (hasEvents) {
      return 'border-purple-500'
    }
    return 'border-border'
  }

  const getDayNumberClass = () => {
    if (isToday) {
      return 'flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-white sm:h-6 sm:w-6'
    }
    if (hasHolidays && !isToday) {
      return 'flex h-5 w-5 items-center justify-center rounded-full bg-blue-500 text-white sm:h-6 sm:w-6'
    }
    return 'text-xs font-medium sm:text-sm'
  }

  const maxEventsToShow =
    typeof window !== 'undefined' && window.innerWidth < 640 ? 2 : 3

  return (
    <>
      <div
        className={`relative min-h-[60px] cursor-pointer rounded-md border p-1 transition-all duration-200 hover:scale-105 hover:shadow-md sm:min-h-[80px] sm:rounded-lg sm:p-2 ${day.isCurrentMonth ? 'text-foreground' : 'text-muted-foreground opacity-50'} ${getBackgroundClass()} ${getBorderClass()} ${className} `}
        onClick={() => day.events.length > 0 && setDialogOpen(true)}
        role="button"
        tabIndex={0}
        aria-label={`${day.date.getDate()} de ${day.date.toLocaleDateString('pt-BR', { month: 'long' })}, ${day.events.length} eventos`}
        onKeyDown={(e) => {
          if ((e.key === 'Enter' || e.key === ' ') && day.events.length > 0) {
            e.preventDefault()
            setDialogOpen(true)
          }
        }}
      >
        <div className="flex justify-end">
          <span className={getDayNumberClass()}>{day.date.getDate()}</span>
        </div>

        <div className="mt-0.5 space-y-0.5 sm:mt-1 sm:space-y-1">
          {day.events.slice(0, maxEventsToShow).map((event, eventIndex) => (
            <EventItem key={eventIndex} event={event} />
          ))}
          {day.events.length > maxEventsToShow && (
            <div className="text-muted-foreground text-[10px] sm:text-xs">
              +{day.events.length - maxEventsToShow} mais
            </div>
          )}
        </div>

        {day.events.length > 0 && (
          <div className="absolute top-1 left-1 flex gap-0.5">
            {hasExams && (
              <div className="h-1.5 w-1.5 rounded-full bg-green-500 sm:h-2 sm:w-2"></div>
            )}
            {hasEvents && (
              <div className="h-1.5 w-1.5 rounded-full bg-purple-500 sm:h-2 sm:w-2"></div>
            )}
            {hasHolidays && (
              <div className="h-1.5 w-1.5 rounded-full bg-blue-500 sm:h-2 sm:w-2"></div>
            )}
          </div>
        )}
      </div>

      <EventDetailsDialog
        date={day.date}
        events={day.events}
        open={dialogOpen}
        onOpenChange={setDialogOpen}
      />
    </>
  )
}
