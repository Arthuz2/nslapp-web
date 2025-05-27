import {
  AlertTriangle,
  Bell,
  BookOpen,
  Calendar,
  Check,
  CheckCircle,
  Clock,
  FileText,
  GraduationCap,
  Plus,
  TrendingUp,
  Users,
} from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

const upcomingClasses = [
  {
    id: '1',
    subject: 'Matemática',
    class: '9º A',
    time: '08:00',
    room: 'Sala 15',
    topic: 'Álgebra Linear',
  },
  {
    id: '2',
    subject: 'Matemática',
    class: '9º B',
    time: '09:00',
    room: 'Sala 15',
    topic: 'Equações de 1º Grau',
  },
  {
    id: '3',
    subject: 'Matemática',
    class: '8º A',
    time: '10:00',
    room: 'Sala 15',
    topic: 'Frações',
  },
]

const recentActivities = [
  {
    id: '1',
    type: 'grade',
    description: 'Notas lançadas para 9º A - Prova de Álgebra',
    time: '2 horas atrás',
    icon: FileText,
  },
  {
    id: '2',
    type: 'attendance',
    description: 'Frequência registrada para 9º B',
    time: '3 horas atrás',
    icon: Users,
  },
  {
    id: '3',
    type: 'material',
    description: 'Material "Exercícios de Frações" compartilhado',
    time: '1 dia atrás',
    icon: BookOpen,
  },
]

const pendingTasks = [
  {
    id: '1',
    task: 'Corrigir provas do 9º A',
    priority: 'high',
    dueDate: 'Hoje',
  },
  {
    id: '2',
    task: 'Preparar plano de aula - Sistema Solar',
    priority: 'medium',
    dueDate: 'Amanhã',
  },
  {
    id: '3',
    task: 'Enviar relatório mensal',
    priority: 'low',
    dueDate: '3 dias',
  },
]

const priorityColors = {
  high: 'bg-red-100 text-red-800',
  medium: 'bg-yellow-100 text-yellow-800',
  low: 'bg-green-100 text-green-800',
}

export function TeacherDashboard() {
  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Turmas Ativas</CardTitle>
            <Users className="text-muted-foreground h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">6</div>
            <p className="text-muted-foreground text-xs">
              +2 desde o semestre passado
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total de Alunos
            </CardTitle>
            <GraduationCap className="text-muted-foreground h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">142</div>
            <p className="text-muted-foreground text-xs">Alunos matriculados</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Aulas Hoje</CardTitle>
            <Calendar className="text-muted-foreground h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5</div>
            <p className="text-muted-foreground text-xs">
              3 concluídas, 2 pendentes
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Tarefas Pendentes
            </CardTitle>
            <AlertTriangle className="text-muted-foreground h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-muted-foreground text-xs">
              2 com alta prioridade
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Próximas Aulas */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Próximas Aulas
            </CardTitle>
            <CardDescription>Suas aulas programadas para hoje</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingClasses.map((classItem) => (
                <div
                  key={classItem.id}
                  className="flex items-center justify-between rounded-lg border p-4"
                >
                  <div className="flex items-center space-x-4">
                    <div className="bg-primary/10 flex h-16 w-16 flex-col items-center justify-center rounded-lg">
                      <span className="text-primary text-sm font-bold">
                        {classItem.time}
                      </span>
                    </div>
                    <div>
                      <p className="font-medium">{classItem.subject}</p>
                      <p className="text-muted-foreground text-sm">
                        {classItem.class} • {classItem.room}
                      </p>
                      <p className="text-muted-foreground text-sm">
                        {classItem.topic}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Tarefas Pendentes */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5" />
              Tarefas Pendentes
            </CardTitle>
            <CardDescription>Itens que precisam da sua atenção</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {pendingTasks.map((task) => (
                <div
                  key={task.id}
                  className="flex items-start space-x-3 rounded-lg border p-3"
                >
                  <div className="flex-1">
                    <p className="text-sm font-medium">{task.task}</p>
                    <div className="mt-2 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Badge
                          className={
                            priorityColors[
                              task.priority as keyof typeof priorityColors
                            ]
                          }
                        >
                          {task.priority === 'high'
                            ? 'Alta'
                            : task.priority === 'medium'
                              ? 'Média'
                              : 'Baixa'}
                        </Badge>
                        <span className="text-muted-foreground text-xs">
                          {task.dueDate}
                        </span>
                      </div>
                      <Button>
                        <Check className="h-2 w-2" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <Button variant="outline" className="mt-4 w-full">
              <Plus className="mr-2 h-4 w-4" />
              Adicionar Tarefa
            </Button>
          </CardContent>
        </Card>

        {/* Atividades Recentes */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="h-5 w-5" />
              Atividades Recentes
            </CardTitle>
            <CardDescription>
              Suas ações mais recentes no sistema
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity) => {
                const IconComponent = activity.icon
                return (
                  <div
                    key={activity.id}
                    className="flex items-center space-x-4 rounded-lg border p-3"
                  >
                    <div className="bg-muted flex h-10 w-10 items-center justify-center rounded-full">
                      <IconComponent className="h-5 w-5" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">
                        {activity.description}
                      </p>
                      <p className="text-muted-foreground text-xs">
                        {activity.time}
                      </p>
                    </div>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>

        {/* Desempenho das Turmas */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Desempenho das Turmas
            </CardTitle>
            <CardDescription>Média geral por turma</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">9º A</p>
                  <p className="text-muted-foreground text-sm">28 alunos</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-green-600">8.5</p>
                  <p className="text-muted-foreground text-xs">Média</p>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">9º B</p>
                  <p className="text-muted-foreground text-sm">30 alunos</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-yellow-600">7.2</p>
                  <p className="text-muted-foreground text-xs">Média</p>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">8º A</p>
                  <p className="text-muted-foreground text-sm">25 alunos</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-green-600">8.8</p>
                  <p className="text-muted-foreground text-xs">Média</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Ações Rápidas</CardTitle>
          <CardDescription>
            Acesse rapidamente as funcionalidades mais utilizadas
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-2">
            <Button variant="outline" className="h-20 flex-col">
              <Users className="mb-2 h-6 w-6" />
              Registrar Frequência
            </Button>
            <Button variant="outline" className="h-20 flex-col">
              <FileText className="mb-2 h-6 w-6" />
              Lançar Notas
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
