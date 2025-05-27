import {
  BookOpen,
  Clock,
  MoreHorizontal,
  Plus,
  Search,
  Users,
} from 'lucide-react'
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
import { Textarea } from '@/components/ui/textarea'

const subjectStats = [
  {
    title: 'Total de Disciplinas',
    value: '24',
    change: '+2 este semestre',
    color: 'text-blue-600',
  },
  {
    title: 'Disciplinas Ativas',
    value: '22',
    change: '91.7% ativas',
    color: 'text-green-600',
  },
  {
    title: 'Carga Horária Total',
    value: '1.680h',
    change: 'Por semestre',
    color: 'text-purple-600',
  },
  {
    title: 'Professores Envolvidos',
    value: '68',
    change: 'Todos os professores',
    color: 'text-yellow-600',
  },
]

const subjects = [
  {
    id: '1',
    name: 'Matemática',
    code: 'MAT001',
    area: 'Exatas',
    workload: 120,
    classes: 12,
    teachers: ['Prof. Alex Menezes', 'Prof. Roberto Silva'],
    students: 360,
    description:
      'Disciplina fundamental que aborda álgebra, geometria, trigonometria e cálculo básico.',
    status: 'active',
    year: 'Todos os anos',
  },
  {
    id: '2',
    name: 'Português',
    code: 'POR001',
    area: 'Humanas',
    workload: 100,
    classes: 10,
    teachers: ['Prof. Ana Santos', 'Prof. Maria Clara'],
    students: 300,
    description:
      'Estudo da língua portuguesa, literatura, gramática e produção textual.',
    status: 'active',
    year: 'Todos os anos',
  },
  {
    id: '3',
    name: 'Programação I',
    code: 'PRG001',
    area: 'Técnica',
    workload: 80,
    classes: 4,
    teachers: ['Prof. Carlos Lima'],
    students: 120,
    description: 'Introdução à programação com foco em lógica e algoritmos.',
    status: 'active',
    year: '1º Ano Técnico',
  },
  {
    id: '4',
    name: 'Banco de Dados',
    code: 'BDD001',
    area: 'Técnica',
    workload: 60,
    classes: 3,
    teachers: ['Prof. Juliana Costa'],
    students: 90,
    description:
      'Modelagem, criação e manipulação de bancos de dados relacionais.',
    status: 'active',
    year: '2º Ano Técnico',
  },
  {
    id: '5',
    name: 'Física',
    code: 'FIS001',
    area: 'Exatas',
    workload: 80,
    classes: 8,
    teachers: ['Prof. Roberto Silva'],
    students: 240,
    description:
      'Estudo dos fenômenos físicos, mecânica, termodinâmica e eletromagnetismo.',
    status: 'active',
    year: '2º e 3º Ano',
  },
  {
    id: '6',
    name: 'Química',
    code: 'QUI001',
    area: 'Exatas',
    workload: 80,
    classes: 6,
    teachers: ['Prof. Juliana Costa'],
    students: 180,
    description: 'Química geral, orgânica e inorgânica aplicada.',
    status: 'active',
    year: '2º e 3º Ano',
  },
]

const areas = ['Todas', 'Exatas', 'Humanas', 'Técnica', 'Biológicas']
const statuses = ['Todas', 'Ativa', 'Inativa', 'Em Revisão']

export function ManagerSubjects() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedArea, setSelectedArea] = useState('Todas')
  const [selectedStatus, setSelectedStatus] = useState('Todas')

  const filteredSubjects = subjects.filter((subject) => {
    const matchesSearch =
      subject.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      subject.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      subject.teachers.some((teacher) =>
        teacher.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    const matchesArea =
      selectedArea === 'Todas' || subject.area === selectedArea
    const matchesStatus =
      selectedStatus === 'Todas' ||
      (selectedStatus === 'Ativa' && subject.status === 'active') ||
      (selectedStatus === 'Inativa' && subject.status === 'inactive') ||
      (selectedStatus === 'Em Revisão' && subject.status === 'review')

    return matchesSearch && matchesArea && matchesStatus
  })

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Gestão de Disciplinas</h1>
          <p className="text-muted-foreground">
            Gerencie todas as disciplinas da instituição
          </p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Plus className="mr-2 h-4 w-4" />
              Nova Disciplina
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Criar Nova Disciplina</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="subjectName">Nome da Disciplina</Label>
                  <Input
                    id="subjectName"
                    placeholder="Ex: Matemática Aplicada"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="code">Código</Label>
                  <Input id="code" placeholder="Ex: MAT001" />
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="area">Área</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione a área" />
                    </SelectTrigger>
                    <SelectContent>
                      {areas.slice(1).map((area) => (
                        <SelectItem key={area} value={area}>
                          {area}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="workload">Carga Horária</Label>
                  <Input id="workload" type="number" placeholder="80" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="year">Ano/Série</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todos os anos</SelectItem>
                      <SelectItem value="1">1º Ano</SelectItem>
                      <SelectItem value="2">2º Ano</SelectItem>
                      <SelectItem value="3">3º Ano</SelectItem>
                      <SelectItem value="tech1">1º Ano Técnico</SelectItem>
                      <SelectItem value="tech2">2º Ano Técnico</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Descrição</Label>
                <Textarea
                  id="description"
                  placeholder="Descreva o conteúdo e objetivos da disciplina..."
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="teachers">Professores</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione os professores" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="alex">Prof. Alex Menezes</SelectItem>
                    <SelectItem value="ana">Prof. Ana Santos</SelectItem>
                    <SelectItem value="carlos">Prof. Carlos Lima</SelectItem>
                    <SelectItem value="maria">Prof. Maria Clara</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline">Cancelar</Button>
                <Button>Criar Disciplina</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {subjectStats.map((stat) => (
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
                  placeholder="Buscar por nome, código ou professor..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={selectedArea} onValueChange={setSelectedArea}>
              <SelectTrigger className="w-[150px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {areas.map((area) => (
                  <SelectItem key={area} value={area}>
                    {area}
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

      {/* Subjects Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredSubjects.map((subject) => (
          <Card key={subject.id} className="transition-shadow hover:shadow-lg">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <CardTitle className="text-lg">{subject.name}</CardTitle>
                  <p className="text-muted-foreground text-sm">
                    {subject.code}
                  </p>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>Ver Detalhes</DropdownMenuItem>
                    <DropdownMenuItem>Editar Disciplina</DropdownMenuItem>
                    <DropdownMenuItem>Ver Turmas</DropdownMenuItem>
                    <DropdownMenuItem>Plano de Ensino</DropdownMenuItem>
                    <DropdownMenuItem>Relatórios</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <div className="flex gap-2">
                <Badge variant="outline">{subject.area}</Badge>
                <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                  Ativa
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground text-sm">
                {subject.description}
              </p>

              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    Carga Horária:
                  </span>
                  <span className="font-medium">{subject.workload}h</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground flex items-center gap-1">
                    <BookOpen className="h-3 w-3" />
                    Turmas:
                  </span>
                  <span className="font-medium">{subject.classes}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground flex items-center gap-1">
                    <Users className="h-3 w-3" />
                    Alunos:
                  </span>
                  <span className="font-medium">{subject.students}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Ano/Série:</span>
                  <span className="font-medium">{subject.year}</span>
                </div>
              </div>

              <div className="space-y-2">
                <div className="text-sm font-medium">Professores:</div>
                <div className="space-y-1">
                  {subject.teachers.map((teacher) => (
                    <Badge
                      key={teacher}
                      variant="secondary"
                      className="mr-1 text-xs"
                    >
                      {teacher}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="flex gap-2">
                <Button size="sm" className="flex-1">
                  Ver Detalhes
                </Button>
                <Button size="sm" variant="outline" className="flex-1">
                  Editar
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
