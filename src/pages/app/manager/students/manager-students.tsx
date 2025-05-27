import {
  Download,
  Edit,
  Eye,
  Filter,
  GraduationCap,
  Mail,
  MoreHorizontal,
  Phone,
  Plus,
  Search,
  Trash2,
  Upload,
} from 'lucide-react'
import { useState } from 'react'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
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

const students = [
  {
    id: '1',
    name: 'Arthur Porcino Pereira',
    email: 'arthur.porcino@nsl.edu.br',
    phone: '(11) 99999-9999',
    class: '3ªIM01-EMI-IPI',
    course: 'Técnico em Informática',
    status: 'active',
    average: 8.5,
    attendance: 95,
    enrollmentDate: '2022-02-01',
    birthDate: '2005-03-15',
    address: 'Rua das Flores, 123 - São Paulo, SP',
  },
  {
    id: '2',
    name: 'Maria Silva Santos',
    email: 'maria.silva@nsl.edu.br',
    phone: '(11) 88888-8888',
    class: '3ªIM01-EMI-IPI',
    course: 'Técnico em Informática',
    status: 'active',
    average: 9.2,
    attendance: 98,
    enrollmentDate: '2022-02-01',
    birthDate: '2005-05-20',
    address: 'Av. Paulista, 456 - São Paulo, SP',
  },
  {
    id: '3',
    name: 'João Pedro Costa',
    email: 'joao.costa@nsl.edu.br',
    phone: '(11) 77777-7777',
    class: '2ªIM02-EMI-IPI',
    course: 'Técnico em Informática',
    status: 'active',
    average: 7.8,
    attendance: 92,
    enrollmentDate: '2023-02-01',
    birthDate: '2006-01-10',
    address: 'Rua Augusta, 789 - São Paulo, SP',
  },
  {
    id: '4',
    name: 'Ana Carolina Lima',
    email: 'ana.lima@nsl.edu.br',
    phone: '(11) 66666-6666',
    class: '1ªADM01-EMI-ADM',
    course: 'Técnico em Administração',
    status: 'inactive',
    average: 6.5,
    attendance: 85,
    enrollmentDate: '2024-02-01',
    birthDate: '2007-08-25',
    address: 'Rua da Consolação, 321 - São Paulo, SP',
  },
]

const stats = [
  {
    title: 'Total de Alunos',
    value: '1,247',
    change: '+45 este semestre',
    color: 'text-blue-600',
    bgColor: 'bg-blue-50 dark:bg-blue-950',
  },
  {
    title: 'Alunos Ativos',
    value: '1,198',
    change: '96% do total',
    color: 'text-green-600',
    bgColor: 'bg-green-50 dark:bg-green-950',
  },
  {
    title: 'Média Geral',
    value: '7.9',
    change: '+0.2 este mês',
    color: 'text-purple-600',
    bgColor: 'bg-purple-50 dark:bg-purple-950',
  },
  {
    title: 'Frequência Média',
    value: '94.5%',
    change: '+1.2% este mês',
    color: 'text-yellow-600',
    bgColor: 'bg-yellow-50 dark:bg-yellow-950',
  },
]

export function ManagerStudents() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedClass, setSelectedClass] = useState('all')
  const [selectedStatus, setSelectedStatus] = useState('all')

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
      case 'inactive':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
      case 'suspended':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active':
        return 'Ativo'
      case 'inactive':
        return 'Inativo'
      case 'suspended':
        return 'Suspenso'
      default:
        return 'Desconhecido'
    }
  }

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

  return (
    <div className="space-y-6 p-4 md:p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-r from-blue-600 to-purple-600">
            <GraduationCap className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold">Gestão de Alunos</h1>
            <p className="text-muted-foreground">
              Gerencie todos os alunos da instituição
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Upload className="mr-2 h-4 w-4" />
            Importar
          </Button>
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Exportar
          </Button>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Novo Aluno
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title} className="transition-shadow hover:shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-muted-foreground text-sm font-medium">
                {stat.title}
              </CardTitle>
              <div className={`rounded-lg p-2 ${stat.bgColor}`}>
                <GraduationCap className={`h-5 w-5 ${stat.color}`} />
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

      {/* Filters and Search */}
      <Card>
        <CardHeader>
          <CardTitle>Filtros e Busca</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4 md:flex-row">
            <div className="flex-1">
              <div className="relative">
                <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform" />
                <Input
                  placeholder="Buscar por nome ou email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={selectedClass} onValueChange={setSelectedClass}>
              <SelectTrigger className="w-full md:w-[200px]">
                <SelectValue placeholder="Filtrar por turma" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas as turmas</SelectItem>
                <SelectItem value="3ªIM01-EMI-IPI">3ªIM01-EMI-IPI</SelectItem>
                <SelectItem value="2ªIM02-EMI-IPI">2ªIM02-EMI-IPI</SelectItem>
                <SelectItem value="1ªADM01-EMI-ADM">1ªADM01-EMI-ADM</SelectItem>
              </SelectContent>
            </Select>
            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
              <SelectTrigger className="w-full md:w-[200px]">
                <SelectValue placeholder="Filtrar por status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos os status</SelectItem>
                <SelectItem value="active">Ativo</SelectItem>
                <SelectItem value="inactive">Inativo</SelectItem>
                <SelectItem value="suspended">Suspenso</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Students Table */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Lista de Alunos ({filteredStudents.length})</CardTitle>
            <Button variant="outline" size="sm">
              <Filter className="mr-2 h-4 w-4" />
              Filtros Avançados
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nome</TableHead>
                  <TableHead>Turma</TableHead>
                  <TableHead>Curso</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Média</TableHead>
                  <TableHead>Frequência</TableHead>
                  <TableHead>Contato</TableHead>
                  <TableHead className="text-right">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredStudents.map((student) => (
                  <TableRow key={student.id} className="hover:bg-muted/50">
                    <TableCell>
                      <div className="space-y-1">
                        <div className="font-medium">{student.name}</div>
                        <div className="text-muted-foreground text-sm">
                          {student.email}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{student.class}</Badge>
                    </TableCell>
                    <TableCell>{student.course}</TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(student.status)}>
                        {getStatusText(student.status)}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <span
                        className={`font-medium ${
                          student.average >= 8
                            ? 'text-green-600'
                            : student.average >= 7
                              ? 'text-yellow-600'
                              : 'text-red-600'
                        }`}
                      >
                        {student.average}
                      </span>
                    </TableCell>
                    <TableCell>
                      <span
                        className={`font-medium ${
                          student.attendance >= 95
                            ? 'text-green-600'
                            : student.attendance >= 85
                              ? 'text-yellow-600'
                              : 'text-red-600'
                        }`}
                      >
                        {student.attendance}%
                      </span>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button size="sm" variant="ghost">
                          <Mail className="h-3 w-3" />
                        </Button>
                        <Button size="sm" variant="ghost">
                          <Phone className="h-3 w-3" />
                        </Button>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Eye className="mr-2 h-4 w-4" />
                            Ver Detalhes
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Edit className="mr-2 h-4 w-4" />
                            Editar
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-red-600">
                            <Trash2 className="mr-2 h-4 w-4" />
                            Remover
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
