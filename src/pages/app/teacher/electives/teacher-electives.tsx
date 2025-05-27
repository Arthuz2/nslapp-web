import { BookOpen, Calendar, Clock, MoreHorizontal, Users } from 'lucide-react'
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

const electivesData = [
  {
    id: 1,
    name: 'Robótica Educacional',
    category: 'Tecnologia',
    enrolled: 15,
    capacity: 20,
    schedule: 'Quinta - 15:00',
    status: 'active',
  },
  {
    id: 2,
    name: 'Programação Básica',
    category: 'Tecnologia',
    enrolled: 18,
    capacity: 20,
    schedule: 'Sexta - 14:00',
    status: 'active',
  },
  {
    id: 3,
    name: 'Matemática Aplicada',
    category: 'Exatas',
    enrolled: 12,
    capacity: 15,
    schedule: 'Terça - 16:00',
    status: 'active',
  },
]

export function TeacherElectives() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-green-100 text-green-800">Ativa</Badge>
      case 'inactive':
        return <Badge className="bg-gray-100 text-gray-800">Inativa</Badge>
      case 'full':
        return <Badge className="bg-red-100 text-red-800">Lotada</Badge>
      default:
        return <Badge variant="secondary">-</Badge>
    }
  }

  const getCategoryBadge = (category: string) => {
    switch (category) {
      case 'Tecnologia':
        return <Badge className="bg-blue-100 text-blue-800">Tecnologia</Badge>
      case 'Exatas':
        return <Badge className="bg-purple-100 text-purple-800">Exatas</Badge>
      case 'Humanas':
        return <Badge className="bg-orange-100 text-orange-800">Humanas</Badge>
      case 'Artes':
        return <Badge className="bg-pink-100 text-pink-800">Artes</Badge>
      default:
        return <Badge variant="secondary">{category}</Badge>
    }
  }

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Eletivas Ativas
            </CardTitle>
            <BookOpen className="text-muted-foreground h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-muted-foreground text-xs">Todas em andamento</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Inscritos
            </CardTitle>
            <Users className="text-muted-foreground h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">45</div>
            <p className="text-muted-foreground text-xs">82% da capacidade</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Vagas Disponíveis
            </CardTitle>
            <Calendar className="text-muted-foreground h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">10</div>
            <p className="text-muted-foreground text-xs">18% restante</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Horas/Semana</CardTitle>
            <Clock className="text-muted-foreground h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">6</div>
            <p className="text-muted-foreground text-xs">2h por eletiva</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Visão Geral</TabsTrigger>
          <TabsTrigger value="content">Conteúdo</TabsTrigger>
          <TabsTrigger value="evaluations">Avaliações</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Minhas Eletivas</CardTitle>
              <div className="flex flex-col gap-4 sm:flex-row">
                <div className="flex-1">
                  <Input
                    placeholder="Buscar eletiva..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="max-w-sm"
                  />
                </div>
                <Select
                  value={selectedCategory}
                  onValueChange={setSelectedCategory}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Categoria" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="tecnologia">Tecnologia</SelectItem>
                    <SelectItem value="exatas">Exatas</SelectItem>
                    <SelectItem value="humanas">Humanas</SelectItem>
                    <SelectItem value="artes">Artes</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nome</TableHead>
                    <TableHead>Categoria</TableHead>
                    <TableHead>Inscritos</TableHead>
                    <TableHead>Capacidade</TableHead>
                    <TableHead>Horário</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {electivesData.map((elective) => (
                    <TableRow key={elective.id}>
                      <TableCell className="font-medium">
                        {elective.name}
                      </TableCell>
                      <TableCell>
                        {getCategoryBadge(elective.category)}
                      </TableCell>
                      <TableCell>{elective.enrolled}</TableCell>
                      <TableCell>{elective.capacity}</TableCell>
                      <TableCell>{elective.schedule}</TableCell>
                      <TableCell>{getStatusBadge(elective.status)}</TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>Ver alunos</DropdownMenuItem>
                            <DropdownMenuItem>Editar</DropdownMenuItem>
                            <DropdownMenuItem>Conteúdo</DropdownMenuItem>
                            <DropdownMenuItem>Avaliações</DropdownMenuItem>
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

        <TabsContent value="content" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Conteúdo Programático</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Gestão de conteúdo programático em desenvolvimento...
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="evaluations" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Avaliações das Eletivas</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Sistema de avaliações em desenvolvimento...
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
