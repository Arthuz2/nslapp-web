import type { CalendarDay } from '@/types/calendar'

import { CalendarDayCell } from './calendar-day-cell'

interface CalendarGridProps {
  days: CalendarDay[]
  today: Date
  className?: string
}

const dayNames = ['DOM', 'SEG', 'TER', 'QUA', 'QUI', 'SEX', 'SÁB']

export function CalendarGrid({ days, today, className }: CalendarGridProps) {
  const isToday = (date: Date) => {
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    )
  }

  return (
    <div className={className}>
      <div className="mb-2 grid grid-cols-7 gap-0.5 sm:mb-4 sm:gap-1">
        {dayNames.map((day) => (
          <div
            key={day}
            className="text-muted-foreground p-1 text-center text-xs font-medium sm:p-2 sm:text-sm"
          >
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-0.5 sm:gap-1">
        {days.map((day, index) => (
          <CalendarDayCell key={index} day={day} isToday={isToday(day.date)} />
        ))}
      </div>
    </div>
  )
}
