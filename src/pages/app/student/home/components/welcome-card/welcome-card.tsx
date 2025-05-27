import { Calendar, Moon, Sun, Sunset } from 'lucide-react'

import { Card, CardContent } from '@/components/ui/card'

export function WelcomeCard() {
  const currentDate = new Date()
  const currentHour = currentDate.getHours()

  const getGreeting = () => {
    if (currentHour < 12) return 'Bom dia'
    if (currentHour < 18) return 'Boa tarde'
    return 'Boa noite'
  }

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('pt-BR', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  return (
    <Card
      className={`border-0 bg-gradient-to-r ${getGreeting() === 'Bom dia' && 'from-blue-600 to-purple-600'} ${getGreeting() === 'Boa tarde' && 'from-yellow-600 to-orange-600'} ${getGreeting() === 'Boa noite' && 'from-blue-900 to-purple-900'} } text - white`}
    >
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              {getGreeting() === 'Bom dia' ? (
                <Sun className="h-6 w-6 text-white" />
              ) : getGreeting() === 'Boa tarde' ? (
                <Sunset className="h-6 w-6 text-white" />
              ) : (
                <Moon className="h-6 w-6 text-white" />
              )}
              <h1 className="text-2xl font-bold text-white md:text-3xl">
                {getGreeting()}, Arthur!
              </h1>
            </div>
            <p className="text-blue-100">Bem-vindo de volta ao NSL App</p>
          </div>

          <div className="mt-4 flex items-center gap-2 text-blue-100 md:mt-0">
            <Calendar className="h-5 w-5" />
            <span className="text-sm font-semibold md:text-base">
              {formatDate(currentDate)}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
