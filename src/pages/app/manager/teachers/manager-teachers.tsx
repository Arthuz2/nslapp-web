import {
  Download,
  Filter,
  Mail,
  MoreHorizontal,
  Phone,
  Plus,
  Search,
  Star,
  Upload,
} from 'lucide-react'
import { useState } from 'react'

import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Dialog,
  DialogContent,
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
import { Textarea } from '@/components/ui/textarea'

const teacherStats = [
  {
    title: 'Total de Professores',
    value: '68',
    change: '+3 este mês',
    color: 'text-blue-600',
    bgColor: 'bg-blue-50 dark:bg-blue-950',
  },
  {
    title: 'Professores Ativos',
    value: '65',
    change: '95.6% ativo',
    color: 'text-green-600',
    bgColor: 'bg-green-50 dark:bg-green-950',
  },
  {
    title: 'Média de Satisfação',
    value: '4.7',
    change: '+0.2 este mês',
    color: 'text-yellow-600',
    bgColor: 'bg-yellow-50 dark:bg-yellow-950',
  },
  {
    title: 'Novos Professores',
    value: '3',
    change: 'Este semestre',
    color: 'text-purple-600',
    bgColor: 'bg-purple-50 dark:bg-purple-950',
  },
]

const teachers = [
  {
    id: '1',
    name: 'Prof. Alex Menezes',
    email: 'alex.menezes@nsl.edu.br',
    phone: '(11) 99999-0001',
    subject: 'Matemática',
    classes: 6,
    students: 180,
    experience: '8 anos',
    rating: 4.8,
    status: 'active',
    contract: 'Efetivo',
    salary: 'R$ 8.500',
    lastLogin: 'Hoje, 08:30',
  },
  {
    id: '2',
    name: 'Prof. Ana Santos',
    email: 'ana.santos@nsl.edu.br',
    phone: '(11) 99999-0002',
    subject: 'Português',
    classes: 5,
    students: 150,
    experience: '12 anos',
    rating: 4.9,
    status: 'active',
    contract: 'Efetivo',
    salary: 'R$ 9.200',
    lastLogin: 'Hoje, 07:45',
  },
  {
    id: '3',
    name: 'Prof. Carlos Lima',
    email: 'carlos.lima@nsl.edu.br',
    phone: '(11) 99999-0003',
    subject: 'Biologia',
    classes: 4,
    students: 120,
    experience: '6 anos',
    rating: 4.6,
    status: 'active',
    contract: 'Efetivo',
    salary: 'R$ 7.800',
    lastLogin: 'Ontem, 18:20',
  },
  {
    id: '4',
    name: 'Prof. Maria Clara',
    email: 'maria.clara@nsl.edu.br',
    phone: '(11) 99999-0004',
    subject: 'História',
    classes: 5,
    students: 155,
    experience: '10 anos',
    rating: 4.7,
    status: 'active',
    contract: 'Efetivo',
    salary: 'R$ 8.800',
    lastLogin: 'Hoje, 09:15',
  },
  {
    id: '5',
    name: 'Prof. Roberto Silva',
    email: 'roberto.silva@nsl.edu.br',
    phone: '(11) 99999-0005',
    subject: 'Física',
    classes: 4,
    students: 125,
    experience: '5 anos',
    rating: 4.5,
    status: 'active',
    contract: 'Contrato',
    salary: 'R$ 7.200',
    lastLogin: 'Hoje, 10:30',
  },
  {
    id: '6',
    name: 'Prof. Juliana Costa',
    email: 'juliana.costa@nsl.edu.br',
    phone: '(11) 99999-0006',
    subject: 'Química',
    classes: 3,
    students: 90,
    experience: '4 anos',
    rating: 4.4,
    status: 'vacation',
    contract: 'Efetivo',
    salary: 'R$ 7.500',
    lastLogin: '15/01/2024',
  },
]

const subjects = [
  'Todas',
  'Matemática',
  'Português',
  'Biologia',
  'História',
  'Física',
  'Química',
  'Geografia',
  'Inglês',
]
const contracts = ['Todos', 'Efetivo', 'Contrato', 'Substituto']
const statuses = ['Todos', 'Ativo', 'Férias', 'Licença', 'Inativo']

export function ManagerTeachers() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedSubject, setSelectedSubject] = useState('Todas')
  const [selectedContract, setSelectedContract] = useState('Todos')
  const [selectedStatus, setSelectedStatus] = useState('Todos')

  const filteredTeachers = teachers.filter((teacher) => {
    const matchesSearch =
      teacher.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      teacher.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      teacher.subject.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesSubject =
      selectedSubject === 'Todas' || teacher.subject === selectedSubject
    const matchesContract =
      selectedContract === 'Todos' || teacher.contract === selectedContract
    const matchesStatus =
      selectedStatus === 'Todos' ||
      (selectedStatus === 'Ativo' && teacher.status === 'active') ||
      (selectedStatus === 'Férias' && teacher.status === 'vacation') ||
      (selectedStatus === 'Licença' && teacher.status === 'leave') ||
      (selectedStatus === 'Inativo' && teacher.status === 'inactive')

    return matchesSearch && matchesSubject && matchesContract && matchesStatus
  })

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Gestão de Professores</h1>
          <p className="text-muted-foreground">
            Gerencie todos os professores da instituição
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Exportar
          </Button>
          <Button variant="outline">
            <Upload className="mr-2 h-4 w-4" />
            Importar
          </Button>
          <Dialog>
            <DialogTrigger asChild>
              <Button className="bg-blue-600 hover:bg-blue-700">
                <Plus className="mr-2 h-4 w-4" />
                Novo Professor
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Adicionar Novo Professor</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Nome Completo</Label>
                    <Input id="name" placeholder="Nome do professor" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="email@nsl.edu.br"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="phone">Telefone</Label>
                    <Input id="phone" placeholder="(11) 99999-9999" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="subject">Disciplina</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione a disciplina" />
                      </SelectTrigger>
                      <SelectContent>
                        {subjects.slice(1).map((subject) => (
                          <SelectItem key={subject} value={subject}>
                            {subject}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="contract">Tipo de Contrato</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o contrato" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="efetivo">Efetivo</SelectItem>
                        <SelectItem value="contrato">Contrato</SelectItem>
                        <SelectItem value="substituto">Substituto</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="salary">Salário</Label>
                    <Input id="salary" placeholder="R$ 0,00" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="bio">Biografia/Experiência</Label>
                  <Textarea
                    id="bio"
                    placeholder="Descreva a experiência do professor..."
                  />
                </div>
                <div className="flex justify-end gap-2">
                  <Button variant="outline">Cancelar</Button>
                  <Button>Adicionar Professor</Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {teacherStats.map((stat) => (
          <Card key={stat.title} className="transition-shadow hover:shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-muted-foreground text-sm font-medium">
                {stat.title}
              </CardTitle>
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

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Filtros</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-4">
            <div className="min-w-[200px] flex-1">
              <div className="relative">
                <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform" />
                <Input
                  placeholder="Buscar por nome, email ou disciplina..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={selectedSubject} onValueChange={setSelectedSubject}>
              <SelectTrigger className="w-[150px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {subjects.map((subject) => (
                  <SelectItem key={subject} value={subject}>
                    {subject}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select
              value={selectedContract}
              onValueChange={setSelectedContract}
            >
              <SelectTrigger className="w-[150px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {contracts.map((contract) => (
                  <SelectItem key={contract} value={contract}>
                    {contract}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
              <SelectTrigger className="w-[150px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {statuses.map((status) => (
                  <SelectItem key={status} value={status}>
                    {status}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Teachers List */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Professores ({filteredTeachers.length})</CardTitle>
            <Button variant="outline" size="sm">
              <Filter className="mr-2 h-4 w-4" />
              Filtros Avançados
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredTeachers.map((teacher) => (
              <div
                key={teacher.id}
                className="hover:bg-muted/50 flex items-center justify-between rounded-lg border p-4 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <Avatar className="h-12 w-12">
                    <AvatarFallback className="bg-blue-100 font-semibold text-blue-600">
                      {teacher.name
                        .split(' ')
                        .map((n) => n[0])
                        .join('')
                        .slice(0, 2)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-medium">{teacher.name}</h3>
                      <Badge
                        className={
                          teacher.status === 'active'
                            ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                            : teacher.status === 'vacation'
                              ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                              : 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
                        }
                      >
                        {teacher.status === 'active'
                          ? 'Ativo'
                          : teacher.status === 'vacation'
                            ? 'Férias'
                            : 'Inativo'}
                      </Badge>
                      <Badge variant="outline">{teacher.contract}</Badge>
                    </div>
                    <div className="text-muted-foreground flex items-center gap-4 text-sm">
                      <span>{teacher.subject}</span>
                      <span>•</span>
                      <span>{teacher.classes} turmas</span>
                      <span>•</span>
                      <span>{teacher.students} alunos</span>
                      <span>•</span>
                      <span>{teacher.experience}</span>
                    </div>
                    <div className="flex items-center gap-4 text-sm">
                      <div className="flex items-center gap-1">
                        <Mail className="h-3 w-3" />
                        <span>{teacher.email}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Phone className="h-3 w-3" />
                        <span>{teacher.phone}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-center">
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="font-medium">{teacher.rating}</span>
                    </div>
                    <div className="text-muted-foreground text-xs">
                      Avaliação
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-sm">{teacher.lastLogin}</div>
                    <div className="text-muted-foreground text-xs">
                      Último acesso
                    </div>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>Ver Perfil</DropdownMenuItem>
                      <DropdownMenuItem>Editar Dados</DropdownMenuItem>
                      <DropdownMenuItem>Ver Turmas</DropdownMenuItem>
                      <DropdownMenuItem>Histórico</DropdownMenuItem>
                      <DropdownMenuItem>Enviar Mensagem</DropdownMenuItem>
                      <DropdownMenuItem className="text-red-600">
                        Desativar
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
