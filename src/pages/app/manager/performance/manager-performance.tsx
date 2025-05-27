import {
  BarChart3,
  Filter,
  GraduationCap,
  Search,
  TrendingDown,
  TrendingUp,
  Users,
} from 'lucide-react'
import type React from 'react'
import { useState } from 'react'

import { Badge } from '@/components/ui/badge'
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

const statsCards = [
  {
    title: 'Média Geral',
    value: '7.8',
    change: '+0.3',
    trend: 'up',
    icon: BarChart3,
  },
  {
    title: 'Taxa de Aprovação',
    value: '94.2%',
    change: '+2.1%',
    trend: 'up',
    icon: GraduationCap,
  },
  {
    title: 'Alunos em Recuperação',
    value: '47',
    change: '-8',
    trend: 'down',
    icon: Users,
  },
  {
    title: 'Frequência Média',
    value: '91.5%',
    change: '+1.2%',
    trend: 'up',
    icon: TrendingUp,
  },
]

const classPerformance = [
  {
    id: 1,
    class: '9º Ano A',
    students: 32,
    average: 8.2,
    attendance: 94.5,
    approvalRate: 96.9,
    trend: 'up',
    teacher: 'Prof. Maria Silva',
  },
  {
    id: 2,
    class: '9º Ano B',
    students: 30,
    average: 7.8,
    attendance: 92.1,
    approvalRate: 93.3,
    trend: 'stable',
    teacher: 'Prof. João Santos',
  },
  {
    id: 3,
    class: '8º Ano A',
    students: 28,
    average: 7.9,
    attendance: 90.8,
    approvalRate: 92.9,
    trend: 'up',
    teacher: 'Profa. Ana Costa',
  },
  {
    id: 4,
    class: '8º Ano B',
    students: 31,
    average: 7.5,
    attendance: 89.2,
    approvalRate: 90.3,
    trend: 'down',
    teacher: 'Prof. Carlos Lima',
  },
  {
    id: 5,
    class: '7º Ano A',
    students: 29,
    average: 8.0,
    attendance: 93.7,
    approvalRate: 96.6,
    trend: 'up',
    teacher: 'Profa. Fernanda Oliveira',
  },
]

const subjectPerformance = [
  {
    id: 1,
    subject: 'Matemática',
    average: 7.2,
    students: 847,
    trend: 'down',
    difficulty: 'high',
    teacher: 'Prof. Roberto Silva',
  },
  {
    id: 2,
    subject: 'Português',
    average: 8.1,
    students: 847,
    trend: 'up',
    difficulty: 'medium',
    teacher: 'Profa. Maria Santos',
  },
  {
    id: 3,
    subject: 'História',
    average: 7.8,
    students: 847,
    trend: 'stable',
    difficulty: 'medium',
    teacher: 'Prof. João Costa',
  },
  {
    id: 4,
    subject: 'Geografia',
    average: 8.0,
    students: 847,
    trend: 'up',
    difficulty: 'low',
    teacher: 'Profa. Ana Lima',
  },
  {
    id: 5,
    subject: 'Ciências',
    average: 7.6,
    students: 847,
    trend: 'stable',
    difficulty: 'medium',
    teacher: 'Prof. Carlos Oliveira',
  },
  {
    id: 6,
    subject: 'Inglês',
    average: 7.9,
    students: 847,
    trend: 'up',
    difficulty: 'medium',
    teacher: 'Profa. Fernanda Silva',
  },
]

const lowPerformanceStudents = [
  {
    id: 1,
    name: 'Carlos Silva',
    class: '9º Ano B',
    average: 5.2,
    attendance: 78.5,
    subjects: ['Matemática', 'Física'],
    status: 'recovery',
  },
  {
    id: 2,
    name: 'Ana Santos',
    class: '8º Ano A',
    average: 5.8,
    attendance: 82.1,
    subjects: ['Matemática'],
    status: 'attention',
  },
  {
    id: 3,
    name: 'João Costa',
    class: '7º Ano B',
    average: 4.9,
    attendance: 75.3,
    subjects: ['Matemática', 'Português', 'História'],
    status: 'critical',
  },
  {
    id: 4,
    name: 'Maria Lima',
    class: '9º Ano A',
    average: 5.5,
    attendance: 80.7,
    subjects: ['Química', 'Física'],
    status: 'recovery',
  },
]

export function ManagerPerformance(): React.ReactElement {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedFilter, setSelectedFilter] = useState('all')

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up':
        return <TrendingUp className="h-4 w-4 text-green-600" />
      case 'down':
        return <TrendingDown className="h-4 w-4 text-red-600" />
      default:
        return <div className="h-4 w-4 rounded-full bg-gray-400" />
    }
  }

  const getDifficultyBadge = (difficulty: string) => {
    switch (difficulty) {
      case 'high':
        return <Badge variant="destructive">Alta</Badge>
      case 'medium':
        return <Badge variant="secondary">Média</Badge>
      case 'low':
        return <Badge variant="default">Baixa</Badge>
      default:
        return <Badge variant="outline">-</Badge>
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'critical':
        return <Badge variant="destructive">Crítico</Badge>
      case 'recovery':
        return <Badge variant="secondary">Recuperação</Badge>
      case 'attention':
        return <Badge variant="outline">Atenção</Badge>
      default:
        return <Badge variant="default">Normal</Badge>
    }
  }

  const getAverageColor = (average: number) => {
    if (average >= 8) return 'text-green-600'
    if (average >= 7) return 'text-yellow-600'
    if (average >= 6) return 'text-orange-600'
    return 'text-red-600'
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
              <p className="text-muted-foreground flex items-center text-xs">
                {stat.trend === 'up' ? (
                  <TrendingUp className="mr-1 h-3 w-3 text-green-600" />
                ) : (
                  <TrendingDown className="mr-1 h-3 w-3 text-red-600" />
                )}
                <span
                  className={
                    stat.trend === 'up' ? 'text-green-600' : 'text-red-600'
                  }
                >
                  {stat.change}
                </span>{' '}
                vs período anterior
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Tabs defaultValue="classes" className="space-y-4">
        <TabsList>
          <TabsTrigger value="classes">Por Turma</TabsTrigger>
          <TabsTrigger value="subjects">Por Disciplina</TabsTrigger>
          <TabsTrigger value="students">Alunos em Risco</TabsTrigger>
          <TabsTrigger value="analytics">Análises</TabsTrigger>
        </TabsList>

        <TabsContent value="classes" className="space-y-4">
          {/* Filters */}
          <div className="flex flex-col gap-4 md:flex-row md:items-center">
            <div className="flex flex-1 gap-4">
              <div className="relative max-w-sm flex-1">
                <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
                <Input
                  placeholder="Buscar turmas..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9"
                />
              </div>
              <Select value={selectedFilter} onValueChange={setSelectedFilter}>
                <SelectTrigger className="w-[180px]">
                  <Filter className="mr-2 h-4 w-4" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas as séries</SelectItem>
                  <SelectItem value="9ano">9º Ano</SelectItem>
                  <SelectItem value="8ano">8º Ano</SelectItem>
                  <SelectItem value="7ano">7º Ano</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Classes Performance Table */}
          <Card>
            <CardHeader>
              <CardTitle>Desempenho por Turma</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Turma</TableHead>
                    <TableHead>Professor</TableHead>
                    <TableHead>Alunos</TableHead>
                    <TableHead>Média</TableHead>
                    <TableHead>Frequência</TableHead>
                    <TableHead>Taxa de Aprovação</TableHead>
                    <TableHead>Tendência</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {classPerformance.map((classData) => (
                    <TableRow key={classData.id}>
                      <TableCell className="font-medium">
                        {classData.class}
                      </TableCell>
                      <TableCell>{classData.teacher}</TableCell>
                      <TableCell>{classData.students}</TableCell>
                      <TableCell>
                        <span className={getAverageColor(classData.average)}>
                          {classData.average.toFixed(1)}
                        </span>
                      </TableCell>
                      <TableCell>{classData.attendance.toFixed(1)}%</TableCell>
                      <TableCell>
                        {classData.approvalRate.toFixed(1)}%
                      </TableCell>
                      <TableCell>{getTrendIcon(classData.trend)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="subjects" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Desempenho por Disciplina</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Disciplina</TableHead>
                    <TableHead>Professor</TableHead>
                    <TableHead>Média Geral</TableHead>
                    <TableHead>Alunos</TableHead>
                    <TableHead>Dificuldade</TableHead>
                    <TableHead>Tendência</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {subjectPerformance.map((subject) => (
                    <TableRow key={subject.id}>
                      <TableCell className="font-medium">
                        {subject.subject}
                      </TableCell>
                      <TableCell>{subject.teacher}</TableCell>
                      <TableCell>
                        <span className={getAverageColor(subject.average)}>
                          {subject.average.toFixed(1)}
                        </span>
                      </TableCell>
                      <TableCell>{subject.students}</TableCell>
                      <TableCell>
                        {getDifficultyBadge(subject.difficulty)}
                      </TableCell>
                      <TableCell>{getTrendIcon(subject.trend)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="students" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Alunos que Precisam de Atenção</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Aluno</TableHead>
                    <TableHead>Turma</TableHead>
                    <TableHead>Média</TableHead>
                    <TableHead>Frequência</TableHead>
                    <TableHead>Disciplinas em Risco</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {lowPerformanceStudents.map((student) => (
                    <TableRow key={student.id}>
                      <TableCell className="font-medium">
                        {student.name}
                      </TableCell>
                      <TableCell>{student.class}</TableCell>
                      <TableCell>
                        <span className={getAverageColor(student.average)}>
                          {student.average.toFixed(1)}
                        </span>
                      </TableCell>
                      <TableCell>{student.attendance.toFixed(1)}%</TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1">
                          {student.subjects.map((subject) => (
                            <Badge
                              key={subject}
                              variant="outline"
                              className="text-xs"
                            >
                              {subject}
                            </Badge>
                          ))}
                        </div>
                      </TableCell>
                      <TableCell>{getStatusBadge(student.status)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Análises Avançadas</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Gráficos e análises avançadas de desempenho em
                desenvolvimento...
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
