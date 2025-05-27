import {
  Award,
  BarChart3,
  Calculator,
  MoreHorizontal,
  TrendingUp,
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

const gradesData = [
  {
    id: 1,
    student: 'Ana Silva',
    class: '9º A',
    subject: 'Matemática',
    grade1: 8.5,
    grade2: 7.8,
    grade3: 9.0,
    average: 8.4,
    status: 'approved',
  },
  {
    id: 2,
    student: 'Bruno Santos',
    class: '9º A',
    subject: 'Matemática',
    grade1: 6.0,
    grade2: 5.5,
    grade3: 7.0,
    average: 6.2,
    status: 'recovery',
  },
  {
    id: 3,
    student: 'Carla Oliveira',
    class: '9º A',
    subject: 'Matemática',
    grade1: 9.5,
    grade2: 9.0,
    grade3: 8.8,
    average: 9.1,
    status: 'approved',
  },
]

export function TeacherGrades() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedClass, setSelectedClass] = useState('')
  const [selectedSubject, setSelectedSubject] = useState('')

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'approved':
        return <Badge className="bg-green-100 text-green-800">Aprovado</Badge>
      case 'recovery':
        return (
          <Badge className="bg-yellow-100 text-yellow-800">Recuperação</Badge>
        )
      case 'failed':
        return <Badge className="bg-red-100 text-red-800">Reprovado</Badge>
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
            <CardTitle className="text-sm font-medium">Média Geral</CardTitle>
            <Calculator className="text-muted-foreground h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">7.8</div>
            <p className="text-muted-foreground text-xs">Todas as turmas</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Aprovados</CardTitle>
            <TrendingUp className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">187</div>
            <p className="text-muted-foreground text-xs">89% dos alunos</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Em Recuperação
            </CardTitle>
            <BarChart3 className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">18</div>
            <p className="text-muted-foreground text-xs">9% dos alunos</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Notas Pendentes
            </CardTitle>
            <Award className="text-muted-foreground h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-muted-foreground text-xs">Para lançar</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Visão Geral</TabsTrigger>
          <TabsTrigger value="input">Lançar Notas</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Notas dos Alunos</CardTitle>
              <div className="flex flex-col gap-4 sm:flex-row">
                <div className="flex-1">
                  <Input
                    placeholder="Buscar aluno..."
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
                  value={selectedSubject}
                  onValueChange={setSelectedSubject}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Disciplina" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="matematica">Matemática</SelectItem>
                    <SelectItem value="portugues">Português</SelectItem>
                    <SelectItem value="ciencias">Ciências</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Aluno</TableHead>
                    <TableHead>Turma</TableHead>
                    <TableHead>1º Bim</TableHead>
                    <TableHead>2º Bim</TableHead>
                    <TableHead>3º Bim</TableHead>
                    <TableHead>Média</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {gradesData.map((grade) => (
                    <TableRow key={grade.id}>
                      <TableCell className="font-medium">
                        {grade.student}
                      </TableCell>
                      <TableCell>{grade.class}</TableCell>
                      <TableCell>{grade.grade1}</TableCell>
                      <TableCell>{grade.grade2}</TableCell>
                      <TableCell>{grade.grade3}</TableCell>
                      <TableCell className="font-medium">
                        {grade.average}
                      </TableCell>
                      <TableCell>{getStatusBadge(grade.status)}</TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>Editar notas</DropdownMenuItem>
                            <DropdownMenuItem>Ver histórico</DropdownMenuItem>
                            <DropdownMenuItem>Observações</DropdownMenuItem>
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

        <TabsContent value="input" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Lançamento de Notas</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Formulário de lançamento de notas em desenvolvimento...
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reports" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Relatórios de Desempenho</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Relatórios de desempenho em desenvolvimento...
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
