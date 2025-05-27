import {
  BarChart3,
  BookOpen,
  Calendar,
  FileText,
  GraduationCap,
  Settings,
  TrendingUp,
  Users,
} from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

const managerStats = [
  {
    title: 'Total de Alunos',
    value: '1,247',
    change: '+45 este semestre',
    icon: GraduationCap,
    color: 'text-blue-600',
    bgColor: 'bg-blue-50 dark:bg-blue-950',
  },
  {
    title: 'Professores Ativos',
    value: '68',
    change: '+3 novos professores',
    icon: Users,
    color: 'text-green-600',
    bgColor: 'bg-green-50 dark:bg-green-950',
  },
  {
    title: 'Turmas Ativas',
    value: '42',
    change: 'Todas funcionando',
    icon: BookOpen,
    color: 'text-purple-600',
    bgColor: 'bg-purple-50 dark:bg-purple-950',
  },
  {
    title: 'Média Geral',
    value: '7.9',
    change: '+0.1 este mês',
    icon: TrendingUp,
    color: 'text-yellow-600',
    bgColor: 'bg-yellow-50 dark:bg-yellow-950',
  },
]

const schoolPerformance = [
  {
    course: 'Ensino Médio Integrado',
    students: 847,
    average: 8.1,
    trend: 'up',
  },
  {
    course: 'Técnico em Informática',
    students: 245,
    average: 8.3,
    trend: 'up',
  },
  {
    course: 'Técnico em Administração',
    students: 155,
    average: 7.8,
    trend: 'stable',
  },
]

const teacherPerformance = [
  {
    name: 'Prof. Alex Menezes',
    subject: 'Matemática',
    classes: 6,
    average: 8.2,
    satisfaction: 95,
  },
  {
    name: 'Prof. Ana Santos',
    subject: 'Português',
    classes: 5,
    average: 8.0,
    satisfaction: 92,
  },
  {
    name: 'Prof. Carlos Lima',
    subject: 'Biologia',
    classes: 4,
    average: 7.9,
    satisfaction: 88,
  },
  {
    name: 'Prof. Maria Clara',
    subject: 'História',
    classes: 5,
    average: 8.1,
    satisfaction: 90,
  },
  {
    name: 'Prof. Roberto Silva',
    subject: 'Física',
    classes: 4,
    average: 7.7,
    satisfaction: 85,
  },
]

const recentReports = [
  {
    id: '1',
    title: 'Relatório Mensal de Notas',
    type: 'Acadêmico',
    date: '15/01/2024',
    status: 'Concluído',
  },
  {
    id: '2',
    title: 'Análise de Frequência',
    type: 'Presença',
    date: '12/01/2024',
    status: 'Pendente',
  },
  {
    id: '3',
    title: 'Avaliação Docente',
    type: 'Professores',
    date: '10/01/2024',
    status: 'Em Análise',
  },
  {
    id: '4',
    title: 'Relatório Financeiro',
    type: 'Financeiro',
    date: '08/01/2024',
    status: 'Concluído',
  },
]

const upcomingEvents = [
  {
    id: '1',
    title: 'Reunião Pedagógica',
    date: '20/01/2024',
    time: '14:00',
    type: 'Reunião',
  },
  {
    id: '2',
    title: 'Conselho de Classe',
    date: '22/01/2024',
    time: '08:00',
    type: 'Avaliação',
  },
  {
    id: '3',
    title: 'Feira de Ciências',
    date: '25/01/2024',
    time: '09:00',
    type: 'Evento',
  },
  {
    id: '4',
    title: 'Formação Continuada',
    date: '28/01/2024',
    time: '13:30',
    type: 'Capacitação',
  },
]

export function ManagerDashboard() {
  return (
    <div className="space-y-6 p-4 md:p-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-r from-purple-600 to-blue-600">
          <Settings className="h-6 w-6 text-white" />
        </div>
        <div>
          <h1 className="text-3xl font-bold">Dashboard do Gestor</h1>
          <p className="text-muted-foreground">Bem-vindo, Diretor João Silva</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {managerStats.map((stat) => (
          <Card key={stat.title} className="transition-shadow hover:shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-muted-foreground text-sm font-medium">
                {stat.title}
              </CardTitle>
              <div className={`rounded-lg p-2 ${stat.bgColor}`}>
                <stat.icon className={`h-5 w-5 ${stat.color}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className={`text-2xl font-bold ${stat.color}`}>
                {stat.value}
              </div>
              <p className="text-muted-foreground mt-1 text-xs">
                {stat.change}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Content */}
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2 md:grid-cols-4">
          <TabsTrigger value="overview" className="flex items-center gap-2">
            <BarChart3 className="h-4 w-4" />
            <span className="hidden sm:inline">Visão Geral</span>
          </TabsTrigger>
          <TabsTrigger value="teachers" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            <span className="hidden sm:inline">Professores</span>
          </TabsTrigger>
          <TabsTrigger value="reports" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            <span className="hidden sm:inline">Relatórios</span>
          </TabsTrigger>
          <TabsTrigger value="events" className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            <span className="hidden sm:inline">Eventos</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid gap-6 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5" />
                  Desempenho por Curso
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {schoolPerformance.map((course, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-medium">{course.course}</span>
                        <div className="flex items-center gap-2">
                          <span className="text-muted-foreground text-sm">
                            {course.students} alunos
                          </span>
                          <Badge
                            className={
                              course.average >= 8
                                ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                                : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                            }
                          >
                            {course.average}
                          </Badge>
                        </div>
                      </div>
                      <div className="h-2 w-full rounded-full bg-gray-200">
                        <div
                          className="h-2 rounded-full bg-blue-600 transition-all duration-500"
                          style={{ width: `${(course.average / 10) * 100}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Estatísticas Gerais
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="rounded-lg bg-blue-50 p-4 text-center dark:bg-blue-950">
                      <div className="text-2xl font-bold text-blue-600">
                        94.5%
                      </div>
                      <div className="text-muted-foreground text-sm">
                        Frequência Média
                      </div>
                    </div>
                    <div className="rounded-lg bg-green-50 p-4 text-center dark:bg-green-950">
                      <div className="text-2xl font-bold text-green-600">
                        87%
                      </div>
                      <div className="text-muted-foreground text-sm">
                        Taxa de Aprovação
                      </div>
                    </div>
                    <div className="rounded-lg bg-purple-50 p-4 text-center dark:bg-purple-950">
                      <div className="text-2xl font-bold text-purple-600">
                        92%
                      </div>
                      <div className="text-muted-foreground text-sm">
                        Satisfação Geral
                      </div>
                    </div>
                    <div className="rounded-lg bg-yellow-50 p-4 text-center dark:bg-yellow-950">
                      <div className="text-2xl font-bold text-yellow-600">
                        156
                      </div>
                      <div className="text-muted-foreground text-sm">
                        Eventos este Ano
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="teachers" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Desempenho dos Professores
                </CardTitle>
                <Button className="bg-green-600 hover:bg-green-700">
                  <Users className="mr-2 h-4 w-4" />
                  Adicionar Professor
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {teacherPerformance.map((teacher, index) => (
                  <div
                    key={index}
                    className="hover:bg-muted/50 flex items-center justify-between rounded-lg border p-4 transition-colors"
                  >
                    <div className="space-y-1">
                      <h3 className="font-medium">{teacher.name}</h3>
                      <p className="text-muted-foreground text-sm">
                        {teacher.subject} • {teacher.classes} turmas
                      </p>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-center">
                        <div className="text-sm font-medium">Média</div>
                        <div
                          className={`text-lg font-bold ${teacher.average >= 8 ? 'text-green-600' : 'text-yellow-600'}`}
                        >
                          {teacher.average}
                        </div>
                      </div>
                      <div className="text-center">
                        <div className="text-sm font-medium">Satisfação</div>
                        <div
                          className={`text-lg font-bold ${teacher.satisfaction >= 90 ? 'text-green-600' : 'text-yellow-600'}`}
                        >
                          {teacher.satisfaction}%
                        </div>
                      </div>
                      <Button size="sm" variant="outline">
                        Ver Detalhes
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reports" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Relatórios Recentes
                </CardTitle>
                <Button className="bg-blue-600 hover:bg-blue-700">
                  <FileText className="mr-2 h-4 w-4" />
                  Gerar Relatório
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentReports.map((report) => (
                  <div
                    key={report.id}
                    className="hover:bg-muted/50 flex items-center justify-between rounded-lg border p-4 transition-colors"
                  >
                    <div className="space-y-1">
                      <h3 className="font-medium">{report.title}</h3>
                      <p className="text-muted-foreground text-sm">
                        {report.type} • {report.date}
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge
                        className={
                          report.status === 'Concluído'
                            ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                            : report.status === 'Pendente'
                              ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                              : 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                        }
                      >
                        {report.status}
                      </Badge>
                      <Button size="sm" variant="outline">
                        Visualizar
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="events" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  Próximos Eventos
                </CardTitle>
                <Button className="bg-purple-600 hover:bg-purple-700">
                  <Calendar className="mr-2 h-4 w-4" />
                  Novo Evento
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {upcomingEvents.map((event) => (
                  <div
                    key={event.id}
                    className="hover:bg-muted/50 flex items-center justify-between rounded-lg border p-4 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className="text-center">
                        <div className="text-lg font-bold">{event.time}</div>
                        <div className="text-muted-foreground text-xs">
                          {event.date}
                        </div>
                      </div>
                      <div>
                        <h3 className="font-medium">{event.title}</h3>
                        <p className="text-muted-foreground text-sm">
                          {event.type}
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">
                        Editar
                      </Button>
                      <Button size="sm">Detalhes</Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
