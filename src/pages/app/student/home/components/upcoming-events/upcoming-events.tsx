import { Calendar, Clock } from 'lucide-react'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ScrollArea } from '@/components/ui/scroll-area'

const upcomingEvents = [
  {
    id: 1,
    title: 'Prova de Matemática',
    date: '15/01/2024',
    time: '08:00',
    type: 'exam',
    subject: 'Matemática',
  },
  {
    id: 2,
    title: 'Entrega do Projeto',
    date: '18/01/2024',
    time: '23:59',
    type: 'assignment',
    subject: 'História',
  },
  {
    id: 3,
    title: 'Feira de Ciências',
    date: '22/01/2024',
    time: '14:00',
    type: 'event',
    subject: 'Geral',
  },
  {
    id: 4,
    title: 'Prova de Português',
    date: '25/01/2024',
    time: '08:00',
    type: 'exam',
    subject: 'Português',
  },
]

const getEventColor = (type: string) => {
  switch (type) {
    case 'exam':
      return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
    case 'assignment':
      return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
    case 'event':
      return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
    default:
      return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
  }
}

const getEventIcon = (type: string) => {
  switch (type) {
    case 'exam':
      return '📝'
    case 'assignment':
      return '📋'
    case 'event':
      return '🎉'
    default:
      return '📅'
  }
}

export function UpcomingEvents() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calendar className="h-5 w-5" />
          Próximos Eventos
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[300px]">
          <div className="space-y-3">
            {upcomingEvents.map((event) => (
              <div
                key={event.id}
                className="hover:bg-muted/50 flex items-start gap-3 rounded-lg border p-3 transition-colors"
              >
                <div className="text-2xl">{getEventIcon(event.type)}</div>
                <div className="flex-1 space-y-1">
                  <h4 className="text-sm font-medium">{event.title}</h4>
                  <p className="text-muted-foreground text-xs">
                    {event.subject}
                  </p>
                  <div className="text-muted-foreground flex items-center gap-2 text-xs">
                    <Calendar className="h-3 w-3" />
                    <span>{event.date}</span>
                    <Clock className="h-3 w-3" />
                    <span>{event.time}</span>
                  </div>
                </div>
                <span
                  className={`rounded-full px-2 py-1 text-xs font-medium ${getEventColor(event.type)}`}
                >
                  {event.type === 'exam'
                    ? 'Prova'
                    : event.type === 'assignment'
                      ? 'Entrega'
                      : 'Evento'}
                </span>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  )
}
