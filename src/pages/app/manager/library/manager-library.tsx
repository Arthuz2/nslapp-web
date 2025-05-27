import {
  Book,
  BookOpen,
  Download,
  Edit,
  Filter,
  MoreHorizontal,
  Plus,
  Search,
  Trash2,
  Users,
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
import { Textarea } from '@/components/ui/textarea'

const libraryStats = [
  {
    title: 'Total de Livros',
    value: '3.247',
    change: '+45 este mês',
    color: 'text-blue-600',
    bgColor: 'bg-blue-50 dark:bg-blue-950',
  },
  {
    title: 'Livros Emprestados',
    value: '892',
    change: '27% do acervo',
    color: 'text-green-600',
    bgColor: 'bg-green-50 dark:bg-green-950',
  },
  {
    title: 'Usuários Ativos',
    value: '456',
    change: '+23 este mês',
    color: 'text-purple-600',
    bgColor: 'bg-purple-50 dark:bg-purple-950',
  },
  {
    title: 'Empréstimos/Mês',
    value: '1.234',
    change: '+12% este mês',
    color: 'text-yellow-600',
    bgColor: 'bg-yellow-50 dark:bg-yellow-950',
  },
]

const books = [
  {
    id: '1',
    title: 'Algoritmos e Estruturas de Dados',
    author: 'Thomas H. Cormen',
    isbn: '978-8535236996',
    category: 'Informática',
    publisher: 'Campus',
    year: 2012,
    copies: 5,
    available: 2,
    status: 'available',
    location: 'Seção A - Prateleira 12',
  },
  {
    id: '2',
    title: 'Matemática Aplicada',
    author: 'Howard Anton',
    isbn: '978-8540701694',
    category: 'Matemática',
    publisher: 'Bookman',
    year: 2014,
    copies: 8,
    available: 5,
    status: 'available',
    location: 'Seção B - Prateleira 5',
  },
  {
    id: '3',
    title: 'Física Conceitual',
    author: 'Paul G. Hewitt',
    isbn: '978-8540701847',
    category: 'Física',
    publisher: 'Bookman',
    year: 2015,
    copies: 6,
    available: 0,
    status: 'unavailable',
    location: 'Seção C - Prateleira 8',
  },
]

const loans = [
  {
    id: '1',
    bookTitle: 'Algoritmos e Estruturas de Dados',
    student: 'Arthur Porcino Pereira',
    class: '3ªIM01-EMI-IPI',
    loanDate: '2024-01-10',
    dueDate: '2024-01-24',
    status: 'active',
    daysOverdue: 0,
  },
  {
    id: '2',
    bookTitle: 'Matemática Aplicada',
    student: 'Maria Silva Santos',
    class: '3ªIM01-EMI-IPI',
    loanDate: '2024-01-05',
    dueDate: '2024-01-19',
    status: 'overdue',
    daysOverdue: 6,
  },
  {
    id: '3',
    bookTitle: 'Física Conceitual',
    student: 'João Pedro Costa',
    class: '2ªIM02-EMI-IPI',
    loanDate: '2024-01-08',
    dueDate: '2024-01-22',
    status: 'active',
    daysOverdue: 0,
  },
]

const categories = [
  'Todas',
  'Informática',
  'Matemática',
  'Física',
  'Química',
  'História',
  'Geografia',
  'Literatura',
]

export function ManagerLibrary() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('Todas')

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
      case 'unavailable':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
      case 'maintenance':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
      case 'active':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
      case 'overdue':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'available':
        return 'Disponível'
      case 'unavailable':
        return 'Indisponível'
      case 'maintenance':
        return 'Manutenção'
      case 'active':
        return 'Ativo'
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
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-r from-blue-600 to-purple-600">
            <Book className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold">Gestão da Biblioteca</h1>
            <p className="text-muted-foreground">
              Gerencie o acervo e empréstimos da biblioteca
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
              <Button className="bg-blue-600 hover:bg-blue-700">
                <Plus className="mr-2 h-4 w-4" />
                Novo Livro
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Adicionar Novo Livro</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Título</Label>
                  <Input id="title" placeholder="Título do livro" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="author">Autor</Label>
                    <Input id="author" placeholder="Nome do autor" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="isbn">ISBN</Label>
                    <Input id="isbn" placeholder="978-XXXXXXXXX" />
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="category">Categoria</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.slice(1).map((category) => (
                          <SelectItem key={category} value={category}>
                            {category}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="publisher">Editora</Label>
                    <Input id="publisher" placeholder="Nome da editora" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="year">Ano</Label>
                    <Input id="year" type="number" placeholder="2024" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="copies">Número de Cópias</Label>
                    <Input id="copies" type="number" placeholder="1" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="location">Localização</Label>
                    <Input id="location" placeholder="Seção A - Prateleira 1" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Descrição</Label>
                  <Textarea
                    id="description"
                    placeholder="Descrição do livro..."
                  />
                </div>
                <div className="flex justify-end gap-2">
                  <Button variant="outline">Cancelar</Button>
                  <Button>Adicionar Livro</Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {libraryStats.map((stat) => (
          <Card key={stat.title} className="transition-shadow hover:shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-muted-foreground text-sm font-medium">
                {stat.title}
              </CardTitle>
              <div className={`rounded-lg p-2 ${stat.bgColor}`}>
                <Book className={`h-5 w-5 ${stat.color}`} />
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

      {/* Library Tabs */}
      <Tabs defaultValue="books" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="books" className="flex items-center gap-2">
            <BookOpen className="h-4 w-4" />
            Acervo
          </TabsTrigger>
          <TabsTrigger value="loans" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            Empréstimos
          </TabsTrigger>
          <TabsTrigger value="reports" className="flex items-center gap-2">
            <Book className="h-4 w-4" />
            Relatórios
          </TabsTrigger>
        </TabsList>

        <TabsContent value="books" className="space-y-6">
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
                      placeholder="Buscar por título, autor ou ISBN..."
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
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Books Table */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Acervo da Biblioteca</CardTitle>
                <Button variant="outline" size="sm">
                  <Filter className="mr-2 h-4 w-4" />
                  Filtros Avançados
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Livro</TableHead>
                    <TableHead>Categoria</TableHead>
                    <TableHead>Editora/Ano</TableHead>
                    <TableHead>Disponibilidade</TableHead>
                    <TableHead>Localização</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {books.map((book) => (
                    <TableRow key={book.id}>
                      <TableCell>
                        <div className="space-y-1">
                          <div className="font-medium">{book.title}</div>
                          <div className="text-muted-foreground text-sm">
                            {book.author}
                          </div>
                          <div className="text-muted-foreground text-xs">
                            ISBN: {book.isbn}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{book.category}</Badge>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">
                          <div>{book.publisher}</div>
                          <div className="text-muted-foreground">
                            {book.year}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">
                          <span className="font-medium">{book.available}</span>
                          <span className="text-muted-foreground">
                            /{book.copies} disponíveis
                          </span>
                        </div>
                      </TableCell>
                      <TableCell className="text-sm">{book.location}</TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(book.status)}>
                          {getStatusText(book.status)}
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
                            <DropdownMenuItem>
                              <Edit className="mr-2 h-4 w-4" />
                              Editar
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Users className="mr-2 h-4 w-4" />
                              Ver Empréstimos
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-red-600">
                              <Trash2 className="mr-2 h-4 w-4" />
                              Remover
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

        <TabsContent value="loans" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Empréstimos Ativos</CardTitle>
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Novo Empréstimo
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Livro</TableHead>
                    <TableHead>Aluno</TableHead>
                    <TableHead>Turma</TableHead>
                    <TableHead>Data Empréstimo</TableHead>
                    <TableHead>Data Devolução</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {loans.map((loan) => (
                    <TableRow key={loan.id}>
                      <TableCell className="font-medium">
                        {loan.bookTitle}
                      </TableCell>
                      <TableCell>{loan.student}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{loan.class}</Badge>
                      </TableCell>
                      <TableCell>{loan.loanDate}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <span>{loan.dueDate}</span>
                          {loan.daysOverdue > 0 && (
                            <Badge className="bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200">
                              {loan.daysOverdue} dias
                            </Badge>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(loan.status)}>
                          {getStatusText(loan.status)}
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
                            <DropdownMenuItem>
                              Renovar Empréstimo
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              Registrar Devolução
                            </DropdownMenuItem>
                            <DropdownMenuItem>Enviar Lembrete</DropdownMenuItem>
                            <DropdownMenuItem>Ver Histórico</DropdownMenuItem>
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

        <TabsContent value="reports" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Livros Mais Emprestados</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">
                      Algoritmos e Estruturas de Dados
                    </span>
                    <span className="font-medium">45 empréstimos</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Matemática Aplicada</span>
                    <span className="font-medium">38 empréstimos</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Física Conceitual</span>
                    <span className="font-medium">32 empréstimos</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Estatísticas Mensais</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Novos empréstimos</span>
                    <span className="font-medium text-green-600">+234</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Devoluções</span>
                    <span className="font-medium text-blue-600">198</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Empréstimos em atraso</span>
                    <span className="font-medium text-red-600">12</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
