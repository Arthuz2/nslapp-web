import {
  BookOpen,
  Calendar,
  GraduationCap,
  TrendingUp,
  Users,
} from 'lucide-react'
import type React from 'react'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

const statsCards = [
  {
    title: 'Total de Alunos',
    value: '1,247',
    change: '+12%',
    icon: GraduationCap,
    color: 'text-blue-600',
  },
  {
    title: 'Total de Professores',
    value: '89',
    change: '+3%',
    icon: Users,
    color: 'text-green-600',
  },
  {
    title: 'Turmas Ativas',
    value: '42',
    change: '+5%',
    icon: BookOpen,
    color: 'text-purple-600',
  },
]

const recentActivities = [
  {
    id: 1,
    type: 'enrollment',
    message: 'Novo aluno matriculado: Maria Silva - 9º Ano A',
    time: '2 horas atrás',
  },
  {
    id: 2,
    type: 'payment',
    message: 'Pagamento recebido: João Santos - Mensalidade Dezembro',
    time: '4 horas atrás',
  },
  {
    id: 3,
    type: 'event',
    message: 'Evento criado: Reunião de Pais - 15/12/2024',
    time: '6 horas atrás',
  },
  {
    id: 4,
    type: 'grade',
    message: 'Notas lançadas: Matemática - 8º Ano B',
    time: '8 horas atrás',
  },
  {
    id: 5,
    type: 'announcement',
    message: 'Novo anúncio publicado: Férias de Fim de Ano',
    time: '1 dia atrás',
  },
]

const upcomingEvents = [
  {
    id: 1,
    title: 'Reunião de Pais',
    date: '15/12/2024',
    time: '19:00',
    type: 'meeting',
  },
  {
    id: 2,
    title: 'Prova Final - Matemática',
    date: '18/12/2024',
    time: '08:00',
    type: 'exam',
  },
  {
    id: 3,
    title: 'Formatura 3º Ano',
    date: '20/12/2024',
    time: '20:00',
    type: 'ceremony',
  },
  {
    id: 4,
    title: 'Início das Férias',
    date: '22/12/2024',
    time: '12:00',
    type: 'holiday',
  },
]

const performanceData = [
  { subject: 'Matemática', average: 8.2, trend: 'up' },
  { subject: 'Português', average: 7.8, trend: 'up' },
  { subject: 'História', average: 7.5, trend: 'down' },
  { subject: 'Geografia', average: 8.0, trend: 'up' },
  { subject: 'Ciências', average: 7.9, trend: 'stable' },
]

export function ManagerDashboard(): React.ReactElement {
  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-3">
        {statsCards.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-muted-foreground text-xs">
                <span className="text-green-600">{stat.change}</span> em relação
                ao mês anterior
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Content */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Recent Activities */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Atividades Recentes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivities.map((activity) => (
                  <div key={activity.id} className="flex items-start space-x-3">
                    <div className="flex-shrink-0">
                      <div className="mt-2 h-2 w-2 rounded-full bg-blue-600" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-foreground text-sm">
                        {activity.message}
                      </p>
                      <p className="text-xs text-gray-500">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Upcoming Events */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                Próximos Eventos
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {upcomingEvents.map((event) => (
                  <div key={event.id} className="flex flex-col space-y-1">
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-medium">{event.title}</h4>
                      <span className="text-xs text-gray-500">
                        {event.time}
                      </span>
                    </div>
                    <p className="text-xs text-gray-600">{event.date}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Performance Overview */}
      <Card>
        <CardHeader>
          <CardTitle>Desempenho por Disciplina</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {performanceData.map((subject) => (
              <div
                key={subject.subject}
                className="flex items-center justify-between"
              >
                <div className="flex items-center space-x-3">
                  <span className="text-sm font-medium">{subject.subject}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-600">
                    Média: {subject.average}
                  </span>
                  <TrendingUp
                    className={`h-4 w-4 ${
                      subject.trend === 'up'
                        ? 'text-green-600'
                        : subject.trend === 'down'
                          ? 'text-red-600'
                          : 'text-gray-400'
                    }`}
                  />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
