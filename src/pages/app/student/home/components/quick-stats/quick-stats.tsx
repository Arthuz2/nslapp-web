import { Award, BookOpen, Target, TrendingUp } from 'lucide-react'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

const stats = [
  {
    title: 'Provas Realizadas',
    value: '12',
    change: '+2 este mês',
    icon: BookOpen,
    color: 'text-blue-600',
  },
  {
    title: 'Média Geral',
    value: '8.2',
    change: '+0.3 pontos',
    icon: Target,
    color: 'text-green-600',
  },
  {
    title: 'Posição na Turma',
    value: '3º',
    change: 'Subiu 1 posição',
    icon: Award,
    color: 'text-yellow-600',
  },
  {
    title: 'Frequência',
    value: '94.5%',
    change: '+2.1% desde o mês passado',
    icon: TrendingUp,
    color: 'text-emerald-600',
  },
]

export function QuickStats() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <Card key={stat.title} className="transition-shadow hover:shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-muted-foreground text-sm font-medium">
              {stat.title}
            </CardTitle>
            <stat.icon className={`h-5 w-5 ${stat.color}`} />
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${stat.color}`}>
              {stat.value}
            </div>
            <p className="text-muted-foreground mt-1 text-xs">{stat.change}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
