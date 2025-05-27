import { MoreHorizontal, Plus, Search, Users } from 'lucide-react'
import { useState } from 'react'

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

const classStats = [
  {
    title: 'Total de Turmas',
    value: '42',
    change: '+2 este semestre',
    color: 'text-blue-600',
  },
  {
    title: 'Alunos Matriculados',
    value: '1.247',
    change: '+45 novos alunos',
    color: 'text-green-600',
  },
  {
    title: 'Média Geral',
    value: '7.9',
    change: '+0.1 este mês',
    color: 'text-yellow-600',
  },
  {
    title: 'Taxa de Frequência',
    value: '94.5%',
    change: '+1.2% este mês',
    color: 'text-purple-600',
  },
]

const classes = [
  {
    id: '1',
    name: '3ªIM01-EMI-IPI',
    course: 'Ensino Médio Integrado',
    year: '3º Ano',
    shift: 'Manhã',
    students: 32,
    maxStudents: 35,
    coordinator: 'Prof. Ana Santos',
    classroom: 'Sala 201',
    subjects: ['Matemática', 'Português', 'Física', 'Química', 'Biologia'],
    average: 8.2,
    attendance: 96.5,
    status: 'active',
  },
  {
    id: '2',
    name: '3ªIM02-EMI-IPI',
    course: 'Ensino Médio Integrado',
    year: '3º Ano',
    shift: 'Tarde',
    students: 28,
    maxStudents: 35,
    coordinator: 'Prof. Carlos Lima',
    classroom: 'Sala 202',
    subjects: ['Matemática', 'Português', 'História', 'Geografia', 'Inglês'],
    average: 7.9,
    attendance: 94.2,
    status: 'active',
  },
  {
    id: '3',
    name: '2ªIM01-EMI-IPI',
    course: 'Ensino Médio Integrado',
    year: '2º Ano',
    shift: 'Manhã',
    students: 30,
    maxStudents: 35,
    coordinator: 'Prof. Maria Clara',
    classroom: 'Sala 203',
    subjects: ['Matemática', 'Português', 'Física', 'Química', 'História'],
    average: 7.5,
    attendance: 93.8,
    status: 'active',
  },
  {
    id: '4',
    name: '1ªTI01-TEC-INFO',
    course: 'Técnico em Informática',
    year: '1º Ano',
    shift: 'Noite',
    students: 25,
    maxStudents: 30,
    coordinator: 'Prof. Roberto Silva',
    classroom: 'Lab 101',
    subjects: ['Programação', 'Banco de Dados', 'Redes', 'Hardware'],
    average: 8.3,
    attendance: 92.1,
    status: 'active',
  },
  {
    id: '5',
    name: '2ªADM01-TEC-ADM',
    course: 'Técnico em Administração',
    year: '2º Ano',
    shift: 'Manhã',
    students: 22,
    maxStudents: 30,
    coordinator: 'Prof. Juliana Costa',
    classroom: 'Sala 105',
    subjects: ['Contabilidade', 'Marketing', 'RH', 'Economia'],
    average: 7.8,
    attendance: 95.3,
    status: 'active',
  },
]

const courses = [
  'Todos',
  'Ensino Médio Integrado',
  'Técnico em Informática',
  'Técnico em Administração',
]
const years = ['Todos', '1º Ano', '2º Ano', '3º Ano']
const shifts = ['Todos', 'Manhã', 'Tarde', 'Noite']

export function ManagerClasses() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCourse, setSelectedCourse] = useState('Todos')
  const [selectedYear, setSelectedYear] = useState('Todos')
  const [selectedShift, setSelectedShift] = useState('Todos')

  const filteredClasses = classes.filter((classItem) => {
    const matchesSearch =
      classItem.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      classItem.course.toLowerCase().includes(searchTerm.toLowerCase()) ||
      classItem.coordinator.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCourse =
      selectedCourse === 'Todos' || classItem.course === selectedCourse
    const matchesYear =
      selectedYear === 'Todos' || classItem.year === selectedYear
    const matchesShift =
      selectedShift === 'Todos' || classItem.shift === selectedShift

    return matchesSearch && matchesCourse && matchesYear && matchesShift
  })

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Gestão de Turmas</h1>
          <p className="text-muted-foreground">
            Gerencie todas as turmas da instituição
          </p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Plus className="mr-2 h-4 w-4" />
              Nova Turma
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Criar Nova Turma</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="className">Nome da Turma</Label>
                  <Input id="className" placeholder="Ex: 3ªIM01-EMI-IPI" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="course">Curso</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o curso" />
                    </SelectTrigger>
                    <SelectContent>
                      {courses.slice(1).map((course) => (
                        <SelectItem key={course} value={course}>
                          {course}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="year">Ano</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Ano" />
                    </SelectTrigger>
                    <SelectContent>
                      {years.slice(1).map((year) => (
                        <SelectItem key={year} value={year}>
                          {year}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="shift">Turno</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Turno" />
                    </SelectTrigger>
                    <SelectContent>
                      {shifts.slice(1).map((shift) => (
                        <SelectItem key={shift} value={shift}>
                          {shift}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="maxStudents">Vagas</Label>
                  <Input id="maxStudents" type="number" placeholder="35" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="coordinator">Coordenador</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o coordenador" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ana">Prof. Ana Santos</SelectItem>
                      <SelectItem value="carlos">Prof. Carlos Lima</SelectItem>
                      <SelectItem value="maria">Prof. Maria Clara</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="classroom">Sala</Label>
                  <Input id="classroom" placeholder="Ex: Sala 201" />
                </div>
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline">Cancelar</Button>
                <Button>Criar Turma</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {classStats.map((stat) => (
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
                  placeholder="Buscar por nome, curso ou coordenador..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={selectedCourse} onValueChange={setSelectedCourse}>
              <SelectTrigger className="w-[200px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {courses.map((course) => (
                  <SelectItem key={course} value={course}>
                    {course}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={selectedYear} onValueChange={setSelectedYear}>
              <SelectTrigger className="w-[120px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {years.map((year) => (
                  <SelectItem key={year} value={year}>
                    {year}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={selectedShift} onValueChange={setSelectedShift}>
              <SelectTrigger className="w-[120px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {shifts.map((shift) => (
                  <SelectItem key={shift} value={shift}>
                    {shift}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Classes Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredClasses.map((classItem) => (
          <Card
            key={classItem.id}
            className="transition-shadow hover:shadow-lg"
          >
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">{classItem.name}</CardTitle>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>Ver Detalhes</DropdownMenuItem>
                    <DropdownMenuItem>Editar Turma</DropdownMenuItem>
                    <DropdownMenuItem>Ver Alunos</DropdownMenuItem>
                    <DropdownMenuItem>Horários</DropdownMenuItem>
                    <DropdownMenuItem>Relatórios</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <div className="space-y-1">
                <p className="text-muted-foreground text-sm">
                  {classItem.course}
                </p>
                <div className="flex gap-2">
                  <Badge variant="outline">{classItem.year}</Badge>
                  <Badge variant="outline">{classItem.shift}</Badge>
                  <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                    Ativa
                  </Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Alunos:</span>
                  <span className="font-medium">
                    {classItem.students}/{classItem.maxStudents}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Coordenador:</span>
                  <span className="font-medium">{classItem.coordinator}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Sala:</span>
                  <span className="font-medium">{classItem.classroom}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Média:</span>
                  <span
                    className={`font-medium ${classItem.average >= 8 ? 'text-green-600' : classItem.average >= 7 ? 'text-yellow-600' : 'text-red-600'}`}
                  >
                    {classItem.average}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Frequência:</span>
                  <span className="font-medium text-blue-600">
                    {classItem.attendance}%
                  </span>
                </div>
              </div>

              <div className="space-y-2">
                <div className="text-sm font-medium">Disciplinas:</div>
                <div className="flex flex-wrap gap-1">
                  {classItem.subjects.slice(0, 3).map((subject) => (
                    <Badge
                      key={subject}
                      variant="secondary"
                      className="text-xs"
                    >
                      {subject}
                    </Badge>
                  ))}
                  {classItem.subjects.length > 3 && (
                    <Badge variant="secondary" className="text-xs">
                      +{classItem.subjects.length - 3}
                    </Badge>
                  )}
                </div>
              </div>

              <div className="flex gap-2">
                <Button size="sm" className="flex-1">
                  <Users className="mr-1 h-4 w-4" />
                  Alunos
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
