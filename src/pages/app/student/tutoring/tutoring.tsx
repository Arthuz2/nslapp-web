import {
  BookOpen,
  Calendar,
  CheckCircle,
  Clock,
  MessageCircle,
  Star,
  User,
} from 'lucide-react'
import { useState } from 'react'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

const myTutor = {
  name: 'Prof. Ana Santos',
  subject: 'Matemática',
  photo: '/placeholder.svg?height=80&width=80',
  rating: 4.9,
  experience: '8 anos',
  specialties: ['Álgebra', 'Geometria', 'Cálculo'],
  nextSession: {
    date: 'Amanhã',
    time: '14:00',
    topic: 'Funções Quadráticas',
  },
  totalSessions: 12,
  completedSessions: 8,
}

const availableTutors = [
  {
    id: '1',
    name: 'Prof. Carlos Silva',
    subject: 'Física',
    rating: 4.8,
    experience: '6 anos',
    specialties: ['Mecânica', 'Eletricidade', 'Óptica'],
    price: 'Gratuito',
    availability: 'Seg, Qua, Sex - 14:00-16:00',
  },
  {
    id: '2',
    name: 'Prof. Maria Clara',
    subject: 'Química',
    rating: 4.7,
    experience: '5 anos',
    specialties: ['Orgânica', 'Inorgânica', 'Físico-Química'],
    price: 'Gratuito',
    availability: 'Ter, Qui - 13:30-15:30',
  },
  {
    id: '3',
    name: 'Prof. Roberto Lima',
    subject: 'Português',
    rating: 4.9,
    experience: '10 anos',
    specialties: ['Redação', 'Literatura', 'Gramática'],
    price: 'Gratuito',
    availability: 'Seg, Qua - 15:20-17:00',
  },
]

const sessionHistory = [
  {
    id: '1',
    date: '15/01/2024',
    time: '14:00',
    topic: 'Equações do 2º Grau',
    duration: '50 min',
    status: 'completed',
    rating: 5,
    notes:
      'Excelente progresso! Conseguiu resolver todos os exercícios propostos.',
  },
  {
    id: '2',
    date: '12/01/2024',
    time: '14:00',
    topic: 'Sistemas Lineares',
    duration: '50 min',
    status: 'completed',
    rating: 5,
    notes: 'Boa compreensão dos métodos de resolução.',
  },
  {
    id: '3',
    date: '10/01/2024',
    time: '14:00',
    topic: 'Matrizes e Determinantes',
    duration: '50 min',
    status: 'completed',
    rating: 4,
    notes: 'Precisa praticar mais os cálculos de determinantes.',
  },
]

const upcomingSessions = [
  {
    id: '1',
    date: '18/01/2024',
    time: '14:00',
    topic: 'Funções Quadráticas',
    tutor: 'Prof. Ana Santos',
    location: 'Sala de Tutoria 1',
  },
  {
    id: '2',
    date: '22/01/2024',
    time: '14:00',
    topic: 'Gráficos de Funções',
    tutor: 'Prof. Ana Santos',
    location: 'Sala de Tutoria 1',
  },
]

export function Tutoring() {
  const [selectedTab, setSelectedTab] = useState('my-tutor')

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
      case 'scheduled':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
      case 'cancelled':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
    }
  }

  return (
    <div className="space-y-6 p-4 md:p-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-r from-green-600 to-blue-600">
          <User className="h-6 w-6 text-white" />
        </div>
        <div>
          <h1 className="text-3xl font-bold">Tutoria</h1>
          <p className="text-muted-foreground">
            Acompanhamento personalizado para seu desenvolvimento acadêmico
          </p>
        </div>
      </div>

      <Tabs
        value={selectedTab}
        onValueChange={setSelectedTab}
        className="space-y-6"
      >
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="my-tutor" className="flex items-center gap-2">
            <User className="h-4 w-4" />
            <span className="hidden sm:inline">Meu Tutor</span>
          </TabsTrigger>
          <TabsTrigger value="sessions" className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            <span className="hidden sm:inline">Sessões</span>
          </TabsTrigger>
          <TabsTrigger value="history" className="flex items-center gap-2">
            <CheckCircle className="h-4 w-4" />
            <span className="hidden sm:inline">Histórico</span>
          </TabsTrigger>
          <TabsTrigger value="find-tutor" className="flex items-center gap-2">
            <BookOpen className="h-4 w-4" />
            <span className="hidden sm:inline">Encontrar</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="my-tutor" className="space-y-6">
          <div className="grid gap-6 lg:grid-cols-3">
            {/* Tutor Info */}
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Meu Tutor
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="bg-muted flex h-20 w-20 items-center justify-center rounded-full">
                    <User className="text-muted-foreground h-8 w-8" />
                  </div>
                  <div className="flex-1 space-y-2">
                    <div>
                      <h3 className="text-xl font-bold">{myTutor.name}</h3>
                      <p className="text-muted-foreground">{myTutor.subject}</p>
                    </div>
                    <div className="flex items-center gap-4 text-sm">
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span>{myTutor.rating}</span>
                      </div>
                      <span>{myTutor.experience} de experiência</span>
                    </div>
                    <div className="flex gap-2">
                      {myTutor.specialties.map((specialty, index) => (
                        <Badge key={index} variant="secondary">
                          {specialty}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="bg-muted/50 grid grid-cols-2 gap-4 rounded-lg p-4">
                  <div>
                    <span className="text-muted-foreground text-sm">
                      Sessões Realizadas
                    </span>
                    <p className="text-2xl font-bold">
                      {myTutor.completedSessions}
                    </p>
                  </div>
                  <div>
                    <span className="text-muted-foreground text-sm">
                      Total de Sessões
                    </span>
                    <p className="text-2xl font-bold">
                      {myTutor.totalSessions}
                    </p>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button className="flex-1">
                    <MessageCircle className="mr-2 h-4 w-4" />
                    Enviar Mensagem
                  </Button>
                  <Button variant="outline">Agendar Sessão</Button>
                </div>
              </CardContent>
            </Card>

            {/* Next Session */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  Próxima Sessão
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="rounded-lg bg-blue-50 p-4 text-center dark:bg-blue-950">
                  <div className="text-2xl font-bold text-blue-600">
                    {myTutor.nextSession.date}
                  </div>
                  <div className="text-lg">{myTutor.nextSession.time}</div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <BookOpen className="text-muted-foreground h-4 w-4" />
                    <span className="text-sm">{myTutor.nextSession.topic}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="text-muted-foreground h-4 w-4" />
                    <span className="text-sm">50 minutos</span>
                  </div>
                </div>

                <Button className="w-full">Entrar na Sessão</Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="sessions" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Próximas Sessões
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {upcomingSessions.map((session) => (
                  <div
                    key={session.id}
                    className="hover:bg-muted/50 flex items-center justify-between rounded-lg border p-4 transition-colors"
                  >
                    <div className="space-y-1">
                      <h3 className="font-medium">{session.topic}</h3>
                      <p className="text-muted-foreground text-sm">
                        {session.tutor}
                      </p>
                      <div className="flex items-center gap-4 text-sm">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          <span>{session.date}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          <span>{session.time}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <BookOpen className="h-3 w-3" />
                          <span>{session.location}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">
                        Reagendar
                      </Button>
                      <Button size="sm">Confirmar</Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="history" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5" />
                Histórico de Sessões
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[500px]">
                <div className="space-y-4">
                  {sessionHistory.map((session) => (
                    <div
                      key={session.id}
                      className="space-y-3 rounded-lg border p-4"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="text-center">
                            <div className="font-medium">{session.date}</div>
                            <div className="text-muted-foreground text-sm">
                              {session.time}
                            </div>
                          </div>
                          <div>
                            <h3 className="font-medium">{session.topic}</h3>
                            <p className="text-muted-foreground text-sm">
                              Duração: {session.duration}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge className={getStatusColor(session.status)}>
                            Concluída
                          </Badge>
                          <div className="flex items-center gap-1">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`h-4 w-4 ${
                                  i < session.rating
                                    ? 'fill-yellow-400 text-yellow-400'
                                    : 'text-gray-300'
                                }`}
                              />
                            ))}
                          </div>
                        </div>
                      </div>
                      {session.notes && (
                        <div className="bg-muted/50 rounded-lg p-3">
                          <p className="text-sm">{session.notes}</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="find-tutor" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-5 w-5" />
                Tutores Disponíveis
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {availableTutors.map((tutor) => (
                  <Card
                    key={tutor.id}
                    className="transition-shadow hover:shadow-lg"
                  >
                    <CardHeader className="pb-3">
                      <div className="flex items-center gap-3">
                        <div className="bg-muted flex h-12 w-12 items-center justify-center rounded-full">
                          <User className="text-muted-foreground h-6 w-6" />
                        </div>
                        <div>
                          <CardTitle className="text-lg">
                            {tutor.name}
                          </CardTitle>
                          <p className="text-muted-foreground text-sm">
                            {tutor.subject}
                          </p>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <span>{tutor.rating}</span>
                        </div>
                        <span>{tutor.experience}</span>
                      </div>

                      <div className="space-y-2">
                        <div className="flex flex-wrap gap-1">
                          {tutor.specialties.map((specialty, index) => (
                            <Badge
                              key={index}
                              variant="secondary"
                              className="text-xs"
                            >
                              {specialty}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div className="text-sm">
                        <p className="text-muted-foreground">
                          Disponibilidade:
                        </p>
                        <p>{tutor.availability}</p>
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="font-medium text-green-600">
                          {tutor.price}
                        </span>
                        <Button size="sm">Solicitar Tutoria</Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
