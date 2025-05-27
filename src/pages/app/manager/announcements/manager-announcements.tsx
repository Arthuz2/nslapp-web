import { Edit, Eye, Plus, Search, Send, Trash2 } from 'lucide-react'
import { useState } from 'react'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
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

const announcementStats = [
  {
    title: 'Total de Anúncios',
    value: '156',
    change: '+12 este mês',
    color: 'text-blue-600',
  },
  {
    title: 'Anúncios Ativos',
    value: '23',
    change: 'Publicados',
    color: 'text-green-600',
  },
  {
    title: 'Visualizações',
    value: '2.847',
    change: '+245 esta semana',
    color: 'text-purple-600',
  },
  {
    title: 'Taxa de Engajamento',
    value: '78%',
    change: '+5% este mês',
    color: 'text-yellow-600',
  },
]

const announcements = [
  {
    id: '1',
    title: 'Início do Período de Matrículas 2024',
    content:
      'Informamos que as matrículas para o ano letivo de 2024 estão abertas. Os alunos devem comparecer à secretaria com a documentação necessária.',
    author: 'Secretaria Acadêmica',
    date: '2024-01-15',
    time: '14:30',
    category: 'Acadêmico',
    priority: 'high',
    status: 'published',
    views: 1247,
    target: ['Todos os alunos', 'Responsáveis'],
    expiresAt: '2024-02-15',
  },
  {
    id: '2',
    title: 'Feira de Ciências 2024',
    content:
      'A tradicional Feira de Ciências acontecerá no dia 25 de janeiro. Todos os alunos são convidados a participar com seus projetos inovadores.',
    author: 'Coordenação Pedagógica',
    date: '2024-01-12',
    time: '09:15',
    category: 'Evento',
    priority: 'medium',
    status: 'published',
    views: 892,
    target: ['Alunos', 'Professores', 'Responsáveis'],
    expiresAt: '2024-01-25',
  },
  {
    id: '3',
    title: 'Manutenção do Sistema - Final de Semana',
    content:
      'O sistema acadêmico passará por manutenção no final de semana (20-21/01). Durante este período, o acesso pode ficar intermitente.',
    author: 'TI - Suporte',
    date: '2024-01-18',
    time: '16:45',
    category: 'Sistema',
    priority: 'medium',
    status: 'scheduled',
    views: 0,
    target: ['Todos'],
    expiresAt: '2024-01-22',
  },
  {
    id: '4',
    title: 'Reunião de Pais - 3º Bimestre',
    content:
      'Convocamos todos os responsáveis para a reunião de pais do 3º bimestre. Será apresentado o desempenho acadêmico dos alunos.',
    author: 'Direção',
    date: '2024-01-10',
    time: '11:20',
    category: 'Reunião',
    priority: 'high',
    status: 'published',
    views: 1456,
    target: ['Responsáveis'],
    expiresAt: '2024-01-30',
  },
  {
    id: '5',
    title: 'Novo Laboratório de Informática',
    content:
      'Temos o prazer de anunciar a inauguração do novo laboratório de informática com 30 computadores de última geração.',
    author: 'Direção',
    date: '2024-01-08',
    time: '08:00',
    category: 'Infraestrutura',
    priority: 'low',
    status: 'published',
    views: 634,
    target: ['Alunos', 'Professores'],
    expiresAt: '2024-02-08',
  },
]

const categories = [
  'Todas',
  'Acadêmico',
  'Evento',
  'Sistema',
  'Reunião',
  'Infraestrutura',
  'Emergência',
]
const priorities = ['Todas', 'Alta', 'Média', 'Baixa']
const statuses = ['Todos', 'Publicado', 'Rascunho', 'Agendado', 'Expirado']

export function ManagerAnnouncements() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('Todas')
  const [selectedPriority, setSelectedPriority] = useState('Todas')
  const [selectedStatus, setSelectedStatus] = useState('Todos')

  const filteredAnnouncements = announcements.filter((announcement) => {
    const matchesSearch =
      announcement.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      announcement.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
      announcement.author.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory =
      selectedCategory === 'Todas' || announcement.category === selectedCategory
    const matchesPriority =
      selectedPriority === 'Todas' ||
      (selectedPriority === 'Alta' && announcement.priority === 'high') ||
      (selectedPriority === 'Média' && announcement.priority === 'medium') ||
      (selectedPriority === 'Baixa' && announcement.priority === 'low')
    const matchesStatus =
      selectedStatus === 'Todos' ||
      (selectedStatus === 'Publicado' && announcement.status === 'published') ||
      (selectedStatus === 'Rascunho' && announcement.status === 'draft') ||
      (selectedStatus === 'Agendado' && announcement.status === 'scheduled') ||
      (selectedStatus === 'Expirado' && announcement.status === 'expired')

    return matchesSearch && matchesCategory && matchesPriority && matchesStatus
  })

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
      case 'low':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
      case 'draft':
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
      case 'scheduled':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
      case 'expired':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Gestão de Anúncios</h1>
          <p className="text-muted-foreground">
            Crie e gerencie anúncios para a comunidade escolar
          </p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Plus className="mr-2 h-4 w-4" />
              Novo Anúncio
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-3xl">
            <DialogHeader>
              <DialogTitle>Criar Novo Anúncio</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="title">Título do Anúncio</Label>
                <Input id="title" placeholder="Digite o título do anúncio..." />
              </div>
              <div className="space-y-2">
                <Label htmlFor="content">Conteúdo</Label>
                <Textarea
                  id="content"
                  placeholder="Digite o conteúdo do anúncio..."
                  className="min-h-[120px]"
                />
              </div>
              <div className="grid grid-cols-3 gap-3">
                <div className="space-y-2">
                  <Label htmlFor="category">Categoria</Label>
                  <Select>
                    <SelectTrigger className="w-[150px]">
                      <SelectValue placeholder="Selecione a categoria" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.slice(1).map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="priority">Prioridade</Label>
                  <Select>
                    <SelectTrigger className="w-[150px]">
                      <SelectValue placeholder="Selecione a prioridade" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="high">Alta</SelectItem>
                      <SelectItem value="medium">Média</SelectItem>
                      <SelectItem value="low">Baixa</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="expiresAt">Data de Expiração</Label>
                  <Input id="expiresAt" type="date" />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Público Alvo</Label>
                <div className="grid grid-cols-3 gap-4">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="students" />
                    <Label htmlFor="students">Alunos</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="teachers" />
                    <Label htmlFor="teachers">Professores</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="parents" />
                    <Label htmlFor="parents">Responsáveis</Label>
                  </div>
                </div>
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline">Salvar Rascunho</Button>
                <Button variant="outline">Agendar</Button>
                <Button>Publicar Agora</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {announcementStats.map((stat) => (
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
                  placeholder="Buscar por título, conteúdo ou autor..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select
              value={selectedCategory}
              onValueChange={setSelectedCategory}
            >
              <SelectTrigger className="w-[150px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select
              value={selectedPriority}
              onValueChange={setSelectedPriority}
            >
              <SelectTrigger className="w-[120px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {priorities.map((priority) => (
                  <SelectItem key={priority} value={priority}>
                    {priority}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
              <SelectTrigger className="w-[120px]">
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

      {/* Announcements List */}
      <div className="space-y-4">
        {filteredAnnouncements.map((announcement) => (
          <Card
            key={announcement.id}
            className="transition-shadow hover:shadow-lg"
          >
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg font-semibold">
                      {announcement.title}
                    </h3>
                    <Badge className={getPriorityColor(announcement.priority)}>
                      {announcement.priority === 'high'
                        ? 'Alta'
                        : announcement.priority === 'medium'
                          ? 'Média'
                          : 'Baixa'}
                    </Badge>
                    <Badge className={getStatusColor(announcement.status)}>
                      {announcement.status === 'published'
                        ? 'Publicado'
                        : announcement.status === 'draft'
                          ? 'Rascunho'
                          : announcement.status === 'scheduled'
                            ? 'Agendado'
                            : 'Expirado'}
                    </Badge>
                  </div>
                  <div className="text-muted-foreground flex items-center gap-4 text-sm">
                    <span>Por: {announcement.author}</span>
                    <span>•</span>
                    <span>
                      {announcement.date} às {announcement.time}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Eye className="h-3 w-3" />
                      {announcement.views} visualizações
                    </span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="ghost" size="sm">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Send className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">{announcement.content}</p>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Badge variant="outline">{announcement.category}</Badge>
                  <span className="text-muted-foreground text-sm">
                    Público: {announcement.target.join(', ')}
                  </span>
                </div>
                <div className="text-muted-foreground text-sm">
                  Expira em: {announcement.expiresAt}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
