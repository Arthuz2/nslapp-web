import {
  AlertTriangle,
  CheckCircle,
  Edit,
  Eye,
  GraduationCap,
  Mail,
  MessageCircle,
  MoreHorizontal,
  Phone,
  Search,
  TrendingDown,
  TrendingUp,
  Users,
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
} from '@/components/ui/dialog'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Input } from '@/components/ui/input'
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

interface Student {
  id: string
  name: string
  email: string
  class: string
  avatar: string
  phone: string
  parentName: string
  parentPhone: string
  parentEmail: string
  average: number
  attendance: number
  status: 'excellent' | 'good' | 'attention' | 'critical'
  lastActivity: string
  subjects: {
    name: string
    grade: number
    attendance: number
  }[]
  observations: string[]
}

const mockStudents: Student[] = [
  {
    id: '1',
    name: 'Ana Silva Santos',
    email: 'ana.santos@email.com',
    class: '9º A',
    avatar: '/placeholder.svg?height=40&width=40',
    phone: '(11) 99999-1111',
    parentName: 'Maria Santos',
    parentPhone: '(11) 98888-1111',
    parentEmail: 'maria.santos@email.com',
    average: 8.5,
    attendance: 95,
    status: 'excellent',
    lastActivity: '2024-01-15',
    subjects: [
      { name: 'Matemática', grade: 8.5, attendance: 95 },
      { name: 'Português', grade: 9.0, attendance: 98 },
    ],
    observations: ['Aluna dedicada', 'Participa ativamente das aulas'],
  },
  {
    id: '2',
    name: 'Carlos Oliveira',
    email: 'carlos.oliveira@email.com',
    class: '9º A',
    avatar: '/placeholder.svg?height=40&width=40',
    phone: '(11) 99999-2222',
    parentName: 'João Oliveira',
    parentPhone: '(11) 98888-2222',
    parentEmail: 'joao.oliveira@email.com',
    average: 6.8,
    attendance: 78,
    status: 'attention',
    lastActivity: '2024-01-14',
    subjects: [
      { name: 'Matemática', grade: 6.5, attendance: 75 },
      { name: 'Português', grade: 7.0, attendance: 80 },
    ],
    observations: [
      'Precisa melhorar a frequência',
      'Dificuldades em matemática',
    ],
  },
  {
    id: '3',
    name: 'Beatriz Costa',
    email: 'beatriz.costa@email.com',
    class: '8º B',
    avatar: '/placeholder.svg?height=40&width=40',
    phone: '(11) 99999-3333',
    parentName: 'Sandra Costa',
    parentPhone: '(11) 98888-3333',
    parentEmail: 'sandra.costa@email.com',
    average: 9.2,
    attendance: 98,
    status: 'excellent',
    lastActivity: '2024-01-15',
    subjects: [
      { name: 'História', grade: 9.5, attendance: 100 },
      { name: 'Ciências', grade: 8.8, attendance: 95 },
    ],
    observations: ['Excelente desempenho', 'Líder natural'],
  },
]

const statusColors = {
  excellent: 'bg-green-100 text-green-800',
  good: 'bg-blue-100 text-blue-800',
  attention: 'bg-yellow-100 text-yellow-800',
  critical: 'bg-red-100 text-red-800',
}

const statusLabels = {
  excellent: 'Excelente',
  good: 'Bom',
  attention: 'Atenção',
  critical: 'Crítico',
}

const statusIcons = {
  excellent: CheckCircle,
  good: TrendingUp,
  attention: AlertTriangle,
  critical: TrendingDown,
}

export function TeacherStudents() {
  const [students, setStudents] = useState<Student[]>(mockStudents)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedClass, setSelectedClass] = useState('all')
  const [selectedStatus, setSelectedStatus] = useState('all')
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null)
  const [isProfileDialogOpen, setIsProfileDialogOpen] = useState(false)

  const filteredStudents = students.filter((student) => {
    const matchesSearch =
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesClass =
      selectedClass === 'all' || student.class === selectedClass
    const matchesStatus =
      selectedStatus === 'all' || student.status === selectedStatus

    return matchesSearch && matchesClass && matchesStatus
  })

  const classes = Array.from(new Set(students.map((student) => student.class)))

  const totalStudents = students.length
  const excellentStudents = students.filter(
    (student) => student.status === 'excellent',
  ).length
  const attentionStudents = students.filter(
    (student) => student.status === 'attention',
  ).length
  const criticalStudents = students.filter(
    (student) => student.status === 'critical',
  ).length

  const openProfile = (student: Student) => {
    setSelectedStudent(student)
    setIsProfileDialogOpen(true)
  }

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total de Alunos
            </CardTitle>
            <Users className="text-muted-foreground h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalStudents}</div>
            <p className="text-muted-foreground text-xs">Alunos matriculados</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Excelente</CardTitle>
            <CheckCircle className="text-muted-foreground h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{excellentStudents}</div>
            <p className="text-muted-foreground text-xs">
              Desempenho excelente
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Atenção</CardTitle>
            <AlertTriangle className="text-muted-foreground h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{attentionStudents}</div>
            <p className="text-muted-foreground text-xs">Precisam de atenção</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Crítico</CardTitle>
            <TrendingDown className="text-muted-foreground h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{criticalStudents}</div>
            <p className="text-muted-foreground text-xs">Situação crítica</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="list" className="space-y-4">
        <TabsList>
          <TabsTrigger value="list">Lista de Alunos</TabsTrigger>
          <TabsTrigger value="performance">Desempenho</TabsTrigger>
          <TabsTrigger value="attendance">Frequência</TabsTrigger>
        </TabsList>

        <TabsContent value="list" className="space-y-4">
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
                      placeholder="Buscar alunos..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-8"
                    />
                  </div>
                </div>
                <Select value={selectedClass} onValueChange={setSelectedClass}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Turma" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todas as turmas</SelectItem>
                    {classes.map((cls) => (
                      <SelectItem key={cls} value={cls}>
                        {cls}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select
                  value={selectedStatus}
                  onValueChange={setSelectedStatus}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos os status</SelectItem>
                    <SelectItem value="excellent">Excelente</SelectItem>
                    <SelectItem value="good">Bom</SelectItem>
                    <SelectItem value="attention">Atenção</SelectItem>
                    <SelectItem value="critical">Crítico</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Students Table */}
          <Card>
            <CardHeader>
              <CardTitle>Lista de Alunos</CardTitle>
              <CardDescription>
                Informações gerais dos seus alunos
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Aluno</TableHead>
                    <TableHead>Turma</TableHead>
                    <TableHead>Média</TableHead>
                    <TableHead>Frequência</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Última Atividade</TableHead>
                    <TableHead className="text-right">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredStudents.map((student) => {
                    const StatusIcon = statusIcons[student.status]
                    return (
                      <TableRow key={student.id}>
                        <TableCell className="font-medium">
                          <div className="flex items-center space-x-3">
                            <Avatar className="h-8 w-8">
                              <AvatarImage
                                src={student.avatar || '/placeholder.svg'}
                              />
                              <AvatarFallback>
                                {student.name
                                  .split(' ')
                                  .map((n) => n[0])
                                  .join('')}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium">{student.name}</p>
                              <p className="text-muted-foreground text-sm">
                                {student.email}
                              </p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>{student.class}</TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-1">
                            <span className="font-medium">
                              {student.average.toFixed(1)}
                            </span>
                            {student.average >= 8 ? (
                              <TrendingUp className="h-4 w-4 text-green-600" />
                            ) : student.average >= 6 ? (
                              <TrendingUp className="h-4 w-4 text-yellow-600" />
                            ) : (
                              <TrendingDown className="h-4 w-4 text-red-600" />
                            )}
                          </div>
                        </TableCell>
                        <TableCell>{student.attendance}%</TableCell>
                        <TableCell>
                          <Badge className={statusColors[student.status]}>
                            <StatusIcon className="mr-1 h-3 w-3" />
                            {statusLabels[student.status]}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          {new Date(student.lastActivity).toLocaleDateString(
                            'pt-BR',
                          )}
                        </TableCell>
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" className="h-8 w-8 p-0">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem
                                onClick={() => openProfile(student)}
                              >
                                <Eye className="mr-2 h-4 w-4" />
                                Ver Perfil
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <MessageCircle className="mr-2 h-4 w-4" />
                                Enviar Mensagem
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Phone className="mr-2 h-4 w-4" />
                                Contatar Responsável
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Edit className="mr-2 h-4 w-4" />
                                Adicionar Observação
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

        <TabsContent value="performance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Análise de Desempenho</CardTitle>
              <CardDescription>
                Acompanhe o desempenho acadêmico dos alunos
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-muted-foreground py-8 text-center">
                <GraduationCap className="mx-auto mb-4 h-12 w-12" />
                <p>Gráficos de desempenho em desenvolvimento</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="attendance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Controle de Frequência</CardTitle>
              <CardDescription>
                Monitore a frequência dos alunos
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-muted-foreground py-8 text-center">
                <Users className="mx-auto mb-4 h-12 w-12" />
                <p>Relatórios de frequência em desenvolvimento</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Student Profile Dialog */}
      <Dialog open={isProfileDialogOpen} onOpenChange={setIsProfileDialogOpen}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>Perfil do Aluno</DialogTitle>
            <DialogDescription>
              Informações detalhadas do aluno
            </DialogDescription>
          </DialogHeader>
          {selectedStudent && (
            <div className="grid gap-6 py-4">
              <div className="flex items-center space-x-4">
                <Avatar className="h-16 w-16">
                  <AvatarImage
                    src={selectedStudent.avatar || '/placeholder.svg'}
                  />
                  <AvatarFallback>
                    {selectedStudent.name
                      .split(' ')
                      .map((n) => n[0])
                      .join('')}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="text-lg font-semibold">
                    {selectedStudent.name}
                  </h3>
                  <p className="text-muted-foreground">
                    {selectedStudent.class}
                  </p>
                  <Badge className={statusColors[selectedStudent.status]}>
                    {statusLabels[selectedStudent.status]}
                  </Badge>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <h4 className="mb-2 font-semibold">
                      Informações de Contato
                    </h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center space-x-2">
                        <Mail className="h-4 w-4" />
                        <span>{selectedStudent.email}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Phone className="h-4 w-4" />
                        <span>{selectedStudent.phone}</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="mb-2 font-semibold">Responsável</h4>
                    <div className="space-y-2 text-sm">
                      <p>
                        <strong>Nome:</strong> {selectedStudent.parentName}
                      </p>
                      <div className="flex items-center space-x-2">
                        <Phone className="h-4 w-4" />
                        <span>{selectedStudent.parentPhone}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Mail className="h-4 w-4" />
                        <span>{selectedStudent.parentEmail}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <h4 className="mb-2 font-semibold">
                      Desempenho por Disciplina
                    </h4>
                    <div className="space-y-2">
                      {selectedStudent.subjects.map((subject, index) => (
                        <div
                          key={index}
                          className="bg-muted flex items-center justify-between rounded p-2"
                        >
                          <span className="text-sm">{subject.name}</span>
                          <div className="text-right">
                            <p className="text-sm font-medium">
                              Nota: {subject.grade.toFixed(1)}
                            </p>
                            <p className="text-muted-foreground text-xs">
                              Freq: {subject.attendance}%
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="mb-2 font-semibold">Observações</h4>
                    <div className="space-y-1">
                      {selectedStudent.observations.map((obs, index) => (
                        <p key={index} className="bg-muted rounded p-2 text-sm">
                          {obs}
                        </p>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-end space-x-2">
                <Button
                  variant="outline"
                  onClick={() => setIsProfileDialogOpen(false)}
                >
                  Fechar
                </Button>
                <Button>
                  <Edit className="mr-2 h-4 w-4" />
                  Editar Observações
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
