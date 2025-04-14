import { CalendarDay } from './calendar-day'
import { CalendarHeader } from './calendar-header'

const Days = [
  {
    day: new Date().getDate() - 2,
    color: 'bg-blue-600',
  },
  {
    day: new Date().getDate() - 1,
    color: 'bg-zinc-900',
  },
  {
    day: new Date().getDate(),
    color: 'bg-red-600',
  },
  {
    day: new Date().getDate() + 1,
    color: 'bg-green-600',
  },
  {
    day: new Date().getDate() + 2,
    color: 'bg-green-600',
  },
]

export function Calendar() {
  return (
    <div className="flex h-48 flex-col gap-2 rounded-2xl border p-4">
      <CalendarHeader />
      <div className="flex h-full flex-1 items-center justify-center gap-4">
        {Days.map((date, i) => (
          <CalendarDay key={i} day={date.day} color={date.color} />
        ))}
      </div>
    </div>
  )
}
