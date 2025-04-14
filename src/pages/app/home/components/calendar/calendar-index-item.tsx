interface CalendarIndexItemProps {
  text: 'Dia Atual' | 'Prova' | 'Dia não letivo' | 'Evento' | 'Dia Comum'
}

export function CalendarIndexItem({ text }: CalendarIndexItemProps) {
  const color =
    text === 'Dia Atual'
      ? 'bg-red-600'
      : text === 'Prova'
        ? 'bg-green-600'
        : text === 'Dia não letivo'
          ? 'bg-blue-600'
          : text === 'Evento'
            ? 'bg-purple-600'
            : text === 'Dia Comum'
              ? 'bg-zinc-900'
              : 'bg-zinc-900'

  return (
    <div className="flex items-center gap-1">
      <span className={`${color} h-3 w-3 rounded-full`} />
      <span className="text-foreground text-base font-semibold">{text}</span>
    </div>
  )
}
