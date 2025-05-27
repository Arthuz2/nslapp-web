import { Paperclip, Plus, Search, Send, Smile, UserPlus } from 'lucide-react'
import { useState } from 'react'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Textarea } from '@/components/ui/textarea'

interface Contact {
  id: string
  name: string
  avatar?: string
  lastMessage: string
  timestamp: string
  unreadCount: number
  isOnline: boolean
  type: 'individual' | 'group' | 'teacher'
}

interface Message {
  id: string
  content: string
  sender: string
  timestamp: Date
  isOwn: boolean
}

interface Conversation {
  [contactId: string]: Message[]
}

const contacts: Contact[] = [
  {
    id: '1',
    name: 'Prof. Alex Menezes',
    lastMessage: 'A prova será na próxima semana',
    timestamp: '14:30',
    unreadCount: 0,
    isOnline: true,
    type: 'teacher',
  },
  {
    id: '2',
    name: 'Grupo 3ªIM01',
    lastMessage: 'João: Alguém tem o resumo de história?',
    timestamp: '13:45',
    unreadCount: 3,
    isOnline: false,
    type: 'group',
  },
  {
    id: '3',
    name: 'Maria Silva',
    lastMessage: 'Você entendeu a matéria de física?',
    timestamp: '12:20',
    unreadCount: 1,
    isOnline: true,
    type: 'individual',
  },
  {
    id: '4',
    name: 'Prof. Ana Santos',
    lastMessage: 'Parabéns pela nota na redação!',
    timestamp: '11:15',
    unreadCount: 0,
    isOnline: false,
    type: 'teacher',
  },
  {
    id: '5',
    name: 'Grupo Matemática',
    lastMessage: 'Pedro: Vamos estudar juntos amanhã?',
    timestamp: '10:30',
    unreadCount: 2,
    isOnline: false,
    type: 'group',
  },
  {
    id: '6',
    name: 'Carlos Lima',
    lastMessage: 'Obrigado pela ajuda com química!',
    timestamp: '09:45',
    unreadCount: 0,
    isOnline: false,
    type: 'individual',
  },
  {
    id: '7',
    name: 'Grupo Projeto Final',
    lastMessage: 'Ana: Reunião às 15h na biblioteca',
    timestamp: 'Ontem',
    unreadCount: 0,
    isOnline: false,
    type: 'group',
  },
]

const initialConversations: Conversation = {
  '1': [
    {
      id: '1',
      content: 'Bom dia, Arthur! Como estão os estudos?',
      sender: 'Prof. Alex Menezes',
      timestamp: new Date(Date.now() - 7200000),
      isOwn: false,
    },
    {
      id: '2',
      content: 'Bom dia, professor! Estão indo bem, obrigado!',
      sender: 'Você',
      timestamp: new Date(Date.now() - 7100000),
      isOwn: true,
    },
    {
      id: '3',
      content: 'A prova será na próxima semana. Estudem os capítulos 5 e 6.',
      sender: 'Prof. Alex Menezes',
      timestamp: new Date(Date.now() - 3600000),
      isOwn: false,
    },
  ],
  '2': [
    {
      id: '1',
      content: 'Pessoal, alguém tem o resumo da aula de história de ontem?',
      sender: 'João Santos',
      timestamp: new Date(Date.now() - 5400000),
      isOwn: false,
    },
    {
      id: '2',
      content: 'Eu tenho! Vou mandar aqui',
      sender: 'Ana Costa',
      timestamp: new Date(Date.now() - 5300000),
      isOwn: false,
    },
    {
      id: '3',
      content: 'Obrigado, Ana! Você salvou minha vida 😅',
      sender: 'João Santos',
      timestamp: new Date(Date.now() - 5200000),
      isOwn: false,
    },
  ],
  '3': [
    {
      id: '1',
      content: 'Oi! Você entendeu a matéria de física?',
      sender: 'Maria Silva',
      timestamp: new Date(Date.now() - 3600000),
      isOwn: false,
    },
    {
      id: '2',
      content:
        'Oi Maria! Sim, consegui fazer a maioria. Tive dificuldade só na questão 5.',
      sender: 'Você',
      timestamp: new Date(Date.now() - 3500000),
      isOwn: true,
    },
    {
      id: '3',
      content:
        'Essa questão 5 é complicada mesmo! Quer que eu te explique como resolvi?',
      sender: 'Maria Silva',
      timestamp: new Date(Date.now() - 3400000),
      isOwn: false,
    },
  ],
  '4': [
    {
      id: '1',
      content: 'Arthur, parabéns pela excelente redação!',
      sender: 'Prof. Ana Santos',
      timestamp: new Date(Date.now() - 14400000),
      isOwn: false,
    },
    {
      id: '2',
      content: 'Muito obrigado, professora! Fico feliz que tenha gostado.',
      sender: 'Você',
      timestamp: new Date(Date.now() - 14300000),
      isOwn: true,
    },
  ],
  '5': [
    {
      id: '1',
      content: 'Galera, vamos nos reunir amanhã para estudar para a prova?',
      sender: 'Pedro Lima',
      timestamp: new Date(Date.now() - 7200000),
      isOwn: false,
    },
    {
      id: '2',
      content: 'Boa ideia! Que horas?',
      sender: 'Carla Souza',
      timestamp: new Date(Date.now() - 7100000),
      isOwn: false,
    },
    {
      id: '3',
      content: 'Que tal às 14h na biblioteca?',
      sender: 'Pedro Lima',
      timestamp: new Date(Date.now() - 7000000),
      isOwn: false,
    },
  ],
  '6': [
    {
      id: '1',
      content: 'Cara, muito obrigado pela ajuda com química ontem!',
      sender: 'Carlos Lima',
      timestamp: new Date(Date.now() - 10800000),
      isOwn: false,
    },
    {
      id: '2',
      content: 'Imagina! Sempre que precisar, pode contar comigo 😊',
      sender: 'Você',
      timestamp: new Date(Date.now() - 10700000),
      isOwn: true,
    },
  ],
  '7': [
    {
      id: '1',
      content:
        'Pessoal, reunião hoje às 15h na biblioteca para discutir o projeto final',
      sender: 'Ana Costa',
      timestamp: new Date(Date.now() - 86400000),
      isOwn: false,
    },
    {
      id: '2',
      content: 'Estarei lá!',
      sender: 'Você',
      timestamp: new Date(Date.now() - 86300000),
      isOwn: true,
    },
  ],
}

export function Chat() {
  const [selectedContact, setSelectedContact] = useState<Contact>(contacts[2])
  const [conversations, setConversations] =
    useState<Conversation>(initialConversations)
  const [newMessage, setNewMessage] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [isCreatingGroup, setIsCreatingGroup] = useState(false)
  const [newGroupName, setNewGroupName] = useState('')
  const [newGroupDescription, setNewGroupDescription] = useState('')

  const filteredContacts = contacts.filter((contact) =>
    contact.name.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const currentMessages = conversations[selectedContact.id] || []

  const handleContactSelect = (contact: Contact) => {
    setSelectedContact(contact)
    // Marcar mensagens como lidas
    const contactIndex = contacts.findIndex((c) => c.id === contact.id)
    if (contactIndex !== -1) {
      contacts[contactIndex].unreadCount = 0
    }
  }

  const handleSendMessage = () => {
    if (!newMessage.trim()) return

    const message: Message = {
      id: Date.now().toString(),
      content: newMessage.trim(),
      sender: 'Você',
      timestamp: new Date(),
      isOwn: true,
    }

    setConversations((prev) => ({
      ...prev,
      [selectedContact.id]: [...(prev[selectedContact.id] || []), message],
    }))
    setNewMessage('')

    // Simular resposta automática
    setTimeout(
      () => {
        const responses = [
          'Entendi! Obrigada pela explicação 😊',
          'Perfeito! Isso vai me ajudar muito.',
          'Ótima ideia! Vamos fazer isso.',
          'Concordo totalmente contigo!',
          'Muito obrigado pela ajuda! 🙏',
          'Excelente! Até mais tarde então.',
        ]

        const response: Message = {
          id: (Date.now() + 1).toString(),
          content: responses[Math.floor(Math.random() * responses.length)],
          sender: selectedContact.name,
          timestamp: new Date(),
          isOwn: false,
        }

        setConversations((prev) => ({
          ...prev,
          [selectedContact.id]: [...(prev[selectedContact.id] || []), response],
        }))
      },
      1000 + Math.random() * 2000,
    )
  }

  const handleCreateGroup = () => {
    if (!newGroupName.trim()) return

    const newGroup: Contact = {
      id: Date.now().toString(),
      name: newGroupName,
      lastMessage: 'Grupo criado',
      timestamp: 'Agora',
      unreadCount: 0,
      isOnline: false,
      type: 'group',
    }

    contacts.unshift(newGroup)

    const welcomeMessage: Message = {
      id: Date.now().toString(),
      content: `Grupo "${newGroupName}" criado com sucesso! ${newGroupDescription ? `\n\nDescrição: ${newGroupDescription}` : ''}`,
      sender: 'Sistema',
      timestamp: new Date(),
      isOwn: false,
    }

    setConversations((prev) => ({
      ...prev,
      [newGroup.id]: [welcomeMessage],
    }))

    setSelectedContact(newGroup)
    setIsCreatingGroup(false)
    setNewGroupName('')
    setNewGroupDescription('')
  }

  const getContactInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2)
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('pt-BR', {
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  const formatMessageTime = (timestamp: string) => {
    if (timestamp === 'Ontem' || timestamp === 'Agora') return timestamp
    if (timestamp.includes(':')) return timestamp
    return timestamp
  }

  return (
    <div className="flex h-full flex-col space-y-4 p-4 md:p-6">
      {/* Header */}

      <div className="grid min-h-0 flex-1 gap-4 lg:grid-cols-4">
        {/* Contacts List */}
        <div className="order-2 lg:order-1 lg:col-span-1">
          <Card className="flex h-[500px] flex-col lg:h-[600px]">
            <CardHeader className="border-b pb-3">
              <div className="mb-3 flex items-center justify-between">
                <h3 className="font-semibold">Conversas</h3>
                <Dialog
                  open={isCreatingGroup}
                  onOpenChange={setIsCreatingGroup}
                >
                  <DialogTrigger asChild>
                    <Button
                      size="sm"
                      className="bg-green-600 hover:bg-green-700"
                    >
                      <Plus className="mr-1 h-4 w-4" />
                      Grupo
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle className="flex items-center gap-2">
                        <UserPlus className="h-5 w-5" />
                        Criar Novo Grupo
                      </DialogTitle>
                      <DialogDescription>
                        Crie um grupo para estudos, trabalhos ou projetos em
                        equipe.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="groupName">Nome do Grupo</Label>
                        <Input
                          id="groupName"
                          placeholder="Ex: Grupo de Matemática"
                          value={newGroupName}
                          onChange={(e) => setNewGroupName(e.target.value)}
                        />
                      </div>
                      <div>
                        <Label htmlFor="groupDescription">
                          Descrição (opcional)
                        </Label>
                        <Textarea
                          id="groupDescription"
                          placeholder="Descreva o propósito do grupo..."
                          value={newGroupDescription}
                          onChange={(e) =>
                            setNewGroupDescription(e.target.value)
                          }
                          rows={3}
                        />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button
                        variant="outline"
                        onClick={() => setIsCreatingGroup(false)}
                      >
                        Cancelar
                      </Button>
                      <Button
                        onClick={handleCreateGroup}
                        disabled={!newGroupName.trim()}
                        className="bg-green-600 hover:bg-green-700"
                      >
                        Criar Grupo
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
              <div className="relative">
                <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform" />
                <Input
                  placeholder="Buscar conversas..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </CardHeader>

            <CardContent className="min-h-0 flex-1 p-0">
              <ScrollArea className="h-full">
                <div className="space-y-1 p-2">
                  {filteredContacts.map((contact) => (
                    <div
                      key={contact.id}
                      className={`hover:bg-muted/50 flex cursor-pointer items-center gap-3 rounded-lg p-3 transition-colors ${
                        selectedContact.id === contact.id ? 'bg-muted' : ''
                      }`}
                      onClick={() => handleContactSelect(contact)}
                    >
                      <div className="relative">
                        <Avatar className="h-10 w-10">
                          <AvatarImage
                            src={contact.avatar || '/placeholder.svg'}
                          />
                          <AvatarFallback className="text-xs font-medium">
                            {contact.type === 'group'
                              ? '👥'
                              : getContactInitials(contact.name)}
                          </AvatarFallback>
                        </Avatar>
                        {contact.isOnline && (
                          <div className="border-background absolute -right-0.5 -bottom-0.5 h-3 w-3 rounded-full border-2 bg-green-500" />
                        )}
                      </div>

                      <div className="min-w-0 flex-1">
                        <div className="flex items-center justify-between">
                          <h3 className="truncate text-sm font-medium">
                            {contact.name}
                          </h3>
                          <span className="text-muted-foreground text-xs">
                            {formatMessageTime(contact.timestamp)}
                          </span>
                        </div>
                        <p className="text-muted-foreground truncate text-xs">
                          {contact.lastMessage}
                        </p>
                      </div>

                      {contact.unreadCount > 0 && (
                        <Badge className="flex h-5 min-w-[20px] items-center justify-center bg-green-600 text-xs text-white">
                          {contact.unreadCount}
                        </Badge>
                      )}
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </div>

        {/* Chat Area */}
        <div className="order-1 min-h-0 lg:order-2 lg:col-span-3">
          <Card className="flex h-[500px] flex-col lg:h-[600px]">
            {/* Chat Header */}
            <CardHeader className="border-b pb-3">
              <div className="flex items-center">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <Avatar className="h-10 w-10">
                      <AvatarImage
                        src={selectedContact.avatar || '/placeholder.svg'}
                      />
                      <AvatarFallback className="text-sm font-medium">
                        {selectedContact.type === 'group'
                          ? '👥'
                          : getContactInitials(selectedContact.name)}
                      </AvatarFallback>
                    </Avatar>
                    {selectedContact.isOnline && (
                      <div className="border-background absolute -right-0.5 -bottom-0.5 h-3 w-3 rounded-full border-2 bg-green-500" />
                    )}
                  </div>
                  <div>
                    <h3 className="font-medium">{selectedContact.name}</h3>
                    <p className="text-muted-foreground text-sm">
                      {selectedContact.type === 'group'
                        ? `${Math.floor(Math.random() * 20) + 5} membros`
                        : selectedContact.isOnline
                          ? 'Online'
                          : 'Visto por último hoje'}
                    </p>
                  </div>
                </div>
              </div>
            </CardHeader>

            {/* Messages */}
            <CardContent className="min-h-0 flex-1 p-0">
              <ScrollArea className="h-full p-4">
                <div className="space-y-4">
                  {currentMessages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.isOwn ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-[75%] rounded-lg p-3 ${
                          message.isOwn
                            ? 'bg-green-600 text-white'
                            : 'bg-muted text-foreground border shadow-sm'
                        }`}
                      >
                        {!message.isOwn && selectedContact.type === 'group' && (
                          <div className="mb-1 text-xs font-medium text-green-600">
                            {message.sender}
                          </div>
                        )}
                        <div className="text-sm leading-relaxed">
                          {message.content}
                        </div>
                        <div
                          className={`mt-1 text-xs ${message.isOwn ? 'text-green-100' : 'text-muted-foreground'}`}
                        >
                          {formatTime(message.timestamp)}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>

            {/* Message Input */}
            <div className="border-t p-4">
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <Paperclip className="h-4 w-4" />
                </Button>
                <Input
                  placeholder="Digite uma mensagem..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault()
                      handleSendMessage()
                    }
                  }}
                  className="flex-1"
                />
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <Smile className="h-4 w-4" />
                </Button>
                <Button
                  onClick={handleSendMessage}
                  disabled={!newMessage.trim()}
                  className="bg-green-600 px-4 hover:bg-green-700"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
