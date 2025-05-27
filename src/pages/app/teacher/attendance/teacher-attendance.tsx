import { Calendar, Check, Filter, Users, X } from 'lucide-react'
import { useState } from 'react'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
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

const attendanceData = [
  {
    id: 1,
    student: 'Ana Silva',
    class: '9º A',
    date: '2024-01-15',
    status: 'present',
    justification: null,
  },
  {
    id: 2,
    student: 'Bruno Santos',
    class: '9º A',
    date: '2024-01-15',
    status: 'absent',
    justification: 'Consulta médica',
  },
  {
    id: 3,
    student: 'Carla Oliveira',
    class: '9º A',
    date: '2024-01-15',
    status: 'present',
    justification: null,
  },
  {
    id: 4,
    student: 'Diego Costa',
    class: '9º A',
    date: '2024-01-15',
    status: 'late',
    justification: 'Trânsito',
  },
]

export function TeacherAttendance() {
  const [selectedClass, setSelectedClass] = useState('')
  const [selectedDate, setSelectedDate] = useState('')
  const [searchTerm, setSearchTerm] = useState('')

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'present':
        return <Badge className="bg-green-100 text-green-800">Presente</Badge>
      case 'absent':
        return <Badge className="bg-red-100 text-red-800">Ausente</Badge>
      case 'late':
        return <Badge className="bg-yellow-100 text-yellow-800">Atrasado</Badge>
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
              Presentes Hoje
            </CardTitle>
            <Check className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">187</div>
            <p className="text-muted-foreground text-xs">94% de presença</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Ausentes</CardTitle>
            <X className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">8</div>
            <p className="text-muted-foreground text-xs">4% de ausência</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Atrasados</CardTitle>
            <Calendar className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">4</div>
            <p className="text-muted-foreground text-xs">2% de atraso</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Alunos</CardTitle>
            <Users className="text-muted-foreground h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">199</div>
            <p className="text-muted-foreground text-xs">Todas as turmas</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="daily" className="space-y-4">
        <TabsList>
          <TabsTrigger value="daily">Chamada Diária</TabsTrigger>
          <TabsTrigger value="reports">Relatórios</TabsTrigger>
          <TabsTrigger value="history">Histórico</TabsTrigger>
        </TabsList>

        <TabsContent value="daily" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Chamada Diária</CardTitle>
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
                    <SelectValue placeholder="Selecionar turma" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="9a">9º A</SelectItem>
                    <SelectItem value="9b">9º B</SelectItem>
                    <SelectItem value="8a">8º A</SelectItem>
                    <SelectItem value="8b">8º B</SelectItem>
                  </SelectContent>
                </Select>
                <Input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="w-[180px]"
                />
                <Button>
                  <Filter className="mr-2 h-4 w-4" />
                  Filtrar
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Aluno</TableHead>
                    <TableHead>Turma</TableHead>
                    <TableHead>Data</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Justificativa</TableHead>
                    <TableHead>Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {attendanceData.map((record) => (
                    <TableRow key={record.id}>
                      <TableCell className="font-medium">
                        {record.student}
                      </TableCell>
                      <TableCell>{record.class}</TableCell>
                      <TableCell>{record.date}</TableCell>
                      <TableCell>{getStatusBadge(record.status)}</TableCell>
                      <TableCell>{record.justification || '-'}</TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline">
                            Editar
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reports" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Relatórios de Frequência</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Relatórios de frequência em desenvolvimento...
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="history" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Histórico de Frequência</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Histórico de frequência em desenvolvimento...
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
