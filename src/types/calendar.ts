// Calendar types and interfaces
export interface CalendarEvent {
  id: string
  title: string
  type: 'exam' | 'event' | 'holiday'
  date: Date
  level?: string
  subject?: string
  description?: string
}

export interface CalendarDay {
  date: Date
  isCurrentMonth: boolean
  events: CalendarEvent[]
}

export interface HolidayApiResponse {
  date: string
  name: string
  type: string
  level: string
}

export type EventType = 'exam' | 'event' | 'holiday'
