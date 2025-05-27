import {
  Calendar,
  Clock,
  Filter,
  MoreHorizontal,
  Plus,
  Search,
  UserCheck,
  Users,
} from 'lucide-react'
import type React from 'react'
import { useState } from 'react'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Textarea } from '@/components/ui/textarea'

const statsCards = [
  {
    title: 'Sessões Ativas',
    value: '42',
    change: '+8 este mês',
    icon: UserCheck,
  },
  {
    title: 'Alunos Atendidos',
    value: '156',
    change: '+23% vs mês anterior',
    icon: Users,
  },
  {
    title: 'Taxa de Melhoria',
    value: '87%',
    change: 'Acima da meta (80%)',
    icon: Calendar,
  },
  {
    title: 'Professores Tutores',
    value: '12',
    change: '+2 novos tutores',
    icon: Users,
  },
]

const tutoringSessions = [
  {
    id: 1,
    student: 'Carlos Silva',
    tutor: 'Prof. Maria Santos',
    subject: 'Matemática',
    class: '9º Ano B',
    schedule: 'Segunda 15:00-16:00',
    status: 'active',
    progress: 'good',
    sessionsCompleted: 8,
    totalSessions: 12,
    startDate: '2024-10-15',
  },
  {
    id: 2,
    student: 'Ana Costa',
    tutor: 'Prof. João Lima',
    subject: 'Física',
    class: '9º Ano A',
    schedule: 'Quarta 14:00-15:00',
    status: 'active',
    progress: 'excellent',
    sessionsCompleted: 6,
    totalSessions: 10,
    startDate: '2024-11-01',
  },
  {
    id: 3,
    student: 'Roberto Santos',
    tutor: 'Profa. Ana Silva',
    subject: 'Português',
    class: '8º Ano A',
    schedule: 'Sexta 15:00-16:00',
    status: 'completed',
    progress: 'good',
    sessionsCompleted: 15,
    totalSessions: 15,
    startDate: '2024-09-01',
  },
  {
    id: 4,
    student: 'Maria Oliveira',
    tutor: 'Prof. Carlos Costa',
    subject: 'Química',
    class: '9º Ano B',
    schedule: 'Terça 16:00-17:00',
    status: 'active',
    progress: 'needs_attention',
    sessionsCompleted: 4,
    totalSessions: 12,
    startDate: '2024-11-15',
  },
  {
    id: 5,
    student: 'João Ferreira',
    tutor: 'Profa. Fernanda Lima',
    subject: 'História',
    class: '8º Ano B',
    schedule: 'Quinta 14:30-15:30',
    status: 'paused',
    progress: 'good',
    sessionsCompleted: 3,
    totalSessions: 8,
    startDate: '2024-11-20',
  },
]

const tutors = [
  {
    id: 1,
    name: 'Prof. Maria Santos',
    subjects: ['Matemática', 'Física'],
    activeSessions: 5,
    totalStudents: 12,
    rating: 4.8,
    experience: '8 anos',
  },
  {
    id: 2,
    name: 'Prof. João Lima',
    subjects: ['Física', 'Química'],
    activeSessions: 3,
    totalStudents: 8,
    rating: 4.9,
    experience: '6 anos',
  },
  {
    id: 3,
    name: 'Profa. Ana Silva',
    subjects: ['Português', 'Literatura'],
    activeSessions: 4,
    totalStudents: 10,
    rating: 4.7,
    experience: '10 anos',
  },
  {
    id: 4,
    name: 'Prof. Carlos Costa',
    subjects: ['Química', 'Biologia'],
    activeSessions: 2,
    totalStudents: 6,
    rating: 4.6,
    experience: '5 anos',
  },
]

export function ManagerTutoring(): React.ReactElement {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedFilter, setSelectedFilter] = useState('all')
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)

  const filteredSessions = tutoringSessions.filter((session) => {
    const matchesSearch =
      session.student.toLowerCase().includes(searchTerm.toLowerCase()) ||
      session.tutor.toLowerCase().includes(searchTerm.toLowerCase()) ||
      session.subject.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter =
      selectedFilter === 'all' || session.status === selectedFilter
    return matchesSearch && matchesFilter
  })

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge variant="default">Ativa</Badge>
      case 'completed':
        return <Badge variant="secondary">Concluída</Badge>
      case 'paused':
        return <Badge variant="outline">Pausada</Badge>
      case 'cancelled':
        return <Badge variant="destructive">Cancelada</Badge>
      default:
        return <Badge variant="outline">Desconhecido</Badge>
    }
  }

  const getProgressBadge = (progress: string) => {
    switch (progress) {
      case 'excellent':
        return (
          <Badge variant="default" className="bg-green-600">
            Excelente
          </Badge>
        )
      case 'good':
        return (
          <Badge variant="default" className="bg-blue-600">
            Bom
          </Badge>
        )
      case 'needs_attention':
        return <Badge variant="destructive">Precisa Atenção</Badge>
      default:
        return <Badge variant="outline">-</Badge>
    }
  }

  const getProgressPercentage = (completed: number, total: number) => {
    return Math.round((completed / total) * 100)
  }

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {statsCards.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
              <stat.icon className="text-muted-foreground h-4 w-4" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-muted-foreground text-xs">{stat.change}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Tabs defaultValue="sessions" className="space-y-4">
        <TabsList>
          <TabsTrigger value="sessions">Sessões</TabsTrigger>
          <TabsTrigger value="tutors">Tutores</TabsTrigger>
          <TabsTrigger value="reports">Relatórios</TabsTrigger>
        </TabsList>

        <TabsContent value="sessions" className="space-y-4">
          {/* Filters and Actions */}
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="flex flex-1 gap-4">
              <div className="relative max-w-sm flex-1">
                <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
                <Input
                  placeholder="Buscar sessões..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9"
                />
              </div>
              <Select value={selectedFilter} onValueChange={setSelectedFilter}>
                <SelectTrigger className="w-[180px]">
                  <Filter className="mr-2 h-4 w-4" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas</SelectItem>
                  <SelectItem value="active">Ativas</SelectItem>
                  <SelectItem value="completed">Concluídas</SelectItem>
                  <SelectItem value="paused">Pausadas</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Dialog
              open={isCreateDialogOpen}
              onOpenChange={setIsCreateDialogOpen}
            >
              <DialogTrigger asChild>
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Nova Sessão
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Criar Nova Sessão de Tutoria</DialogTitle>
                  <DialogDescription>
                    Configure uma nova sessão de tutoria para um aluno.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="student">Aluno</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione um aluno" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="carlos">
                          Carlos Silva - 9º Ano B
                        </SelectItem>
                        <SelectItem value="ana">
                          Ana Costa - 9º Ano A
                        </SelectItem>
                        <SelectItem value="roberto">
                          Roberto Santos - 8º Ano A
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="tutor">Tutor</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione um tutor" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="maria">
                          Prof. Maria Santos
                        </SelectItem>
                        <SelectItem value="joao">Prof. João Lima</SelectItem>
                        <SelectItem value="ana">Profa. Ana Silva</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="subject">Disciplina</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione a disciplina" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="matematica">Matemática</SelectItem>
                        <SelectItem value="fisica">Física</SelectItem>
                        <SelectItem value="quimica">Química</SelectItem>
                        <SelectItem value="portugues">Português</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="schedule">Horário</Label>
                    <Input
                      id="schedule"
                      placeholder="Ex: Segunda 15:00-16:00"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="sessions">Número de Sessões</Label>
                    <Input id="sessions" type="number" placeholder="12" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="objectives">Objetivos</Label>
                    <Textarea
                      id="objectives"
                      placeholder="Objetivos da tutoria..."
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit">Criar Sessão</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>

          {/* Sessions Table */}
          <Card>
            <CardHeader>
              <CardTitle>Sessões de Tutoria</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Aluno</TableHead>
                    <TableHead>Tutor</TableHead>
                    <TableHead>Disciplina</TableHead>
                    <TableHead>Horário</TableHead>
                    <TableHead>Progresso</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Avaliação</TableHead>
                    <TableHead className="w-[50px]"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredSessions.map((session) => (
                    <TableRow key={session.id}>
                      <TableCell>
                        <div>
                          <div className="font-medium">{session.student}</div>
                          <div className="text-muted-foreground text-sm">
                            {session.class}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{session.tutor}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{session.subject}</Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {session.schedule}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <span className="text-sm">
                            {session.sessionsCompleted}/{session.totalSessions}
                          </span>
                          <span className="text-muted-foreground text-xs">
                            (
                            {getProgressPercentage(
                              session.sessionsCompleted,
                              session.totalSessions,
                            )}
                            %)
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>{getStatusBadge(session.status)}</TableCell>
                      <TableCell>
                        {getProgressBadge(session.progress)}
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>Ver detalhes</DropdownMenuItem>
                            <DropdownMenuItem>Editar sessão</DropdownMenuItem>
                            <DropdownMenuItem>Agendar próxima</DropdownMenuItem>
                            <DropdownMenuItem>Pausar tutoria</DropdownMenuItem>
                            <DropdownMenuItem className="text-red-600">
                              Cancelar
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="tutors" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Professores Tutores</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nome</TableHead>
                    <TableHead>Disciplinas</TableHead>
                    <TableHead>Sessões Ativas</TableHead>
                    <TableHead>Total de Alunos</TableHead>
                    <TableHead>Avaliação</TableHead>
                    <TableHead>Experiência</TableHead>
                    <TableHead className="w-[50px]"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {tutors.map((tutor) => (
                    <TableRow key={tutor.id}>
                      <TableCell className="font-medium">
                        {tutor.name}
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1">
                          {tutor.subjects.map((subject) => (
                            <Badge
                              key={subject}
                              variant="outline"
                              className="text-xs"
                            >
                              {subject}
                            </Badge>
                          ))}
                        </div>
                      </TableCell>
                      <TableCell>{tutor.activeSessions}</TableCell>
                      <TableCell>{tutor.totalStudents}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <span className="text-sm font-medium">
                            {tutor.rating}
                          </span>
                          <span className="text-muted-foreground text-xs">
                            ⭐
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>{tutor.experience}</TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>Ver perfil</DropdownMenuItem>
                            <DropdownMenuItem>Ver sessões</DropdownMenuItem>
                            <DropdownMenuItem>
                              Avaliar desempenho
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reports" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Relatórios de Tutoria</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Relatórios e estatísticas de tutoria em desenvolvimento...
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
