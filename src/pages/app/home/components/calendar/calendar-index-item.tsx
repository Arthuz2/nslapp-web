type CalendarDayColor = 'today' | 'normal' | 'non-school' | 'event' | 'exam'

type CalendarIndexItemProps = {
  text: CalendarDayColor
}

const colorMap: Record<CalendarDayColor, string> = {
  normal: 'border-gray-400',
  today: 'border-red-600',
  'non-school': 'border-blue-600',
  exam: 'bg-green-600',
  event: 'bg-purple-600',
}

export function CalendarIndexItem({ text }: CalendarIndexItemProps) {
  return (
    <div className="flex items-center gap-1">
      <span className={`${colorMap[text]} h-3 w-3 rounded-full border`} />
      <span className="text-foreground text-base font-semibold">
        {text === 'normal' && 'Dia comum'}
        {text === 'today' && 'Dia atual'}
        {text === 'non-school' && 'Dia não letivo'}
        {text === 'exam' && 'Prova'}
        {text === 'event' && 'Evento'}
      </span>
    </div>
  )
}
