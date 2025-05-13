import { CalendarDay, CalendarDayProps } from './calendar-day'
import { CalendarHeader } from './calendar-header'

const Days: CalendarDayProps[] = [
  {
    day: new Date().getDate() - 2,
    type: 'non-school',
  },
  {
    day: new Date().getDate() - 1,
    type: 'normal',
  },
  {
    day: new Date().getDate(),
    type: 'today',
    events: ['Dia dos namorados'],
  },
  {
    day: new Date().getDate() + 1,
    type: 'normal',
    events: ['Festa de São João'],
  },
  {
    day: new Date().getDate() + 2,
    type: 'normal',
    exams: ['Matemática'],
  },
]

export function Calendar() {
  return (
    <div className="flex flex-col rounded-2xl border p-4">
      <CalendarHeader />
      <div className="text-foreground grid flex-1 grid-cols-5 items-center text-center font-semibold">
        <span className="col-span-1">SEG</span>
        <span className="col-span-1">TER</span>
        <span className="col-span-1">QUAR</span>
        <span className="col-span-1">QUI</span>
        <span className="col-span-1">SEX</span>
      </div>
      <div className="flex h-full flex-1 items-start justify-center gap-4 p-2">
        {Days.map((day, i) => (
          <CalendarDay
            key={i}
            day={day.day}
            type={day.type}
            exams={day.exams}
            events={day.events}
          />
        ))}
      </div>
    </div>
  )
}
