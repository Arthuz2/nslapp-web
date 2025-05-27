import {
  BarChart3,
  Calendar,
  Download,
  FileText,
  PieChart,
  Plus,
  Search,
  TrendingUp,
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

const reportStats = [
  {
    title: 'Relatórios Gerados',
    value: '156',
    change: '+12 este mês',
    color: 'text-blue-600',
    bgColor: 'bg-blue-50 dark:bg-blue-950',
  },
  {
    title: 'Downloads Realizados',
    value: '2.847',
    change: '+245 esta semana',
    color: 'text-green-600',
    bgColor: 'bg-green-50 dark:bg-green-950',
  },
  {
    title: 'Relatórios Agendados',
    value: '23',
    change: 'Próximos 30 dias',
    color: 'text-purple-600',
    bgColor: 'bg-purple-50 dark:bg-purple-950',
  },
  {
    title: 'Tempo Médio',
    value: '2.3min',
    change: '-0.5min este mês',
    color: 'text-yellow-600',
    bgColor: 'bg-yellow-50 dark:bg-yellow-950',
  },
]

const academicReports = [
  {
    id: '1',
    name: 'Relatório de Notas por Turma',
    description: 'Análise completa das notas por turma e disciplina',
    category: 'Acadêmico',
    lastGenerated: '2024-01-15',
    downloads: 45,
    status: 'available',
  },
  {
    id: '2',
    name: 'Frequência dos Alunos',
    description: 'Relatório detalhado de presença e faltas',
    category: 'Acadêmico',
    lastGenerated: '2024-01-14',
    downloads: 32,
    status: 'available',
  },
  {
    id: '3',
    name: 'Desempenho por Disciplina',
    description: 'Análise comparativa entre disciplinas',
    category: 'Acadêmico',
    lastGenerated: '2024-01-13',
    downloads: 28,
    status: 'available',
  },
]

const financialReports = [
  {
    id: '4',
    name: 'Relatório Financeiro Mensal',
    description: 'Receitas, despesas e fluxo de caixa',
    category: 'Financeiro',
    lastGenerated: '2024-01-12',
    downloads: 18,
    status: 'available',
  },
  {
    id: '5',
    name: 'Inadimplência',
    description: 'Alunos com pendências financeiras',
    category: 'Financeiro',
    lastGenerated: '2024-01-11',
    downloads: 22,
    status: 'available',
  },
]

const administrativeReports = [
  {
    id: '6',
    name: 'Relatório de Professores',
    description: 'Desempenho e avaliação docente',
    category: 'Administrativo',
    lastGenerated: '2024-01-10',
    downloads: 15,
    status: 'available',
  },
  {
    id: '7',
    name: 'Utilização de Recursos',
    description: 'Uso de laboratórios, biblioteca e equipamentos',
    category: 'Administrativo',
    lastGenerated: '2024-01-09',
    downloads: 12,
    status: 'available',
  },
]

export function ManagerReports() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('Todas')

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-r from-blue-600 to-purple-600">
            <FileText className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold">Relatórios</h1>
            <p className="text-muted-foreground">
              Gere e gerencie relatórios da instituição
            </p>
          </div>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Plus className="mr-2 h-4 w-4" />
              Novo Relatório
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Gerar Novo Relatório</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="reportType">Tipo de Relatório</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="academic">Acadêmico</SelectItem>
                    <SelectItem value="financial">Financeiro</SelectItem>
                    <SelectItem value="administrative">
                      Administrativo
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="startDate">Data Inicial</Label>
                  <Input id="startDate" type="date" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="endDate">Data Final</Label>
                  <Input id="endDate" type="date" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="filters">Filtros Específicos</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione os filtros" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos os dados</SelectItem>
                    <SelectItem value="class">Por turma</SelectItem>
                    <SelectItem value="subject">Por disciplina</SelectItem>
                    <SelectItem value="teacher">Por professor</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline">Cancelar</Button>
                <Button>Gerar Relatório</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {reportStats.map((stat) => (
          <Card key={stat.title} className="transition-shadow hover:shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-muted-foreground text-sm font-medium">
                {stat.title}
              </CardTitle>
              <div className={`rounded-lg p-2 ${stat.bgColor}`}>
                <FileText className={`h-5 w-5 ${stat.color}`} />
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
                  placeholder="Buscar relatórios..."
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
                <SelectItem value="Todas">Todas as categorias</SelectItem>
                <SelectItem value="Acadêmico">Acadêmico</SelectItem>
                <SelectItem value="Financeiro">Financeiro</SelectItem>
                <SelectItem value="Administrativo">Administrativo</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Reports Tabs */}
      <Tabs defaultValue="academic" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="academic" className="flex items-center gap-2">
            <BarChart3 className="h-4 w-4" />
            Acadêmicos
          </TabsTrigger>
          <TabsTrigger value="financial" className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4" />
            Financeiros
          </TabsTrigger>
          <TabsTrigger
            value="administrative"
            className="flex items-center gap-2"
          >
            <PieChart className="h-4 w-4" />
            Administrativos
          </TabsTrigger>
        </TabsList>

        <TabsContent value="academic" className="space-y-4">
          {academicReports.map((report) => (
            <Card key={report.id} className="transition-shadow hover:shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <h3 className="text-lg font-semibold">{report.name}</h3>
                      <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                        {report.category}
                      </Badge>
                    </div>
                    <p className="text-muted-foreground text-sm">
                      {report.description}
                    </p>
                    <div className="text-muted-foreground flex items-center gap-4 text-xs">
                      <span>Última geração: {report.lastGenerated}</span>
                      <span>•</span>
                      <span>{report.downloads} downloads</span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline">
                      <Calendar className="mr-2 h-4 w-4" />
                      Agendar
                    </Button>
                    <Button size="sm">
                      <Download className="mr-2 h-4 w-4" />
                      Download
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="financial" className="space-y-4">
          {financialReports.map((report) => (
            <Card key={report.id} className="transition-shadow hover:shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <h3 className="text-lg font-semibold">{report.name}</h3>
                      <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                        {report.category}
                      </Badge>
                    </div>
                    <p className="text-muted-foreground text-sm">
                      {report.description}
                    </p>
                    <div className="text-muted-foreground flex items-center gap-4 text-xs">
                      <span>Última geração: {report.lastGenerated}</span>
                      <span>•</span>
                      <span>{report.downloads} downloads</span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline">
                      <Calendar className="mr-2 h-4 w-4" />
                      Agendar
                    </Button>
                    <Button size="sm">
                      <Download className="mr-2 h-4 w-4" />
                      Download
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="administrative" className="space-y-4">
          {administrativeReports.map((report) => (
            <Card key={report.id} className="transition-shadow hover:shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <h3 className="text-lg font-semibold">{report.name}</h3>
                      <Badge className="bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200">
                        {report.category}
                      </Badge>
                    </div>
                    <p className="text-muted-foreground text-sm">
                      {report.description}
                    </p>
                    <div className="text-muted-foreground flex items-center gap-4 text-xs">
                      <span>Última geração: {report.lastGenerated}</span>
                      <span>•</span>
                      <span>{report.downloads} downloads</span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline">
                      <Calendar className="mr-2 h-4 w-4" />
                      Agendar
                    </Button>
                    <Button size="sm">
                      <Download className="mr-2 h-4 w-4" />
                      Download
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  )
}
