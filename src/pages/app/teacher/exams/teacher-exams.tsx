import { Calendar, Clock, FileText, MoreHorizontal, Users } from 'lucide-react'
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

const examsData = [
  {
    id: 1,
    title: 'Prova de Equações do 2º Grau',
    class: '9º A',
    date: '2024-01-20',
    duration: '90 min',
    status: 'scheduled',
    students: 28,
  },
  {
    id: 2,
    title: 'Avaliação de Funções',
    class: '9º B',
    date: '2024-01-18',
    duration: '60 min',
    status: 'completed',
    students: 26,
  },
  {
    id: 3,
    title: 'Teste de Geometria',
    class: '8º A',
    date: '2024-01-22',
    duration: '45 min',
    status: 'draft',
    students: 30,
  },
]

export function TeacherExams() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedClass, setSelectedClass] = useState('')
  const [selectedStatus, setSelectedStatus] = useState('')

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'scheduled':
        return <Badge className="bg-blue-100 text-blue-800">Agendada</Badge>
      case 'completed':
        return <Badge className="bg-green-100 text-green-800">Realizada</Badge>
      case 'draft':
        return <Badge className="bg-gray-100 text-gray-800">Rascunho</Badge>
      case 'correcting':
        return (
          <Badge className="bg-yellow-100 text-yellow-800">Corrigindo</Badge>
        )
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
            <CardTitle className="text-sm font-medium">
              Provas Agendadas
            </CardTitle>
            <Calendar className="text-muted-foreground h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5</div>
            <p className="text-muted-foreground text-xs">Próximas 2 semanas</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Para Corrigir</CardTitle>
            <FileText className="text-muted-foreground h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">73</div>
            <p className="text-muted-foreground text-xs">Provas pendentes</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Média Geral</CardTitle>
            <Users className="text-muted-foreground h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">7.8</div>
            <p className="text-muted-foreground text-xs">Última avaliação</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Rascunhos</CardTitle>
            <Clock className="text-muted-foreground h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2</div>
            <p className="text-muted-foreground text-xs">Não finalizados</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Visão Geral</TabsTrigger>
          <TabsTrigger value="create">Criar Prova</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Provas e Avaliações</CardTitle>
              <div className="flex flex-col gap-4 sm:flex-row">
                <div className="flex-1">
                  <Input
                    placeholder="Buscar prova..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="max-w-sm"
                  />
                </div>
                <Select value={selectedClass} onValueChange={setSelectedClass}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Turma" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="9a">9º A</SelectItem>
                    <SelectItem value="9b">9º B</SelectItem>
                    <SelectItem value="8a">8º A</SelectItem>
                    <SelectItem value="8b">8º B</SelectItem>
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
                    <SelectItem value="scheduled">Agendadas</SelectItem>
                    <SelectItem value="completed">Realizadas</SelectItem>
                    <SelectItem value="draft">Rascunhos</SelectItem>
                    <SelectItem value="correcting">Corrigindo</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Título</TableHead>
                    <TableHead>Turma</TableHead>
                    <TableHead>Data</TableHead>
                    <TableHead>Duração</TableHead>
                    <TableHead>Alunos</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {examsData.map((exam) => (
                    <TableRow key={exam.id}>
                      <TableCell className="font-medium">
                        {exam.title}
                      </TableCell>
                      <TableCell>{exam.class}</TableCell>
                      <TableCell>{exam.date}</TableCell>
                      <TableCell>{exam.duration}</TableCell>
                      <TableCell>{exam.students}</TableCell>
                      <TableCell>{getStatusBadge(exam.status)}</TableCell>
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
                            <DropdownMenuItem>Corrigir</DropdownMenuItem>
                            <DropdownMenuItem>Resultados</DropdownMenuItem>
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

        <TabsContent value="create" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Criar Nova Prova</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Formulário de criação de prova em desenvolvimento...
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="bank" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Banco de Questões</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Banco de questões em desenvolvimento...
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
