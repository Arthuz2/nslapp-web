import {
  BookOpen,
  CheckCircle,
  Clock,
  MapPin,
  Star,
  Users,
  XCircle,
} from 'lucide-react'
import { useState } from 'react'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

const availableElectives = [
  {
    id: '1',
    name: 'Robótica e Automação',
    teacher: 'Prof. Carlos Silva',
    description:
      'Aprenda a construir e programar robôs usando Arduino e sensores.',
    schedule: 'Terças e Quintas, 15:20-16:10',
    location: 'Lab. de Robótica',
    maxStudents: 20,
    enrolledStudents: 15,
    category: 'Tecnologia',
    difficulty: 'Intermediário',
    rating: 4.8,
    image: '/placeholder.svg?height=200&width=300',
    requirements: [
      'Conhecimento básico de programação',
      'Interesse em eletrônica',
    ],
    objectives: [
      'Construir robôs funcionais',
      'Programar microcontroladores',
      'Trabalhar com sensores e atuadores',
    ],
  },
  {
    id: '2',
    name: 'Fotografia Digital',
    teacher: 'Prof. Ana Santos',
    description:
      'Desenvolva suas habilidades fotográficas e aprenda técnicas de edição.',
    schedule: 'Segundas e Quartas, 13:30-14:20',
    location: 'Estúdio Fotográfico',
    maxStudents: 15,
    enrolledStudents: 12,
    category: 'Arte',
    difficulty: 'Iniciante',
    rating: 4.9,
    image: '/placeholder.svg?height=200&width=300',
    requirements: ['Interesse em arte visual', 'Câmera ou smartphone'],
    objectives: [
      'Dominar técnicas de composição',
      'Aprender edição digital',
      'Criar portfólio pessoal',
    ],
  },
  {
    id: '3',
    name: 'Empreendedorismo Jovem',
    teacher: 'Prof. Roberto Lima',
    description: 'Aprenda a criar e desenvolver seu próprio negócio.',
    schedule: 'Sextas, 14:20-16:10',
    location: 'Sala de Projetos',
    maxStudents: 25,
    enrolledStudents: 20,
    category: 'Negócios',
    difficulty: 'Intermediário',
    rating: 4.7,
    image: '/placeholder.svg?height=200&width=300',
    requirements: ['Criatividade', 'Interesse em negócios'],
    objectives: [
      'Desenvolver plano de negócios',
      'Aprender sobre marketing',
      'Criar protótipo de produto/serviço',
    ],
  },
  {
    id: '4',
    name: 'Música e Produção',
    teacher: 'Prof. Maria Clara',
    description: 'Explore a criação musical e produção de áudio digital.',
    schedule: 'Terças e Quintas, 13:30-14:20',
    location: 'Estúdio Musical',
    maxStudents: 12,
    enrolledStudents: 12,
    category: 'Arte',
    difficulty: 'Iniciante',
    rating: 4.6,
    image: '/placeholder.svg?height=200&width=300',
    requirements: ['Interesse musical', 'Não é necessário saber tocar'],
    objectives: [
      'Compor músicas originais',
      'Aprender produção digital',
      'Gravar e mixar áudio',
    ],
  },
]

const myElectives = [
  {
    id: '1',
    name: 'Robótica e Automação',
    teacher: 'Prof. Carlos Silva',
    status: 'enrolled',
    progress: 75,
    nextClass: 'Amanhã, 15:20',
    grade: 8.5,
    attendance: 95,
  },
  {
    id: '2',
    name: 'Fotografia Digital',
    teacher: 'Prof. Ana Santos',
    status: 'completed',
    progress: 100,
    finalGrade: 9.2,
    attendance: 100,
  },
]

export function Electives() {
  const [selectedElective, setSelectedElective] = useState<string | null>(null)

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Tecnologia':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
      case 'Arte':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200'
      case 'Negócios':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
    }
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Iniciante':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
      case 'Intermediário':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
      case 'Avançado':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
    }
  }

  return (
    <div className="space-y-6 p-4 md:p-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-r from-purple-600 to-pink-600">
          <BookOpen className="h-6 w-6 text-white" />
        </div>
        <div>
          <h1 className="text-3xl font-bold">Eletivas</h1>
          <p className="text-muted-foreground">
            Explore disciplinas opcionais e desenvolva novos talentos
          </p>
        </div>
      </div>

      <Tabs defaultValue="available" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="available" className="flex items-center gap-2">
            <BookOpen className="h-4 w-4" />
            Disponíveis
          </TabsTrigger>
          <TabsTrigger value="my-electives" className="flex items-center gap-2">
            <CheckCircle className="h-4 w-4" />
            Minhas Eletivas
          </TabsTrigger>
        </TabsList>

        <TabsContent value="available" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {availableElectives.map((elective) => (
              <Card
                key={elective.id}
                className="cursor-pointer transition-shadow hover:shadow-lg"
              >
                <CardHeader className="pb-3">
                  <div className="bg-muted mb-3 flex aspect-video items-center justify-center rounded-lg">
                    <BookOpen className="text-muted-foreground h-8 w-8" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-start justify-between">
                      <CardTitle className="text-lg leading-tight">
                        {elective.name}
                      </CardTitle>
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm font-medium">
                          {elective.rating}
                        </span>
                      </div>
                    </div>
                    <p className="text-muted-foreground text-sm">
                      {elective.teacher}
                    </p>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm">{elective.description}</p>

                  <div className="flex gap-2">
                    <Badge className={getCategoryColor(elective.category)}>
                      {elective.category}
                    </Badge>
                    <Badge className={getDifficultyColor(elective.difficulty)}>
                      {elective.difficulty}
                    </Badge>
                  </div>

                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <Clock className="text-muted-foreground h-4 w-4" />
                      <span>{elective.schedule}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="text-muted-foreground h-4 w-4" />
                      <span>{elective.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="text-muted-foreground h-4 w-4" />
                      <span>
                        {elective.enrolledStudents}/{elective.maxStudents}{' '}
                        alunos
                      </span>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      className="flex-1"
                      disabled={
                        elective.enrolledStudents >= elective.maxStudents
                      }
                    >
                      {elective.enrolledStudents >= elective.maxStudents
                        ? 'Lotada'
                        : 'Inscrever-se'}
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => setSelectedElective(elective.id)}
                    >
                      Detalhes
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="my-electives" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            {myElectives.map((elective) => (
              <Card
                key={elective.id}
                className="transition-shadow hover:shadow-lg"
              >
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{elective.name}</CardTitle>
                    {elective.status === 'enrolled' ? (
                      <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                        <CheckCircle className="mr-1 h-3 w-3" />
                        Cursando
                      </Badge>
                    ) : (
                      <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                        <CheckCircle className="mr-1 h-3 w-3" />
                        Concluída
                      </Badge>
                    )}
                  </div>
                  <p className="text-muted-foreground text-sm">
                    {elective.teacher}
                  </p>
                </CardHeader>
                <CardContent className="space-y-4">
                  {elective.status === 'enrolled' ? (
                    <>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Progresso</span>
                          <span>{elective.progress}%</span>
                        </div>
                        <div className="h-2 w-full rounded-full bg-gray-200">
                          <div
                            className="h-2 rounded-full bg-blue-600 transition-all duration-500"
                            style={{ width: `${elective.progress}%` }}
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-muted-foreground">
                            Próxima aula:
                          </span>
                          <p className="font-medium">{elective.nextClass}</p>
                        </div>
                        <div>
                          <span className="text-muted-foreground">
                            Nota atual:
                          </span>
                          <p className="font-medium text-blue-600">
                            {elective.grade}
                          </p>
                        </div>
                      </div>

                      <div className="text-sm">
                        <span className="text-muted-foreground">
                          Frequência:{' '}
                        </span>
                        <span className="font-medium">
                          {elective.attendance}%
                        </span>
                      </div>
                    </>
                  ) : (
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-muted-foreground">
                          Nota final:
                        </span>
                        <p className="font-medium text-green-600">
                          {elective.finalGrade}
                        </p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">
                          Frequência:
                        </span>
                        <p className="font-medium">{elective.attendance}%</p>
                      </div>
                    </div>
                  )}

                  <Button size="sm" variant="outline" className="w-full">
                    Ver Detalhes
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* Detailed View Modal would go here */}
      {selectedElective && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <Card className="max-h-[90vh] w-full max-w-2xl overflow-hidden">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Detalhes da Eletiva</CardTitle>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSelectedElective(null)}
                >
                  <XCircle className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <ScrollArea className="max-h-[70vh]">
              <CardContent className="space-y-4">
                {(() => {
                  const elective = availableElectives.find(
                    (e) => e.id === selectedElective,
                  )
                  if (!elective) return null

                  return (
                    <>
                      <div className="bg-muted flex aspect-video items-center justify-center rounded-lg">
                        <BookOpen className="text-muted-foreground h-12 w-12" />
                      </div>

                      <div>
                        <h3 className="text-xl font-bold">{elective.name}</h3>
                        <p className="text-muted-foreground">
                          {elective.teacher}
                        </p>
                      </div>

                      <p>{elective.description}</p>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <h4 className="mb-2 font-medium">Informações</h4>
                          <div className="space-y-2 text-sm">
                            <div className="flex items-center gap-2">
                              <Clock className="h-4 w-4" />
                              <span>{elective.schedule}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <MapPin className="h-4 w-4" />
                              <span>{elective.location}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Users className="h-4 w-4" />
                              <span>
                                {elective.enrolledStudents}/
                                {elective.maxStudents} alunos
                              </span>
                            </div>
                          </div>
                        </div>

                        <div>
                          <h4 className="mb-2 font-medium">Requisitos</h4>
                          <ul className="space-y-1 text-sm">
                            {elective.requirements.map((req, index) => (
                              <li
                                key={index}
                                className="flex items-start gap-2"
                              >
                                <CheckCircle className="mt-1 h-3 w-3 text-green-600" />
                                <span>{req}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      <div>
                        <h4 className="mb-2 font-medium">Objetivos</h4>
                        <ul className="space-y-1 text-sm">
                          {elective.objectives.map((obj, index) => (
                            <li key={index} className="flex items-start gap-2">
                              <Star className="mt-1 h-3 w-3 text-yellow-600" />
                              <span>{obj}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <Button
                        className="w-full"
                        disabled={
                          elective.enrolledStudents >= elective.maxStudents
                        }
                      >
                        {elective.enrolledStudents >= elective.maxStudents
                          ? 'Eletiva Lotada'
                          : 'Inscrever-se na Eletiva'}
                      </Button>
                    </>
                  )
                })()}
              </CardContent>
            </ScrollArea>
          </Card>
        </div>
      )}
    </div>
  )
}
