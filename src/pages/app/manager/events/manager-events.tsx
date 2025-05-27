import {
  Calendar,
  Clock,
  Edit,
  MapPin,
  MoreHorizontal,
  Plus,
  Search,
  Trash2,
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Textarea } from '@/components/ui/textarea'

const eventStats = [
  {
    title: 'Eventos este Mês',
    value: '12',
    change: '+3 novos eventos',
    color: 'text-blue-600',
    bgColor: 'bg-blue-50 dark:bg-blue-950',
  },
  {
    title: 'Participantes Totais',
    value: '2.847',
    change: '+245 este mês',
    color: 'text-green-600',
    bgColor: 'bg-green-50 dark:bg-green-950',
  },
  {
    title: 'Eventos Agendados',
    value: '8',
    change: 'Próximos 30 dias',
    color: 'text-purple-600',
    bgColor: 'bg-purple-50 dark:bg-purple-950',
  },
  {
    title: 'Taxa de Participação',
    value: '87%',
    change: '+5% este mês',
    color: 'text-yellow-600',
    bgColor: 'bg-yellow-50 dark:bg-yellow-950',
  },
]

const upcomingEvents = [
  {
    id: '1',
    title: 'Feira de Ciências 2024',
    description: 'Apresentação dos projetos científicos dos alunos',
    date: '2024-01-25',
    time: '09:00',
    endTime: '17:00',
    location: 'Pátio Principal',
    category: 'Acadêmico',
    participants: 450,
    maxParticipants: 500,
    status: 'confirmed',
    organizer: 'Coordenação Pedagógica',
  },
  {
    id: '2',
    title: 'Reunião de Pais - 1º Bimestre',
    description: 'Apresentação dos resultados do primeiro bimestre',
    date: '2024-01-30',
    time: '19:00',
    endTime: '21:00',
    location: 'Auditório',
    category: 'Reunião',
    participants: 280,
    maxParticipants: 300,
    status: 'confirmed',
    organizer: 'Direção',
  },
  {
    id: '3',
    title: 'Workshop de Programação',
    description: 'Introdução às linguagens de programação modernas',
    date: '2024-02-05',
    time: '14:00',
    endTime: '18:00',
    location: 'Laboratório de Informática',
    category: 'Workshop',
    participants: 25,
    maxParticipants: 30,
    status: 'confirmed',
    organizer: 'Prof. Carlos Lima',
  },
]

const pastEvents = [
  {
    id: '4',
    title: 'Formatura Turma 2023',
    description: 'Cerimônia de formatura dos concluintes',
    date: '2023-12-15',
    time: '19:00',
    endTime: '22:00',
    location: 'Teatro Municipal',
    category: 'Cerimônia',
    participants: 850,
    maxParticipants: 850,
    status: 'completed',
    organizer: 'Direção',
  },
  {
    id: '5',
    title: 'Olimpíada de Matemática',
    description: 'Competição de matemática entre as turmas',
    date: '2023-11-20',
    time: '08:00',
    endTime: '12:00',
    location: 'Salas 201-205',
    category: 'Competição',
    participants: 180,
    maxParticipants: 200,
    status: 'completed',
    organizer: 'Prof. Alex Menezes',
  },
]

const categories = [
  'Todos',
  'Acadêmico',
  'Reunião',
  'Workshop',
  'Cerimônia',
  'Competição',
  'Social',
]

export function ManagerEvents() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('Todos')

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
      case 'cancelled':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
      case 'completed':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'Confirmado'
      case 'pending':
        return 'Pendente'
      case 'cancelled':
        return 'Cancelado'
      case 'completed':
        return 'Concluído'
      default:
        return 'Desconhecido'
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-r from-purple-600 to-blue-600">
            <Calendar className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold">Gestão de Eventos</h1>
            <p className="text-muted-foreground">
              Organize e gerencie todos os eventos da instituição
            </p>
          </div>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-purple-600 hover:bg-purple-700">
              <Plus className="mr-2 h-4 w-4" />
              Novo Evento
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Criar Novo Evento</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="eventTitle">Título do Evento</Label>
                <Input id="eventTitle" placeholder="Nome do evento" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Descrição</Label>
                <Textarea
                  id="description"
                  placeholder="Descreva o evento..."
                  className="min-h-[100px]"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="eventDate">Data</Label>
                  <Input id="eventDate" type="date" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="category">Categoria</Label>
                  <Select>
                    <SelectTrigger>
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
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="startTime">Horário de Início</Label>
                  <Input id="startTime" type="time" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="endTime">Horário de Término</Label>
                  <Input id="endTime" type="time" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="location">Local</Label>
                  <Input id="location" placeholder="Local do evento" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="maxParticipants">
                    Máximo de Participantes
                  </Label>
                  <Input id="maxParticipants" type="number" placeholder="100" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="organizer">Organizador</Label>
                <Input id="organizer" placeholder="Nome do organizador" />
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline">Cancelar</Button>
                <Button>Criar Evento</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {eventStats.map((stat) => (
          <Card key={stat.title} className="transition-shadow hover:shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-muted-foreground text-sm font-medium">
                {stat.title}
              </CardTitle>
              <div className={`rounded-lg p-2 ${stat.bgColor}`}>
                <Calendar className={`h-5 w-5 ${stat.color}`} />
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

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Filtros</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform" />
                <Input
                  placeholder="Buscar eventos..."
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
              <SelectTrigger className="w-[200px]">
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
          </div>
        </CardContent>
      </Card>

      {/* Events Tabs */}
      <Tabs defaultValue="upcoming" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="upcoming" className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            Próximos Eventos
          </TabsTrigger>
          <TabsTrigger value="past" className="flex items-center gap-2">
            <Clock className="h-4 w-4" />
            Eventos Passados
          </TabsTrigger>
        </TabsList>

        <TabsContent value="upcoming" className="space-y-4">
          {upcomingEvents.map((event) => (
            <Card key={event.id} className="transition-shadow hover:shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1 space-y-3">
                    <div className="flex items-center gap-2">
                      <h3 className="text-lg font-semibold">{event.title}</h3>
                      <Badge variant="outline">{event.category}</Badge>
                      <Badge className={getStatusColor(event.status)}>
                        {getStatusText(event.status)}
                      </Badge>
                    </div>
                    <p className="text-muted-foreground text-sm">
                      {event.description}
                    </p>
                    <div className="flex items-center gap-6 text-sm">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4 text-blue-600" />
                        <span>{event.date}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4 text-green-600" />
                        <span>
                          {event.time} - {event.endTime}
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="h-4 w-4 text-purple-600" />
                        <span>{event.location}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="h-4 w-4 text-yellow-600" />
                        <span>
                          {event.participants}/{event.maxParticipants}
                        </span>
                      </div>
                    </div>
                    <div className="text-muted-foreground text-sm">
                      Organizador: {event.organizer}
                    </div>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>
                        <Edit className="mr-2 h-4 w-4" />
                        Editar Evento
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Users className="mr-2 h-4 w-4" />
                        Ver Participantes
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-red-600">
                        <Trash2 className="mr-2 h-4 w-4" />
                        Cancelar Evento
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="past" className="space-y-4">
          {pastEvents.map((event) => (
            <Card key={event.id} className="transition-shadow hover:shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1 space-y-3">
                    <div className="flex items-center gap-2">
                      <h3 className="text-lg font-semibold">{event.title}</h3>
                      <Badge variant="outline">{event.category}</Badge>
                      <Badge className={getStatusColor(event.status)}>
                        {getStatusText(event.status)}
                      </Badge>
                    </div>
                    <p className="text-muted-foreground text-sm">
                      {event.description}
                    </p>
                    <div className="flex items-center gap-6 text-sm">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4 text-blue-600" />
                        <span>{event.date}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4 text-green-600" />
                        <span>
                          {event.time} - {event.endTime}
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="h-4 w-4 text-purple-600" />
                        <span>{event.location}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="h-4 w-4 text-yellow-600" />
                        <span>
                          {event.participants}/{event.maxParticipants}
                        </span>
                      </div>
                    </div>
                    <div className="text-muted-foreground text-sm">
                      Organizador: {event.organizer}
                    </div>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>Ver Relatório</DropdownMenuItem>
                      <DropdownMenuItem>Ver Participantes</DropdownMenuItem>
                      <DropdownMenuItem>Duplicar Evento</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  )
}
