import { Calendar, CheckCircle, Clock, Eye, PenTool, User } from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'

import { ExamAnswerSheet } from './exam-answer-sheet'

export type ExamStatus = 'available' | 'submitted' | 'corrected' | 'pending'

export interface Exam {
  id: number
  title: string
  subject: string
  teacher: string
  date: string
  score: string
  percentage: number
  status: ExamStatus
  difficulty: string
  topics: string[]
  totalQuestions: number
  hasFiveAlternatives: boolean
}

interface ExamCardProps {
  exam: Exam
}

const getStatusColor = (status: string) => {
  switch (status) {
    case 'available':
      return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
    case 'submitted':
      return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
    case 'corrected':
      return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
    default:
      return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
  }
}

const getStatusText = (status: string) => {
  switch (status) {
    case 'available':
      return 'Disponível'
    case 'submitted':
      return 'Enviada'
    case 'corrected':
      return 'Corrigida'
    default:
      return 'Desconhecido'
  }
}

const getScoreColor = (percentage: number) => {
  if (percentage >= 80) return 'text-green-600'
  if (percentage >= 70) return 'text-yellow-600'
  if (percentage >= 60) return 'text-orange-600'
  return 'text-red-600'
}

const getDifficultyColor = (difficulty: string) => {
  switch (difficulty) {
    case 'Fácil':
      return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
    case 'Médio':
      return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
    case 'Difícil':
      return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
    default:
      return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
  }
}

const getActionButton = (exam: Exam) => {
  switch (exam.status) {
    case 'available':
      return (
        <ExamAnswerSheet exam={exam}>
          <Button className="w-full bg-blue-600 hover:bg-blue-700">
            <PenTool className="mr-2 h-4 w-4" />
            Responder Prova
          </Button>
        </ExamAnswerSheet>
      )
    case 'submitted':
      return (
        <Button variant="outline" className="w-full" disabled>
          <CheckCircle className="mr-2 h-4 w-4" />
          Aguardando Correção
        </Button>
      )
    case 'corrected':
      return (
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" className="w-full">
              <Eye className="mr-2 h-4 w-4" />
              Ver Resultado
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>{exam.title}</DialogTitle>
              <DialogDescription>
                {exam.subject} • {exam.date}
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4">
              <div>
                <h4 className="mb-2 font-medium">Informações Gerais</h4>
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span>Professor:</span>
                    <span>{exam.teacher}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Dificuldade:</span>
                    <Badge className={getDifficultyColor(exam.difficulty)}>
                      {exam.difficulty}
                    </Badge>
                  </div>
                  <div className="flex justify-between">
                    <span>Status:</span>
                    <Badge className={getStatusColor(exam.status)}>
                      {getStatusText(exam.status)}
                    </Badge>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="mb-2 font-medium">Resultado</h4>
                <div className="bg-muted/50 rounded-lg p-4 text-center">
                  <div
                    className={`text-3xl font-bold ${getScoreColor(exam.percentage)}`}
                  >
                    {exam.score}
                  </div>
                  <div className="text-muted-foreground mt-1 text-sm">
                    {exam.percentage}% de aproveitamento
                  </div>
                </div>
              </div>

              <div>
                <h4 className="mb-2 font-medium">Tópicos Abordados</h4>
                <div className="flex flex-wrap gap-1">
                  {exam.topics.map((topic, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {topic}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )
    default:
      return null
  }
}

export function ExamCard({ exam }: ExamCardProps) {
  return (
    <Card className="transition-shadow hover:shadow-md">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <CardTitle className="line-clamp-2 text-lg">{exam.title}</CardTitle>
          <Badge className={getStatusColor(exam.status)}>
            {getStatusText(exam.status)}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="text-muted-foreground flex items-center gap-2 text-sm">
            <User className="h-4 w-4" />
            <span>{exam.teacher}</span>
          </div>
          <div className="text-muted-foreground flex items-center gap-2 text-sm">
            <Calendar className="h-4 w-4" />
            <span>{exam.date}</span>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <Badge className={getDifficultyColor(exam.difficulty)}>
            {exam.difficulty}
          </Badge>
          {exam.status === 'corrected' ? (
            <div
              className={`text-xl font-bold ${getScoreColor(exam.percentage)}`}
            >
              {exam.score}
            </div>
          ) : exam.status === 'submitted' ? (
            <div className="flex items-center gap-1 text-yellow-600">
              <Clock className="h-4 w-4" />
              <span className="text-sm">Enviada</span>
            </div>
          ) : (
            <div className="flex items-center gap-1 text-blue-600">
              <PenTool className="h-4 w-4" />
              <span className="text-sm">Disponível</span>
            </div>
          )}
        </div>

        {exam.status === 'corrected' && (
          <div className="space-y-1">
            <div className="flex justify-between text-xs">
              <span>Aproveitamento</span>
              <span>{exam.percentage}%</span>
            </div>
            <div className="h-2 w-full rounded-full bg-gray-200">
              <div
                className={`h-2 rounded-full transition-all ${
                  exam.percentage >= 80
                    ? 'bg-green-500'
                    : exam.percentage >= 70
                      ? 'bg-yellow-500'
                      : 'bg-red-500'
                }`}
                style={{ width: `${exam.percentage}%` }}
              />
            </div>
          </div>
        )}

        {getActionButton(exam)}
      </CardContent>
    </Card>
  )
}
