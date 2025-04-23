interface CalendarIndexItemProps {
  text: 'Dia Atual' | 'Prova' | 'Dia não letivo' | 'Evento' | 'Dia Comum'
}

export function CalendarIndexItem({ text }: CalendarIndexItemProps) {
  const color =
    text === 'Dia Atual'
      ? 'border-red-600'
      : text === 'Prova'
        ? 'bg-green-600'
        : text === 'Dia não letivo'
          ? 'border-blue-600'
          : text === 'Evento'
            ? 'bg-purple-600'
            : text === 'Dia Comum'
              ? 'border-gray-400'
              : 'border-gray-400'

  return (
    <div className="flex items-center gap-1">
      <span className={`${color} h-3 w-3 rounded-full border`} />
      <span className="text-foreground text-base font-semibold">{text}</span>
    </div>
  )
}
