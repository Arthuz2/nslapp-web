import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import type { CalendarEvent } from '@/types/calendar'

interface EventDetailsDialogProps {
  date: Date
  events: CalendarEvent[]
  open: boolean
  onOpenChange: (open: boolean) => void
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

export function EventDetailsDialog({
  date,
  events,
  open,
  onOpenChange,
}: EventDetailsDialogProps) {
  const getEventTypeLabel = (type: CalendarEvent['type']) => {
    switch (type) {
      case 'exam':
        return 'Prova'
      case 'event':
        return 'Evento'
      case 'holiday':
        return 'Feriado'
      default:
        return 'Evento'
    }
  }

  const getEventStyles = (type: CalendarEvent['type']) => {
    switch (type) {
      case 'exam':
        return 'border-green-500 bg-green-500/10 hover:bg-green-500/20'
      case 'event':
        return 'border-purple-500 bg-purple-500/10 hover:bg-purple-500/20'
      case 'holiday':
        return 'border-blue-500 bg-blue-500/10 hover:bg-blue-500/20'
      default:
        return 'border-gray-500 bg-gray-500/10 hover:bg-gray-500/20'
    }
  }

  const getEventDotColor = (type: CalendarEvent['type']) => {
    switch (type) {
      case 'exam':
        return 'bg-green-500'
      case 'event':
        return 'bg-purple-500'
      case 'holiday':
        return 'bg-blue-500'
      default:
        return 'bg-gray-500'
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-sm sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>
            {date.getDate()} de {monthNames[date.getMonth()]} de{' '}
            {date.getFullYear()}
          </DialogTitle>
          <DialogDescription>
            {events.length === 1 ? '1 evento' : `${events.length} eventos`}{' '}
            neste dia
          </DialogDescription>
        </DialogHeader>
        <div className="max-h-60 space-y-3 overflow-y-auto sm:max-h-80">
          {events.map((event) => (
            <div
              key={event.id}
              className={`rounded-lg border p-3 transition-colors ${getEventStyles(event.type)}`}
            >
              <div className="flex items-center gap-2">
                <div
                  className={`h-3 w-3 rounded-full ${getEventDotColor(event.type)}`}
                />
                <span className="font-medium">{event.title}</span>
              </div>
              {event.subject && (
                <p className="text-muted-foreground mt-1 text-sm">
                  Disciplina: {event.subject}
                </p>
              )}
              {event.description && (
                <p className="text-muted-foreground mt-1 text-sm">
                  {event.description}
                </p>
              )}
              <p className="text-muted-foreground mt-1 text-sm">
                Tipo: {getEventTypeLabel(event.type)}
              </p>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  )
}
