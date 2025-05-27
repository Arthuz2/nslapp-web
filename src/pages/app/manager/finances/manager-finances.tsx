import {
  CreditCard,
  DollarSign,
  Download,
  Filter,
  MoreHorizontal,
  Plus,
  Search,
  TrendingDown,
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

const financialStats = [
  {
    title: 'Receita Mensal',
    value: 'R$ 485.200',
    change: '+12% este mês',
    color: 'text-green-600',
    bgColor: 'bg-green-50 dark:bg-green-950',
    icon: TrendingUp,
  },
  {
    title: 'Despesas Mensais',
    value: 'R$ 342.800',
    change: '+3% este mês',
    color: 'text-red-600',
    bgColor: 'bg-red-50 dark:bg-red-950',
    icon: TrendingDown,
  },
  {
    title: 'Lucro Líquido',
    value: 'R$ 142.400',
    change: '+18% este mês',
    color: 'text-blue-600',
    bgColor: 'bg-blue-50 dark:bg-blue-950',
    icon: DollarSign,
  },
  {
    title: 'Inadimplência',
    value: 'R$ 28.500',
    change: '-5% este mês',
    color: 'text-yellow-600',
    bgColor: 'bg-yellow-50 dark:bg-yellow-950',
    icon: CreditCard,
  },
]

const revenues = [
  {
    id: '1',
    description: 'Mensalidades Janeiro 2024',
    amount: 425000,
    date: '2024-01-31',
    category: 'Mensalidade',
    status: 'received',
    student: 'Múltiplos alunos',
  },
  {
    id: '2',
    description: 'Taxa de Matrícula',
    amount: 45000,
    date: '2024-01-15',
    category: 'Taxa',
    status: 'received',
    student: 'Novos alunos',
  },
  {
    id: '3',
    description: 'Curso de Extensão',
    amount: 15200,
    date: '2024-01-20',
    category: 'Curso',
    status: 'received',
    student: 'Comunidade',
  },
]

const expenses = [
  {
    id: '1',
    description: 'Salários Professores',
    amount: 180000,
    date: '2024-01-30',
    category: 'Pessoal',
    status: 'paid',
    supplier: 'Folha de Pagamento',
  },
  {
    id: '2',
    description: 'Energia Elétrica',
    amount: 8500,
    date: '2024-01-25',
    category: 'Utilidades',
    status: 'paid',
    supplier: 'Companhia Elétrica',
  },
  {
    id: '3',
    description: 'Material Didático',
    amount: 25000,
    date: '2024-01-20',
    category: 'Material',
    status: 'pending',
    supplier: 'Editora ABC',
  },
  {
    id: '4',
    description: 'Manutenção Equipamentos',
    amount: 12000,
    date: '2024-01-18',
    category: 'Manutenção',
    status: 'paid',
    supplier: 'TechService',
  },
]

const pendingPayments = [
  {
    id: '1',
    student: 'Arthur Porcino Pereira',
    class: '3ªIM01-EMI-IPI',
    amount: 850,
    dueDate: '2024-01-10',
    daysOverdue: 15,
    status: 'overdue',
  },
  {
    id: '2',
    student: 'Maria Silva Santos',
    class: '3ªIM01-EMI-IPI',
    amount: 850,
    dueDate: '2024-01-05',
    daysOverdue: 20,
    status: 'overdue',
  },
  {
    id: '3',
    student: 'João Pedro Costa',
    class: '2ªIM02-EMI-IPI',
    amount: 850,
    dueDate: '2024-01-15',
    daysOverdue: 10,
    status: 'overdue',
  },
  {
    id: '4',
    student: 'Ana Carolina Lima',
    class: '1ªADM01-EMI-ADM',
    amount: 750,
    dueDate: '2024-01-20',
    daysOverdue: 5,
    status: 'overdue',
  },
]

export function ManagerFinances() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('Todas')
  const [selectedStatus, setSelectedStatus] = useState('Todos')

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(amount)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'received':
      case 'paid':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
      case 'overdue':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'received':
        return 'Recebido'
      case 'paid':
        return 'Pago'
      case 'pending':
        return 'Pendente'
      case 'overdue':
        return 'Em Atraso'
      default:
        return 'Desconhecido'
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-r from-green-600 to-blue-600">
            <DollarSign className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold">Gestão Financeira</h1>
            <p className="text-muted-foreground">
              Controle financeiro da instituição
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Exportar
          </Button>
          <Dialog>
            <DialogTrigger asChild>
              <Button className="bg-green-600 hover:bg-green-700">
                <Plus className="mr-2 h-4 w-4" />
                Nova Transação
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Nova Transação</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="type">Tipo de Transação</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o tipo" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="revenue">Receita</SelectItem>
                      <SelectItem value="expense">Despesa</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="description">Descrição</Label>
                    <Input
                      id="description"
                      placeholder="Descrição da transação"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="amount">Valor</Label>
                    <Input id="amount" placeholder="R$ 0,00" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="date">Data</Label>
                    <Input id="date" type="date" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="category">Categoria</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione a categoria" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="mensalidade">Mensalidade</SelectItem>
                        <SelectItem value="taxa">Taxa</SelectItem>
                        <SelectItem value="pessoal">Pessoal</SelectItem>
                        <SelectItem value="utilidades">Utilidades</SelectItem>
                        <SelectItem value="material">Material</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="flex justify-end gap-2">
                  <Button variant="outline">Cancelar</Button>
                  <Button>Salvar Transação</Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {financialStats.map((stat) => (
          <Card key={stat.title} className="transition-shadow hover:shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-muted-foreground text-sm font-medium">
                {stat.title}
              </CardTitle>
              <div className={`rounded-lg p-2 ${stat.bgColor}`}>
                <stat.icon className={`h-5 w-5 ${stat.color}`} />
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

      {/* Financial Tabs */}
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview" className="flex items-center gap-2">
            <DollarSign className="h-4 w-4" />
            Visão Geral
          </TabsTrigger>
          <TabsTrigger value="revenues" className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4" />
            Receitas
          </TabsTrigger>
          <TabsTrigger value="expenses" className="flex items-center gap-2">
            <TrendingDown className="h-4 w-4" />
            Despesas
          </TabsTrigger>
          <TabsTrigger value="pending" className="flex items-center gap-2">
            <CreditCard className="h-4 w-4" />
            Inadimplência
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid gap-6 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Fluxo de Caixa Mensal</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Receitas</span>
                    <span className="text-lg font-bold text-green-600">
                      R$ 485.200
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Despesas</span>
                    <span className="text-lg font-bold text-red-600">
                      R$ 342.800
                    </span>
                  </div>
                  <div className="border-t pt-4">
                    <div className="flex items-center justify-between">
                      <span className="text-base font-semibold">Saldo</span>
                      <span className="text-xl font-bold text-blue-600">
                        R$ 142.400
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Distribuição de Receitas</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Mensalidades</span>
                    <span className="font-medium">87.6%</span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-gray-200">
                    <div className="h-2 w-[87.6%] rounded-full bg-blue-600"></div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Taxas</span>
                    <span className="font-medium">9.3%</span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-gray-200">
                    <div className="h-2 w-[9.3%] rounded-full bg-green-600"></div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Cursos</span>
                    <span className="font-medium">3.1%</span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-gray-200">
                    <div className="h-2 w-[3.1%] rounded-full bg-purple-600"></div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="revenues" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Receitas</CardTitle>
                <Button variant="outline" size="sm">
                  <Filter className="mr-2 h-4 w-4" />
                  Filtros
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Descrição</TableHead>
                    <TableHead>Categoria</TableHead>
                    <TableHead>Data</TableHead>
                    <TableHead>Valor</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {revenues.map((revenue) => (
                    <TableRow key={revenue.id}>
                      <TableCell>
                        <div>
                          <div className="font-medium">
                            {revenue.description}
                          </div>
                          <div className="text-muted-foreground text-sm">
                            {revenue.student}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{revenue.category}</Badge>
                      </TableCell>
                      <TableCell>{revenue.date}</TableCell>
                      <TableCell className="font-medium text-green-600">
                        {formatCurrency(revenue.amount)}
                      </TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(revenue.status)}>
                          {getStatusText(revenue.status)}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>Ver Detalhes</DropdownMenuItem>
                            <DropdownMenuItem>Editar</DropdownMenuItem>
                            <DropdownMenuItem>Gerar Recibo</DropdownMenuItem>
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

        <TabsContent value="expenses" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Despesas</CardTitle>
                <Button variant="outline" size="sm">
                  <Filter className="mr-2 h-4 w-4" />
                  Filtros
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Descrição</TableHead>
                    <TableHead>Categoria</TableHead>
                    <TableHead>Data</TableHead>
                    <TableHead>Valor</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {expenses.map((expense) => (
                    <TableRow key={expense.id}>
                      <TableCell>
                        <div>
                          <div className="font-medium">
                            {expense.description}
                          </div>
                          <div className="text-muted-foreground text-sm">
                            {expense.supplier}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{expense.category}</Badge>
                      </TableCell>
                      <TableCell>{expense.date}</TableCell>
                      <TableCell className="font-medium text-red-600">
                        {formatCurrency(expense.amount)}
                      </TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(expense.status)}>
                          {getStatusText(expense.status)}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>Ver Detalhes</DropdownMenuItem>
                            <DropdownMenuItem>Editar</DropdownMenuItem>
                            <DropdownMenuItem>
                              Gerar Comprovante
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

        <TabsContent value="pending" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Pagamentos em Atraso</CardTitle>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Search className="mr-2 h-4 w-4" />
                    Buscar
                  </Button>
                  <Button size="sm">Enviar Cobrança</Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Aluno</TableHead>
                    <TableHead>Turma</TableHead>
                    <TableHead>Valor</TableHead>
                    <TableHead>Vencimento</TableHead>
                    <TableHead>Dias em Atraso</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {pendingPayments.map((payment) => (
                    <TableRow key={payment.id}>
                      <TableCell className="font-medium">
                        {payment.student}
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{payment.class}</Badge>
                      </TableCell>
                      <TableCell className="font-medium text-red-600">
                        {formatCurrency(payment.amount)}
                      </TableCell>
                      <TableCell>{payment.dueDate}</TableCell>
                      <TableCell>
                        <span className="font-medium text-red-600">
                          {payment.daysOverdue} dias
                        </span>
                      </TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(payment.status)}>
                          {getStatusText(payment.status)}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>Enviar Cobrança</DropdownMenuItem>
                            <DropdownMenuItem>
                              Negociar Pagamento
                            </DropdownMenuItem>
                            <DropdownMenuItem>Ver Histórico</DropdownMenuItem>
                            <DropdownMenuItem>
                              Contatar Responsável
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
      </Tabs>
    </div>
  )
}
