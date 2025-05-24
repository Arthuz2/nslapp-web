interface CalendarLegendProps {
  className?: string
}

export function CalendarLegend({ className }: CalendarLegendProps) {
  const legendItems = [
    { color: 'bg-red-500', label: 'Dia Atual' },
    { color: 'bg-green-500', label: 'Prova' },
    { color: 'bg-blue-500', label: 'Feriado' },
    { color: 'bg-purple-500', label: 'Evento' },
  ]

  return (
    <div
      className={`flex flex-wrap items-center gap-2 text-xs font-semibold sm:gap-4 sm:text-sm ${className}`}
    >
      {legendItems.map((item) => (
        <div key={item.label} className="flex items-center gap-1 sm:gap-2">
          <div
            className={`h-2 w-2 rounded-full ${item.color} sm:h-3 sm:w-3`}
          ></div>
          <span className="text-foreground">{item.label}</span>
        </div>
      ))}
    </div>
  )
}
