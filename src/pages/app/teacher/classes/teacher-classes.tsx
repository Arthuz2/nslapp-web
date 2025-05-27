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

const classesData = [
  {
    id: 1,
    name: '9º A',
    subject: 'Matemática',
    students: 28,
    schedule: 'Seg, Qua, Sex - 14:00',
    room: 'Sala 201',
    status: 'active',
  },
  {
    id: 2,
    name: '9º B',
    subject: 'Matemática',
    students: 26,
    schedule: 'Ter, Qui - 15:00',
    room: 'Sala 203',
    status: 'active',
  },
  {
    id: 3,
    name: '8º A',
    subject: 'Matemática',
    students: 30,
    schedule: 'Seg, Qua - 16:00',
    room: 'Sala 205',
    status: 'active',
  },
  {
    id: 4,
    name: '8º B',
    subject: 'Matemática',
    students: 25,
    schedule: 'Ter, Qui, Sex - 13:00',
    room: 'Sala 207',
    status: 'active',
  },
]

export function TeacherClasses() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedSubject, setSelectedSubject] = useState('')

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-green-100 text-green-800">Ativa</Badge>
      case 'inactive':
        return <Badge className="bg-gray-100 text-gray-800">Inativa</Badge>
      default:
        return <Badge variant="secondary">-</Badge>
    }
  }

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Turmas</CardTitle>
            <Users className="text-muted-foreground h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-muted-foreground text-xs">
              +2 desde o semestre passado
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Alunos</CardTitle>
            <Users className="text-muted-foreground h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">247</div>
            <p className="text-muted-foreground text-xs">
              Média de 31 por turma
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Aulas/Semana</CardTitle>
            <Clock className="text-muted-foreground h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
            <p className="text-muted-foreground text-xs">
              Distribuídas em 5 dias
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Disciplinas</CardTitle>
            <BookOpen className="text-muted-foreground h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1</div>
            <p className="text-muted-foreground text-xs">Matemática</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Visão Geral</TabsTrigger>
          <TabsTrigger value="schedule">Horários</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Turmas Ativas</CardTitle>
              <div className="flex flex-col gap-4 sm:flex-row">
                <div className="flex-1">
                  <Input
                    placeholder="Buscar turma..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="max-w-sm"
                  />
                </div>
                <Select
                  value={selectedSubject}
                  onValueChange={setSelectedSubject}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Disciplina" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="matematica">Matemática</SelectItem>
                    <SelectItem value="fisica">Física</SelectItem>
                    <SelectItem value="quimica">Química</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Turma</TableHead>
                    <TableHead>Disciplina</TableHead>
                    <TableHead>Alunos</TableHead>
                    <TableHead>Horário</TableHead>
                    <TableHead>Sala</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {classesData.map((classItem) => (
                    <TableRow key={classItem.id}>
                      <TableCell className="font-medium">
                        {classItem.name}
                      </TableCell>
                      <TableCell>{classItem.subject}</TableCell>
                      <TableCell>{classItem.students}</TableCell>
                      <TableCell>{classItem.schedule}</TableCell>
                      <TableCell>{classItem.room}</TableCell>
                      <TableCell>{getStatusBadge(classItem.status)}</TableCell>
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
                            <DropdownMenuItem>Chamada</DropdownMenuItem>
                            <DropdownMenuItem>Notas</DropdownMenuItem>
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

        <TabsContent value="schedule" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Grade de Horários
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Grade de horários em desenvolvimento...
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="materials" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-5 w-5" />
                Materiais por Turma
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Materiais por turma em desenvolvimento...
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
