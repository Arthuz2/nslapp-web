import {
  BookOpen,
  Calendar,
  Clock,
  Filter,
  MoreHorizontal,
  Plus,
  Search,
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
    title: 'Total de Eletivas',
    value: '24',
    change: '+3 este semestre',
    icon: BookOpen,
  },
  {
    title: 'Alunos Inscritos',
    value: '486',
    change: '+12% vs semestre anterior',
    icon: Users,
  },
  {
    title: 'Taxa de Ocupação',
    value: '87%',
    change: 'Acima da meta (80%)',
    icon: Calendar,
  },
  {
    title: 'Professores Envolvidos',
    value: '18',
    change: '+2 novos professores',
    icon: Users,
  },
]

const electives = [
  {
    id: 1,
    name: 'Robótica e Programação',
    teacher: 'Prof. Carlos Silva',
    category: 'Tecnologia',
    schedule: 'Terça 14:00-15:30',
    enrolled: 25,
    capacity: 30,
    status: 'active',
    semester: '2024.2',
  },
  {
    id: 2,
    name: 'Teatro e Expressão',
    teacher: 'Profa. Ana Costa',
    category: 'Artes',
    schedule: 'Quinta 15:00-16:30',
    enrolled: 20,
    capacity: 25,
    status: 'active',
    semester: '2024.2',
  },
  {
    id: 3,
    name: 'Xadrez Estratégico',
    teacher: 'Prof. Roberto Lima',
    category: 'Esportes',
    schedule: 'Sexta 14:00-15:30',
    enrolled: 15,
    capacity: 20,
    status: 'active',
    semester: '2024.2',
  },
  {
    id: 4,
    name: 'Culinária Saudável',
    teacher: 'Profa. Maria Santos',
    category: 'Vida Prática',
    schedule: 'Quarta 15:00-16:30',
    enrolled: 18,
    capacity: 20,
    status: 'active',
    semester: '2024.2',
  },
  {
    id: 5,
    name: 'Fotografia Digital',
    teacher: 'Prof. João Oliveira',
    category: 'Artes',
    schedule: 'Segunda 14:00-15:30',
    enrolled: 22,
    capacity: 25,
    status: 'waiting',
    semester: '2024.2',
  },
]

const categories = [
  'Todas',
  'Tecnologia',
  'Artes',
  'Esportes',
  'Vida Prática',
  'Ciências',
]

export function ManagerElectives(): React.ReactElement {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('Todas')
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)

  const filteredElectives = electives.filter((elective) => {
    const matchesSearch =
      elective.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      elective.teacher.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory =
      selectedCategory === 'Todas' || elective.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge variant="default">Ativa</Badge>
      case 'waiting':
        return <Badge variant="secondary">Lista de Espera</Badge>
      case 'full':
        return <Badge variant="destructive">Lotada</Badge>
      default:
        return <Badge variant="outline">Inativa</Badge>
    }
  }

  const getOccupancyColor = (enrolled: number, capacity: number) => {
    const percentage = (enrolled / capacity) * 100
    if (percentage >= 90) return 'text-red-600'
    if (percentage >= 70) return 'text-yellow-600'
    return 'text-green-600'
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

      <Tabs defaultValue="electives" className="space-y-4">
        <TabsList>
          <TabsTrigger value="electives">Eletivas</TabsTrigger>
          <TabsTrigger value="enrollments">Inscrições</TabsTrigger>
          <TabsTrigger value="reports">Relatórios</TabsTrigger>
        </TabsList>

        <TabsContent value="electives" className="space-y-4">
          {/* Filters and Actions */}
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="flex flex-1 gap-4">
              <div className="relative max-w-sm flex-1">
                <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
                <Input
                  placeholder="Buscar eletivas..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9"
                />
              </div>
              <Select
                value={selectedCategory}
                onValueChange={setSelectedCategory}
              >
                <SelectTrigger className="w-[180px]">
                  <Filter className="mr-2 h-4 w-4" />
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
            <Dialog
              open={isCreateDialogOpen}
              onOpenChange={setIsCreateDialogOpen}
            >
              <DialogTrigger asChild>
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Nova Eletiva
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Criar Nova Eletiva</DialogTitle>
                  <DialogDescription>
                    Preencha as informações da nova disciplina eletiva.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="name">Nome da Eletiva</Label>
                    <Input id="name" placeholder="Ex: Robótica e Programação" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="teacher">Professor</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione um professor" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="carlos">
                          Prof. Carlos Silva
                        </SelectItem>
                        <SelectItem value="ana">Profa. Ana Costa</SelectItem>
                        <SelectItem value="roberto">
                          Prof. Roberto Lima
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="category">Categoria</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione uma categoria" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="tecnologia">Tecnologia</SelectItem>
                        <SelectItem value="artes">Artes</SelectItem>
                        <SelectItem value="esportes">Esportes</SelectItem>
                        <SelectItem value="vida-pratica">
                          Vida Prática
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="schedule">Horário</Label>
                    <Input id="schedule" placeholder="Ex: Terça 14:00-15:30" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="capacity">Capacidade</Label>
                    <Input id="capacity" type="number" placeholder="30" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="description">Descrição</Label>
                    <Textarea
                      id="description"
                      placeholder="Descrição da eletiva..."
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit">Criar Eletiva</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>

          {/* Electives Table */}
          <Card>
            <CardHeader>
              <CardTitle>Lista de Eletivas</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nome</TableHead>
                    <TableHead>Professor</TableHead>
                    <TableHead>Categoria</TableHead>
                    <TableHead>Horário</TableHead>
                    <TableHead>Ocupação</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="w-[50px]"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredElectives.map((elective) => (
                    <TableRow key={elective.id}>
                      <TableCell className="font-medium">
                        {elective.name}
                      </TableCell>
                      <TableCell>{elective.teacher}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{elective.category}</Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {elective.schedule}
                        </div>
                      </TableCell>
                      <TableCell>
                        <span
                          className={getOccupancyColor(
                            elective.enrolled,
                            elective.capacity,
                          )}
                        >
                          {elective.enrolled}/{elective.capacity}
                        </span>
                      </TableCell>
                      <TableCell>{getStatusBadge(elective.status)}</TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>Ver detalhes</DropdownMenuItem>
                            <DropdownMenuItem>Editar</DropdownMenuItem>
                            <DropdownMenuItem>
                              Gerenciar inscrições
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-red-600">
                              Desativar
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

        <TabsContent value="enrollments" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Gestão de Inscrições</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Funcionalidade de gestão de inscrições em desenvolvimento...
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reports" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Relatórios de Eletivas</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Relatórios e estatísticas das eletivas em desenvolvimento...
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
