interface CalendarDayProps {
  day: number
  type: string
  exams?: string[] | undefined
  events?: string[] | undefined
}

export function CalendarDay({ day, type, exams, events }: CalendarDayProps) {
  const color =
    type === 'today'
      ? 'bg-red-600'
      : type === 'exam'
        ? 'bg-green-600'
        : type === 'event'
          ? 'bg-purple-600'
          : type === 'non-school'
            ? 'bg-blue-600'
            : type === 'normal'
              ? 'border-gray-400'
              : 'border-gray-400'
  return (
    <div className={`flex h-full flex-1 flex-col rounded-3xl border p-3`}>
      <div className="flex w-full items-center justify-end">
        <span className="text-base font-semibold text-white">{day}</span>
      </div>
      {exams || events ? (
        <div className="flex h-full w-full items-center gap-1">
          <span className={`h-3 w-3 rounded-full border ${color}`} />
          <span className="text-foreground text-base font-semibold">
            {exams?.[0] || events?.[0]}
          </span>
        </div>
      ) : null}
    </div>
  )
}
