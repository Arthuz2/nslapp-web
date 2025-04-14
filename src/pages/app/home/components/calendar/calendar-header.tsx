import { CalendarIndexItem } from './calendar-index-item'

export function CalendarHeader() {
  return (
    <div className="flex items-center justify-between">
      <span className="text-muted-foreground text-lg font-bold">
        Calendário
      </span>
      <div className="flex items-center gap-3">
        <CalendarIndexItem text="Dia Comum" />
        <CalendarIndexItem text="Dia Atual" />
        <CalendarIndexItem text="Prova" />
        <CalendarIndexItem text="Dia não letivo" />
        <CalendarIndexItem text="Evento" />
      </div>
    </div>
  )
}
