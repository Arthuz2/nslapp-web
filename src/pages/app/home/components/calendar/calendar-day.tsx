export type CalendarDayColorType = 'normal' | 'non-school' | 'today'

export interface CalendarDayProps {
  day: number
  type: CalendarDayColorType
  exams?: string[]
  events?: string[]
}

export function CalendarDay({ day, type, exams, events }: CalendarDayProps) {
  return (
    <div className="w-full">
      {type === 'normal' && (
        <div className="flex h-full min-h-24 flex-1 flex-col rounded-3xl border border-gray-400 p-3">
          <div className="flex w-full items-center justify-end">
            <span className="text-foreground text-base font-semibold">
              {day}
            </span>
          </div>
          {exams &&
            exams.map((exam, i) => (
              <div key={i} className="flex flex-1 items-center gap-1">
                <span className="h-3 w-3 rounded-full bg-green-600" />
                <span className="text-foreground w-full min-w-10 text-base font-semibold text-wrap">
                  {exam}
                </span>
              </div>
            ))}

          {events &&
            events.map((event, i) => (
              <div key={i} className="flex flex-1 items-center gap-1">
                <span className="h-3 w-3 rounded-full bg-purple-600" />
                <span className="text-foreground w-full min-w-10 text-base font-semibold text-wrap">
                  {event}
                </span>
              </div>
            ))}
        </div>
      )}

      {type === 'today' && (
        <div className="flex h-full min-h-24 flex-1 flex-col rounded-3xl border border-red-600 p-3">
          <div className="flex w-full items-center justify-end">
            <span className="text-foreground text-base font-semibold">
              {day}
            </span>
          </div>
          {exams &&
            exams.map((exam, i) => (
              <div key={i} className="flex flex-1 items-center gap-1">
                <span className="h-3 w-3 rounded-full bg-green-600" />
                <span className="text-foreground w-full min-w-10 text-base font-semibold text-wrap">
                  {exam}
                </span>
              </div>
            ))}

          {events &&
            events.map((event, i) => (
              <div key={i} className="flex flex-1 items-center gap-1">
                <span className="h-3 w-3 rounded-full bg-purple-600" />
                <span className="text-foreground w-full min-w-10 text-base font-semibold text-wrap">
                  {event}
                </span>
              </div>
            ))}
        </div>
      )}

      {type === 'non-school' && (
        <div className="flex h-full min-h-24 flex-1 flex-col rounded-3xl border border-blue-600 p-3">
          <div className="flex w-full items-center justify-end">
            <span className="text-foreground text-base font-semibold">
              {day}
            </span>
          </div>
          {exams &&
            exams.map((exam, i) => (
              <div key={i} className="startap-1 flex flex-1 items-center">
                <span className="h-3 w-3 rounded-full bg-green-600" />
                <span className="text-foreground w-full min-w-10 text-base font-semibold text-wrap">
                  {exam}
                </span>
              </div>
            ))}

          {events &&
            events.map((event) => (
              <div key={event} className="items-centerr flex flex-1 gap-1">
                <span className="h-3 w-3 rounded-full bg-purple-600" />
                <span className="text-foreground w-full min-w-10 text-base font-semibold text-wrap">
                  {event}
                </span>
              </div>
            ))}
        </div>
      )}
    </div>
  )
}
