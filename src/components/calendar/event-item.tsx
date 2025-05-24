import type { CalendarEvent } from '@/types/calendar'

interface EventItemProps {
  event: CalendarEvent
  className?: string
}

export function EventItem({ event, className }: EventItemProps) {
  const getEventColor = (type: CalendarEvent['type']) => {
    switch (type) {
      case 'exam':
        return 'bg-green-500'
      case 'event':
        return 'bg-purple-500'
      case 'holiday':
        return 'bg-blue-500'
      default:
        return 'bg-gray-500'
    }
  }

  return (
    <div
      className={`truncate rounded px-1 py-0.5 text-[10px] font-medium text-white sm:text-xs ${getEventColor(event.type)} ${className}`}
      title={event.title}
    >
      {event.title}
    </div>
  )
}
