import { Award, Target, TrendingUp, Users } from 'lucide-react'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

const overviewData = [
  {
    title: 'Média Geral',
    value: '8.2',
    change: '+0.3',
    changeText: 'desde o último bimestre',
    icon: Target,
    color: 'text-blue-600',
    bgColor: 'bg-blue-50 dark:bg-blue-950',
  },
  {
    title: 'Posição na Turma',
    value: '3º',
    change: '↑1',
    changeText: 'posição',
    icon: Award,
    color: 'text-yellow-600',
    bgColor: 'bg-yellow-50 dark:bg-yellow-950',
  },
  {
    title: 'Frequência',
    value: '94.5%',
    change: '+2.1%',
    changeText: 'este mês',
    icon: Users,
    color: 'text-green-600',
    bgColor: 'bg-green-50 dark:bg-green-950',
  },
  {
    title: 'Progresso',
    value: '87%',
    change: '+5%',
    changeText: 'do cronograma',
    icon: TrendingUp,
    color: 'text-purple-600',
    bgColor: 'bg-purple-50 dark:bg-purple-950',
  },
]

export function PerformanceOverview() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {overviewData.map((item) => (
        <Card key={item.title} className="transition-shadow hover:shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-muted-foreground text-sm font-medium">
              {item.title}
            </CardTitle>
            <div className={`rounded-lg p-2 ${item.bgColor}`}>
              <item.icon className={`h-5 w-5 ${item.color}`} />
            </div>
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${item.color}`}>
              {item.value}
            </div>
            <div className="mt-1 flex items-center gap-1">
              <span className={`text-sm font-medium ${item.color}`}>
                {item.change}
              </span>
              <span className="text-muted-foreground text-xs">
                {item.changeText}
              </span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
