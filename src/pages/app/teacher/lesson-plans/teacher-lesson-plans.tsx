import {
  BookOpen,
  Calendar,
  Clock,
  Copy,
  Download,
  Edit,
  Eye,
  MoreHorizontal,
  Plus,
  Search,
  Target,
  Trash2,
} from 'lucide-react'
import { useState } from 'react'

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

interface LessonPlan {
  id: string
  title: string
  subject: string
  class: string
  date: string
  duration: string
  objectives: string[]
  status: 'draft' | 'approved' | 'in-progress' | 'completed'
  resources: string[]
}

const mockLessonPlans: LessonPlan[] = [
  {
    id: '1',
    title: 'Introdução à Álgebra Linear',
    subject: 'Matemática',
    class: '9º A',
    date: '2024-01-15',
    duration: '50 min',
    objectives: [
      'Compreender conceitos básicos',
      'Resolver exercícios práticos',
    ],
    status: 'approved',
    resources: ['Quadro', 'Projetor', 'Exercícios'],
  },
  {
    id: '2',
    title: 'Revolução Industrial',
    subject: 'História',
    class: '8º B',
    date: '2024-01-16',
    duration: '45 min',
    objectives: [
      'Analisar causas e consequências',
      'Identificar mudanças sociais',
    ],
    status: 'in-progress',
    resources: ['Documentário', 'Textos', 'Imagens'],
  },
  {
    id: '3',
    title: 'Sistema Digestório',
    subject: 'Ciências',
    class: '7º C',
    date: '2024-01-17',
    duration: '50 min',
    objectives: ['Identificar órgãos', 'Compreender processo digestivo'],
    status: 'draft',
    resources: ['Modelo anatômico', 'Slides', 'Atividade prática'],
  },
]

const statusColors = {
  draft: 'bg-gray-100 text-gray-800',
  approved: 'bg-green-100 text-green-800',
  'in-progress': 'bg-blue-100 text-blue-800',
  completed: 'bg-purple-100 text-purple-800',
}

const statusLabels = {
  draft: 'Rascunho',
  approved: 'Aprovado',
  'in-progress': 'Em Andamento',
  completed: 'Concluído',
}

export function TeacherLessonPlans() {
  const [lessonPlans, setLessonPlans] = useState<LessonPlan[]>(mockLessonPlans)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedSubject, setSelectedSubject] = useState('all')
  const [selectedStatus, setSelectedStatus] = useState('all')
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)

  const filteredPlans = lessonPlans.filter((plan) => {
    const matchesSearch =
      plan.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      plan.subject.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesSubject =
      selectedSubject === 'all' || plan.subject === selectedSubject
    const matchesStatus =
      selectedStatus === 'all' || plan.status === selectedStatus

    return matchesSearch && matchesSubject && matchesStatus
  })

  const subjects = Array.from(new Set(lessonPlans.map((plan) => plan.subject)))

  const totalPlans = lessonPlans.length
  const approvedPlans = lessonPlans.filter(
    (plan) => plan.status === 'approved',
  ).length
  const inProgressPlans = lessonPlans.filter(
    (plan) => plan.status === 'in-progress',
  ).length
  const draftPlans = lessonPlans.filter(
    (plan) => plan.status === 'draft',
  ).length

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total de Planos
            </CardTitle>
            <BookOpen className="text-muted-foreground h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalPlans}</div>
            <p className="text-muted-foreground text-xs">Planos criados</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Aprovados</CardTitle>
            <Target className="text-muted-foreground h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{approvedPlans}</div>
            <p className="text-muted-foreground text-xs">Prontos para uso</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Em Andamento</CardTitle>
            <Clock className="text-muted-foreground h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{inProgressPlans}</div>
            <p className="text-muted-foreground text-xs">Sendo executados</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Rascunhos</CardTitle>
            <Edit className="text-muted-foreground h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{draftPlans}</div>
            <p className="text-muted-foreground text-xs">Em desenvolvimento</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="list" className="space-y-4">
        <div className="flex items-center justify-between">
          <TabsList>
            <TabsTrigger value="list">Lista de Planos</TabsTrigger>
            <TabsTrigger value="calendar">Calendário</TabsTrigger>
            <TabsTrigger value="templates">Templates</TabsTrigger>
          </TabsList>

          <Dialog
            open={isCreateDialogOpen}
            onOpenChange={setIsCreateDialogOpen}
          >
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Novo Plano
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Criar Novo Plano de Aula</DialogTitle>
                <DialogDescription>
                  Preencha as informações para criar um novo plano de aula
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Título da Aula</Label>
                    <Input id="title" placeholder="Ex: Introdução à Álgebra" />
                  </div>
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
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="class">Turma</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione a turma" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="9a">9º A</SelectItem>
                        <SelectItem value="9b">9º B</SelectItem>
                        <SelectItem value="8a">8º A</SelectItem>
                        <SelectItem value="8b">8º B</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="date">Data</Label>
                    <Input id="date" type="date" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="duration">Duração</Label>
                    <Input id="duration" placeholder="Ex: 50 min" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="objectives">Objetivos de Aprendizagem</Label>
                  <Textarea
                    id="objectives"
                    placeholder="Liste os objetivos que os alunos devem alcançar..."
                    rows={3}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="content">Conteúdo Programático</Label>
                  <Textarea
                    id="content"
                    placeholder="Descreva o conteúdo que será abordado..."
                    rows={4}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="methodology">Metodologia</Label>
                  <Textarea
                    id="methodology"
                    placeholder="Descreva como a aula será conduzida..."
                    rows={3}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="resources">Recursos Necessários</Label>
                  <Input
                    id="resources"
                    placeholder="Ex: Quadro, projetor, material impresso..."
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="evaluation">Avaliação</Label>
                  <Textarea
                    id="evaluation"
                    placeholder="Como será avaliado o aprendizado dos alunos..."
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
                  Criar Plano
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

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
                      placeholder="Buscar planos..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-8"
                    />
                  </div>
                </div>
                <Select
                  value={selectedSubject}
                  onValueChange={setSelectedSubject}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Disciplina" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todas as disciplinas</SelectItem>
                    {subjects.map((subject) => (
                      <SelectItem key={subject} value={subject}>
                        {subject}
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
                    <SelectItem value="draft">Rascunho</SelectItem>
                    <SelectItem value="approved">Aprovado</SelectItem>
                    <SelectItem value="in-progress">Em Andamento</SelectItem>
                    <SelectItem value="completed">Concluído</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Lesson Plans Table */}
          <Card>
            <CardHeader>
              <CardTitle>Planos de Aula</CardTitle>
              <CardDescription>
                Gerencie todos os seus planos de aula
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Título</TableHead>
                    <TableHead>Disciplina</TableHead>
                    <TableHead>Turma</TableHead>
                    <TableHead>Data</TableHead>
                    <TableHead>Duração</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredPlans.map((plan) => (
                    <TableRow key={plan.id}>
                      <TableCell className="font-medium">
                        {plan.title}
                      </TableCell>
                      <TableCell>{plan.subject}</TableCell>
                      <TableCell>{plan.class}</TableCell>
                      <TableCell>
                        {new Date(plan.date).toLocaleDateString('pt-BR')}
                      </TableCell>
                      <TableCell>{plan.duration}</TableCell>
                      <TableCell>
                        <Badge className={statusColors[plan.status]}>
                          {statusLabels[plan.status]}
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
                              <Eye className="mr-2 h-4 w-4" />
                              Visualizar
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Edit className="mr-2 h-4 w-4" />
                              Editar
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Copy className="mr-2 h-4 w-4" />
                              Duplicar
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Download className="mr-2 h-4 w-4" />
                              Exportar PDF
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-red-600">
                              <Trash2 className="mr-2 h-4 w-4" />
                              Excluir
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

        <TabsContent value="calendar" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Calendário de Planos</CardTitle>
              <CardDescription>
                Visualize seus planos de aula organizados por data
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-muted-foreground py-8 text-center">
                <Calendar className="mx-auto mb-4 h-12 w-12" />
                <p>Calendário de planos de aula em desenvolvimento</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="templates" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Templates de Planos</CardTitle>
              <CardDescription>
                Use templates prontos para agilizar a criação de planos
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                <Card className="cursor-pointer transition-shadow hover:shadow-md">
                  <CardHeader>
                    <CardTitle className="text-lg">Template Básico</CardTitle>
                    <CardDescription>
                      Estrutura simples para aulas expositivas
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button variant="outline" className="w-full">
                      Usar Template
                    </Button>
                  </CardContent>
                </Card>
                <Card className="cursor-pointer transition-shadow hover:shadow-md">
                  <CardHeader>
                    <CardTitle className="text-lg">Aula Prática</CardTitle>
                    <CardDescription>
                      Para aulas com atividades práticas e experimentos
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button variant="outline" className="w-full">
                      Usar Template
                    </Button>
                  </CardContent>
                </Card>
                <Card className="cursor-pointer transition-shadow hover:shadow-md">
                  <CardHeader>
                    <CardTitle className="text-lg">Revisão</CardTitle>
                    <CardDescription>
                      Template para aulas de revisão e exercícios
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button variant="outline" className="w-full">
                      Usar Template
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
