import { CalendarDay } from './calendar-day'
import { CalendarHeader } from './calendar-header'

const Days = [
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
  },
  {
    day: new Date().getDate() + 1,
    type: 'event',
    events: ['Festa de São João'],
  },
  {
    day: new Date().getDate() + 2,
    type: 'exam',
    exams: ['Matemática', 'Português'],
  },
]

export function Calendar() {
  return (
    <div className="flex h-48 flex-col gap-2 rounded-2xl border p-4">
      <CalendarHeader />
      <div className="flex h-full flex-1 items-center justify-center gap-4">
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
