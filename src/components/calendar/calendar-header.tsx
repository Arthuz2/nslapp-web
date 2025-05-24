import { ChevronLeft, ChevronRight } from 'lucide-react'

import { Button } from '@/components/ui/button'

interface CalendarHeaderProps {
  currentDate: Date
  onPreviousMonth: () => void
  onNextMonth: () => void
  loading?: boolean
  className?: string
}

const monthNames = [
  'Janeiro',
  'Fevereiro',
  'Março',
  'Abril',
  'Maio',
  'Junho',
  'Julho',
  'Agosto',
  'Setembro',
  'Outubro',
  'Novembro',
  'Dezembro',
]

export function CalendarHeader({
  currentDate,
  onPreviousMonth,
  onNextMonth,
  loading = false,
  className,
}: CalendarHeaderProps) {
  const year = currentDate.getFullYear()
  const month = currentDate.getMonth()

  return (
    <div className={`mb-4 flex items-center gap-3 ${className}`}>
      <Button
        variant="ghost"
        size="icon"
        onClick={onPreviousMonth}
        className="h-6 w-6 sm:h-8 sm:w-8"
        disabled={loading}
        aria-label="Mês anterior"
      >
        <ChevronLeft className="h-3 w-3 sm:h-6 sm:w-6" />
      </Button>

      <Button
        variant="ghost"
        size="icon"
        onClick={onNextMonth}
        className="h-6 w-6 sm:h-8 sm:w-8"
        disabled={loading}
        aria-label="Próximo mês"
      >
        <ChevronRight className="h-3 w-3 sm:h-6 sm:w-6" />
      </Button>

      <h2 className="text-foreground text-base font-semibold sm:text-2xl">
        {monthNames[month]} de {year}
      </h2>

      {loading && (
        <div className="ml-auto">
          <div className="border-primary h-4 w-4 animate-spin rounded-full border-2 border-t-transparent"></div>
        </div>
      )}
    </div>
  )
}
