import {
  AlertCircle,
  Calendar,
  CheckCircle,
  Clock,
  Edit,
  GraduationCap,
  MoreHorizontal,
  Plus,
  Search,
  Trash2,
  User,
  XCircle,
} from 'lucide-react'
import { useState } from 'react'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Dialog,
  DialogContent,
  DialogDescription,
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

interface TutoringSession {
  id: string
  studentName: string
  studentAvatar: string
  subject: string
  date: string
  time: string
  duration: number
  status: 'scheduled' | 'completed' | 'cancelled' | 'in-progress'
  type: 'individual' | 'group'
  topic: string
  objectives: string[]
  notes: string
  progress: number
}

const mockSessions: TutoringSession[] = [
  {
    id: '1',
    studentName: 'Ana Silva Santos',
    studentAvatar: '/placeholder.svg?height=40&width=40',
    subject: 'Matemática',
    date: '2024-01-20',
    time: '14:00',
    duration: 60,
    status: 'scheduled',
    type: 'individual',
    topic: 'Álgebra Linear',
    objectives: [
      'Resolver equações de 1º grau',
      'Compreender sistemas lineares',
    ],
    notes: '',
    progress: 0,
  },
  {
    id: '2',
    studentName: 'Carlos Oliveira',
    studentAvatar: '/placeholder.svg?height=40&width=40',
    subject: 'Matemática',
    date: '2024-01-18',
    time: '15:30',
    duration: 45,
    status: 'completed',
    type: 'individual',
    topic: 'Frações',
    objectives: ['Operações com frações', 'Simplificação'],
    notes: 'Aluno demonstrou boa evolução. Precisa praticar mais exercícios.',
    progress: 75,
  },
  {
    id: '3',
    studentName: 'Grupo 7º A',
    studentAvatar: '/placeholder.svg?height=40&width=40',
    subject: 'Ciências',
    date: '2024-01-22',
    time: '16:00',
    duration: 90,
    status: 'scheduled',
    type: 'group',
    topic: 'Sistema Solar',
    objectives: ['Identificar planetas', 'Compreender órbitas'],
    notes: '',
    progress: 0,
  },
]

const statusColors = {
  scheduled: 'bg-blue-100 text-blue-800',
  completed: 'bg-green-100 text-green-800',
  cancelled: 'bg-red-100 text-red-800',
  'in-progress': 'bg-yellow-100 text-yellow-800',
}

const statusLabels = {
  scheduled: 'Agendado',
  completed: 'Concluído',
  cancelled: 'Cancelado',
  'in-progress': 'Em Andamento',
}

const statusIcons = {
  scheduled: Clock,
  completed: CheckCircle,
  cancelled: XCircle,
  'in-progress': AlertCircle,
}

const typeColors = {
  individual: 'bg-purple-100 text-purple-800',
  group: 'bg-orange-100 text-orange-800',
}

const typeLabels = {
  individual: 'Individual',
  group: 'Grupo',
}

export function TeacherTutoring() {
  const [sessions, setSessions] = useState<TutoringSession[]>(mockSessions)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedStatus, setSelectedStatus] = useState('all')
  const [selectedType, setSelectedType] = useState('all')
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)

  const filteredSessions = sessions.filter((session) => {
    const matchesSearch =
      session.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      session.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      session.topic.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus =
      selectedStatus === 'all' || session.status === selectedStatus
    const matchesType = selectedType === 'all' || session.type === selectedType

    return matchesSearch && matchesStatus && matchesType
  })

  const totalSessions = sessions.length
  const scheduledSessions = sessions.filter(
    (session) => session.status === 'scheduled',
  ).length
  const completedSessions = sessions.filter(
    (session) => session.status === 'completed',
  ).length
  const individualSessions = sessions.filter(
    (session) => session.type === 'individual',
  ).length

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total de Sessões
            </CardTitle>
            <GraduationCap className="text-muted-foreground h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalSessions}</div>
            <p className="text-muted-foreground text-xs">Sessões criadas</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Agendadas</CardTitle>
            <Clock className="text-muted-foreground h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{scheduledSessions}</div>
            <p className="text-muted-foreground text-xs">Próximas sessões</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Concluídas</CardTitle>
            <CheckCircle className="text-muted-foreground h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{completedSessions}</div>
            <p className="text-muted-foreground text-xs">Sessões finalizadas</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Individuais</CardTitle>
            <User className="text-muted-foreground h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{individualSessions}</div>
            <p className="text-muted-foreground text-xs">
              Atendimento individual
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="sessions" className="space-y-4">
        <div className="flex items-center justify-between">
          <TabsList>
            <TabsTrigger value="sessions">Sessões</TabsTrigger>
            <TabsTrigger value="calendar">Calendário</TabsTrigger>
            <TabsTrigger value="progress">Progresso</TabsTrigger>
          </TabsList>

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
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Agendar Sessão de Tutoria</DialogTitle>
                <DialogDescription>
                  Crie uma nova sessão de tutoria para acompanhamento individual
                  ou em grupo
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="type">Tipo de Sessão</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o tipo" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="individual">Individual</SelectItem>
                        <SelectItem value="group">Grupo</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="student">Aluno/Grupo</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o aluno" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="ana">Ana Silva Santos</SelectItem>
                        <SelectItem value="carlos">Carlos Oliveira</SelectItem>
                        <SelectItem value="grupo7a">Grupo 7º A</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="subject">Disciplina</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione a disciplina" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="matematica">Matemática</SelectItem>
                        <SelectItem value="portugues">Português</SelectItem>
                        <SelectItem value="historia">História</SelectItem>
                        <SelectItem value="ciencias">Ciências</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="topic">Tópico</Label>
                    <Input id="topic" placeholder="Ex: Álgebra Linear" />
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="date">Data</Label>
                    <Input id="date" type="date" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="time">Horário</Label>
                    <Input id="time" type="time" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="duration">Duração (min)</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Duração" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="30">30 minutos</SelectItem>
                        <SelectItem value="45">45 minutos</SelectItem>
                        <SelectItem value="60">60 minutos</SelectItem>
                        <SelectItem value="90">90 minutos</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="objectives">Objetivos da Sessão</Label>
                  <Textarea
                    id="objectives"
                    placeholder="Liste os objetivos que devem ser alcançados..."
                    rows={3}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="notes">Observações</Label>
                  <Textarea
                    id="notes"
                    placeholder="Adicione observações sobre a sessão..."
                    rows={2}
                  />
                </div>
              </div>
              <div className="flex justify-end space-x-2">
                <Button
                  variant="outline"
                  onClick={() => setIsCreateDialogOpen(false)}
                >
                  Cancelar
                </Button>
                <Button onClick={() => setIsCreateDialogOpen(false)}>
                  Agendar Sessão
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <TabsContent value="sessions" className="space-y-4">
          {/* Filters */}
          <Card>
            <CardHeader>
              <CardTitle>Filtros</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-4 sm:flex-row">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="text-muted-foreground absolute top-2.5 left-2 h-4 w-4" />
                    <Input
                      placeholder="Buscar sessões..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-8"
                    />
                  </div>
                </div>
                <Select
                  value={selectedStatus}
                  onValueChange={setSelectedStatus}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos os status</SelectItem>
                    <SelectItem value="scheduled">Agendado</SelectItem>
                    <SelectItem value="in-progress">Em Andamento</SelectItem>
                    <SelectItem value="completed">Concluído</SelectItem>
                    <SelectItem value="cancelled">Cancelado</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={selectedType} onValueChange={setSelectedType}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos os tipos</SelectItem>
                    <SelectItem value="individual">Individual</SelectItem>
                    <SelectItem value="group">Grupo</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Sessions Table */}
          <Card>
            <CardHeader>
              <CardTitle>Sessões de Tutoria</CardTitle>
              <CardDescription>
                Gerencie todas as suas sessões de tutoria
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Aluno/Grupo</TableHead>
                    <TableHead>Disciplina</TableHead>
                    <TableHead>Tópico</TableHead>
                    <TableHead>Data/Hora</TableHead>
                    <TableHead>Duração</TableHead>
                    <TableHead>Tipo</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredSessions.map((session) => {
                    const StatusIcon = statusIcons[session.status]
                    return (
                      <TableRow key={session.id}>
                        <TableCell className="font-medium">
                          <div className="flex items-center space-x-3">
                            <Avatar className="h-8 w-8">
                              <AvatarImage
                                src={
                                  session.studentAvatar || '/placeholder.svg'
                                }
                              />
                              <AvatarFallback>
                                {session.studentName
                                  .split(' ')
                                  .map((n) => n[0])
                                  .join('')}
                              </AvatarFallback>
                            </Avatar>
                            <span>{session.studentName}</span>
                          </div>
                        </TableCell>
                        <TableCell>{session.subject}</TableCell>
                        <TableCell>{session.topic}</TableCell>
                        <TableCell>
                          <div>
                            <p className="font-medium">
                              {new Date(session.date).toLocaleDateString(
                                'pt-BR',
                              )}
                            </p>
                            <p className="text-muted-foreground text-sm">
                              {session.time}
                            </p>
                          </div>
                        </TableCell>
                        <TableCell>{session.duration} min</TableCell>
                        <TableCell>
                          <Badge className={typeColors[session.type]}>
                            {typeLabels[session.type]}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge className={statusColors[session.status]}>
                            <StatusIcon className="mr-1 h-3 w-3" />
                            {statusLabels[session.status]}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" className="h-8 w-8 p-0">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>
                                <Edit className="mr-2 h-4 w-4" />
                                Editar
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <CheckCircle className="mr-2 h-4 w-4" />
                                Marcar como Concluída
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Calendar className="mr-2 h-4 w-4" />
                                Reagendar
                              </DropdownMenuItem>
                              <DropdownMenuItem className="text-red-600">
                                <Trash2 className="mr-2 h-4 w-4" />
                                Cancelar
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    )
                  })}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="calendar" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Calendário de Tutorias</CardTitle>
              <CardDescription>
                Visualize suas sessões organizadas por data
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-muted-foreground py-8 text-center">
                <Calendar className="mx-auto mb-4 h-12 w-12" />
                <p>Calendário de tutorias em desenvolvimento</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="progress" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Progresso dos Alunos</CardTitle>
              <CardDescription>
                Acompanhe o desenvolvimento dos alunos nas sessões de tutoria
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {sessions
                  .filter((s) => s.status === 'completed')
                  .map((session) => (
                    <div key={session.id} className="rounded-lg border p-4">
                      <div className="mb-2 flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <Avatar className="h-8 w-8">
                            <AvatarImage
                              src={session.studentAvatar || '/placeholder.svg'}
                            />
                            <AvatarFallback>
                              {session.studentName
                                .split(' ')
                                .map((n) => n[0])
                                .join('')}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">{session.studentName}</p>
                            <p className="text-muted-foreground text-sm">
                              {session.subject} - {session.topic}
                            </p>
                          </div>
                        </div>
                        <Badge className="bg-green-100 text-green-800">
                          {session.progress}% concluído
                        </Badge>
                      </div>
                      <div className="mb-2 h-2 w-full rounded-full bg-gray-200">
                        <div
                          className="h-2 rounded-full bg-green-600"
                          style={{ width: `${session.progress}%` }}
                        ></div>
                      </div>
                      {session.notes && (
                        <p className="text-muted-foreground text-sm">
                          {session.notes}
                        </p>
                      )}
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
