import { CalendarIndexItem } from './calendar-index-item'

export function CalendarHeader() {
  return (
    <div className="flex items-center justify-between">
      <span className="text-muted-foreground text-lg font-bold">
        Calendário
      </span>
      <div className="flex items-center gap-3">
        <CalendarIndexItem text="normal" />
        <CalendarIndexItem text="today" />
        <CalendarIndexItem text="non-school" />
        <CalendarIndexItem text="exam" />
        <CalendarIndexItem text="event" />
      </div>
    </div>
  )
}
