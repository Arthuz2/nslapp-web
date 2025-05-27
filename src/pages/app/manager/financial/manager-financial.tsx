import {
  ArrowDownIcon,
  ArrowUpIcon,
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

const statsCards = [
  {
    title: 'Receita Total',
    value: 'R$ 485.240',
    change: '+12.5%',
    trend: 'up',
    icon: DollarSign,
  },
  {
    title: 'Despesas',
    value: 'R$ 234.120',
    change: '+3.2%',
    trend: 'up',
    icon: TrendingDown,
  },
  {
    title: 'Lucro Líquido',
    value: 'R$ 251.120',
    change: '+18.7%',
    trend: 'up',
    icon: TrendingUp,
  },
  {
    title: 'Inadimplência',
    value: '4.2%',
    change: '-1.1%',
    trend: 'down',
    icon: CreditCard,
  },
]

const transactions = [
  {
    id: 1,
    type: 'income',
    description: 'Mensalidade - João Silva',
    amount: 850.0,
    date: '2024-12-10',
    status: 'completed',
    category: 'Mensalidade',
    student: 'João Silva',
  },
  {
    id: 2,
    type: 'expense',
    description: 'Salário - Prof. Maria Santos',
    amount: -4500.0,
    date: '2024-12-09',
    status: 'completed',
    category: 'Salários',
    student: null,
  },
  {
    id: 3,
    type: 'income',
    description: 'Taxa de Matrícula - Ana Costa',
    amount: 200.0,
    date: '2024-12-08',
    status: 'pending',
    category: 'Matrícula',
    student: 'Ana Costa',
  },
  {
    id: 4,
    type: 'expense',
    description: 'Material Didático',
    amount: -1200.0,
    date: '2024-12-07',
    status: 'completed',
    category: 'Material',
    student: null,
  },
  {
    id: 5,
    type: 'income',
    description: 'Mensalidade - Carlos Lima',
    amount: 850.0,
    date: '2024-12-06',
    status: 'overdue',
    category: 'Mensalidade',
    student: 'Carlos Lima',
  },
]

const defaulters = [
  {
    id: 1,
    student: 'Carlos Lima',
    class: '9º Ano A',
    amount: 850.0,
    dueDate: '2024-11-05',
    daysOverdue: 35,
    contact: '(11) 99999-9999',
  },
  {
    id: 2,
    student: 'Fernanda Silva',
    class: '8º Ano B',
    amount: 1700.0,
    dueDate: '2024-10-05',
    daysOverdue: 66,
    contact: '(11) 88888-8888',
  },
  {
    id: 3,
    student: 'Roberto Santos',
    class: '7º Ano C',
    amount: 850.0,
    dueDate: '2024-11-15',
    daysOverdue: 25,
    contact: '(11) 77777-7777',
  },
]

export function ManagerFinancial(): React.ReactElement {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedFilter, setSelectedFilter] = useState('all')
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)

  const filteredTransactions = transactions.filter((transaction) => {
    const matchesSearch =
      transaction.description
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      (transaction.student &&
        transaction.student.toLowerCase().includes(searchTerm.toLowerCase()))
    const matchesFilter =
      selectedFilter === 'all' ||
      (selectedFilter === 'income' && transaction.type === 'income') ||
      (selectedFilter === 'expense' && transaction.type === 'expense')
    return matchesSearch && matchesFilter
  })

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return <Badge variant="default">Concluído</Badge>
      case 'pending':
        return <Badge variant="secondary">Pendente</Badge>
      case 'overdue':
        return <Badge variant="destructive">Vencido</Badge>
      default:
        return <Badge variant="outline">Desconhecido</Badge>
    }
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(amount)
  }

  const getDaysOverdueColor = (days: number) => {
    if (days > 60) return 'text-red-600'
    if (days > 30) return 'text-yellow-600'
    return 'text-orange-600'
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
                  <ArrowUpIcon className="mr-1 h-3 w-3 text-green-600" />
                ) : (
                  <ArrowDownIcon className="mr-1 h-3 w-3 text-red-600" />
                )}
                <span
                  className={
                    stat.trend === 'up' ? 'text-green-600' : 'text-red-600'
                  }
                >
                  {stat.change}
                </span>{' '}
                vs mês anterior
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Tabs defaultValue="transactions" className="space-y-4">
        <TabsList>
          <TabsTrigger value="transactions">Transações</TabsTrigger>
          <TabsTrigger value="defaulters">Inadimplência</TabsTrigger>
          <TabsTrigger value="reports">Relatórios</TabsTrigger>
        </TabsList>

        <TabsContent value="transactions" className="space-y-4">
          {/* Filters and Actions */}
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="flex flex-1 gap-4">
              <div className="relative max-w-sm flex-1">
                <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
                <Input
                  placeholder="Buscar transações..."
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
                  <SelectItem value="all">Todas</SelectItem>
                  <SelectItem value="income">Receitas</SelectItem>
                  <SelectItem value="expense">Despesas</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex gap-2">
              <Button variant="outline">
                <Download className="mr-2 h-4 w-4" />
                Exportar
              </Button>
              <Dialog
                open={isCreateDialogOpen}
                onOpenChange={setIsCreateDialogOpen}
              >
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="mr-2 h-4 w-4" />
                    Nova Transação
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Nova Transação</DialogTitle>
                    <DialogDescription>
                      Registre uma nova receita ou despesa.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                      <Label htmlFor="type">Tipo</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione o tipo" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="income">Receita</SelectItem>
                          <SelectItem value="expense">Despesa</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="description">Descrição</Label>
                      <Input
                        id="description"
                        placeholder="Descrição da transação"
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="amount">Valor</Label>
                      <Input id="amount" type="number" placeholder="0,00" />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="category">Categoria</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione a categoria" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="mensalidade">
                            Mensalidade
                          </SelectItem>
                          <SelectItem value="matricula">Matrícula</SelectItem>
                          <SelectItem value="salarios">Salários</SelectItem>
                          <SelectItem value="material">Material</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="date">Data</Label>
                      <Input id="date" type="date" />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button type="submit">Registrar Transação</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </div>

          {/* Transactions Table */}
          <Card>
            <CardHeader>
              <CardTitle>Transações Recentes</CardTitle>
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
                    <TableHead className="w-[50px]"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredTransactions.map((transaction) => (
                    <TableRow key={transaction.id}>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {transaction.type === 'income' ? (
                            <ArrowUpIcon className="h-4 w-4 text-green-600" />
                          ) : (
                            <ArrowDownIcon className="h-4 w-4 text-red-600" />
                          )}
                          <span className="font-medium">
                            {transaction.description}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{transaction.category}</Badge>
                      </TableCell>
                      <TableCell>
                        {new Date(transaction.date).toLocaleDateString('pt-BR')}
                      </TableCell>
                      <TableCell>
                        <span
                          className={
                            transaction.amount > 0
                              ? 'text-green-600'
                              : 'text-red-600'
                          }
                        >
                          {formatCurrency(Math.abs(transaction.amount))}
                        </span>
                      </TableCell>
                      <TableCell>
                        {getStatusBadge(transaction.status)}
                      </TableCell>
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
                            <DropdownMenuItem className="text-red-600">
                              Excluir
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

        <TabsContent value="defaulters" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Controle de Inadimplência</CardTitle>
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
                    <TableHead>Contato</TableHead>
                    <TableHead className="w-[50px]"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {defaulters.map((defaulter) => (
                    <TableRow key={defaulter.id}>
                      <TableCell className="font-medium">
                        {defaulter.student}
                      </TableCell>
                      <TableCell>{defaulter.class}</TableCell>
                      <TableCell className="text-red-600">
                        {formatCurrency(defaulter.amount)}
                      </TableCell>
                      <TableCell>
                        {new Date(defaulter.dueDate).toLocaleDateString(
                          'pt-BR',
                        )}
                      </TableCell>
                      <TableCell>
                        <span
                          className={getDaysOverdueColor(defaulter.daysOverdue)}
                        >
                          {defaulter.daysOverdue} dias
                        </span>
                      </TableCell>
                      <TableCell>{defaulter.contact}</TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>Enviar cobrança</DropdownMenuItem>
                            <DropdownMenuItem>
                              Registrar pagamento
                            </DropdownMenuItem>
                            <DropdownMenuItem>Negociar débito</DropdownMenuItem>
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

        <TabsContent value="reports" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Relatórios Financeiros</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Relatórios financeiros detalhados em desenvolvimento...
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
