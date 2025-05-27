import {
  Bell,
  Mail,
  MessageCircle,
  MoreHorizontal,
  Plus,
  Send,
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
import { Textarea } from '@/components/ui/textarea'

const messagesData = [
  {
    id: 1,
    recipient: 'Maria Santos (Responsável)',
    subject: 'Reunião de Pais',
    date: '2024-01-15',
    status: 'sent',
    type: 'parent',
  },
  {
    id: 2,
    recipient: '9º A',
    subject: 'Prova de Matemática',
    date: '2024-01-14',
    status: 'sent',
    type: 'class',
  },
  {
    id: 3,
    recipient: 'Ana Silva',
    subject: 'Parabéns pelo desempenho',
    date: '2024-01-13',
    status: 'read',
    type: 'student',
  },
]

export function TeacherCommunication() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedType, setSelectedType] = useState('')

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'sent':
        return <Badge className="bg-blue-100 text-blue-800">Enviada</Badge>
      case 'read':
        return <Badge className="bg-green-100 text-green-800">Lida</Badge>
      case 'draft':
        return <Badge className="bg-gray-100 text-gray-800">Rascunho</Badge>
      default:
        return <Badge variant="secondary">-</Badge>
    }
  }

  const getTypeBadge = (type: string) => {
    switch (type) {
      case 'parent':
        return <Badge variant="outline">Responsável</Badge>
      case 'student':
        return <Badge variant="outline">Aluno</Badge>
      case 'class':
        return <Badge variant="outline">Turma</Badge>
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
              Mensagens Enviadas
            </CardTitle>
            <Send className="text-muted-foreground h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">47</div>
            <p className="text-muted-foreground text-xs">Este mês</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Mensagens Lidas
            </CardTitle>
            <Mail className="text-muted-foreground h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">42</div>
            <p className="text-muted-foreground text-xs">
              89% de taxa de leitura
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avisos Ativos</CardTitle>
            <Bell className="text-muted-foreground h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-muted-foreground text-xs">
              Para todas as turmas
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Rascunhos</CardTitle>
            <MessageCircle className="text-muted-foreground h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2</div>
            <p className="text-muted-foreground text-xs">Não enviados</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="messages" className="space-y-4">
        <TabsList>
          <TabsTrigger value="messages">Mensagens</TabsTrigger>
          <TabsTrigger value="compose">Nova Mensagem</TabsTrigger>
          <TabsTrigger value="templates">Templates</TabsTrigger>
        </TabsList>

        <TabsContent value="messages" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Histórico de Mensagens</CardTitle>
              <div className="flex flex-col gap-4 sm:flex-row">
                <div className="flex-1">
                  <Input
                    placeholder="Buscar mensagem..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="max-w-sm"
                  />
                </div>
                <Select value={selectedType} onValueChange={setSelectedType}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="parent">Responsáveis</SelectItem>
                    <SelectItem value="student">Alunos</SelectItem>
                    <SelectItem value="class">Turmas</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Destinatário</TableHead>
                    <TableHead>Assunto</TableHead>
                    <TableHead>Tipo</TableHead>
                    <TableHead>Data</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {messagesData.map((message) => (
                    <TableRow key={message.id}>
                      <TableCell className="font-medium">
                        {message.recipient}
                      </TableCell>
                      <TableCell>{message.subject}</TableCell>
                      <TableCell>{getTypeBadge(message.type)}</TableCell>
                      <TableCell>{message.date}</TableCell>
                      <TableCell>{getStatusBadge(message.status)}</TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>Ver detalhes</DropdownMenuItem>
                            <DropdownMenuItem>Reenviar</DropdownMenuItem>
                            <DropdownMenuItem>Arquivar</DropdownMenuItem>
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

        <TabsContent value="compose" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Nova Mensagem</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className="text-sm font-medium">Destinatário</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecionar destinatário" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="9a">9º A (Turma)</SelectItem>
                      <SelectItem value="9b">9º B (Turma)</SelectItem>
                      <SelectItem value="parent1">
                        Maria Santos (Responsável)
                      </SelectItem>
                      <SelectItem value="student1">
                        Ana Silva (Aluna)
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm font-medium">Tipo</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Tipo de mensagem" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="info">Informativo</SelectItem>
                      <SelectItem value="urgent">Urgente</SelectItem>
                      <SelectItem value="reminder">Lembrete</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div>
                <label className="text-sm font-medium">Assunto</label>
                <Input placeholder="Digite o assunto da mensagem" />
              </div>
              <div>
                <label className="text-sm font-medium">Mensagem</label>
                <Textarea
                  placeholder="Digite sua mensagem aqui..."
                  className="min-h-[120px]"
                />
              </div>
              <div className="flex gap-2">
                <Button>
                  <Send className="mr-2 h-4 w-4" />
                  Enviar
                </Button>
                <Button variant="outline">Salvar Rascunho</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="templates" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Templates de Mensagem</CardTitle>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Novo Template
              </Button>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Templates de mensagem em desenvolvimento...
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
