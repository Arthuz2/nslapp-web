interface CalendarDayProps {
  day: number
  color: string
}

export function CalendarDay({ day, color }: CalendarDayProps) {
  return (
    <div
      className={`${color} flex h-full flex-1 items-center justify-center rounded-3xl border border-gray-400`}
    >
      <span className="text-base font-semibold text-white">{day}</span>
    </div>
  )
}
