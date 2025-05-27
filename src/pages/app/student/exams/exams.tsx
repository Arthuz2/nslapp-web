import { BookOpen, Calendar, Filter } from 'lucide-react'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

import { ExamsFilter } from './components/exams-filter'
import { ExamsHeader } from './components/exams-header'
import type { ExamsPeriodSectionProps } from './components/exams-period-section'
import { ExamsPeriodSection } from './components/exams-period-section'

const examsPeriods: ExamsPeriodSectionProps[] = [
  {
    period: 'Janeiro 2024',
    exams: [
      {
        id: 1,
        title: 'Prova de Matemática - 1º Bimestre',
        subject: 'Matemática',
        teacher: 'Prof. Alex Menezes',
        date: '15/01/2024',
        score: '8.5/10',
        percentage: 85,
        status: 'available',
        difficulty: 'Médio',
        topics: ['Funções', 'Logaritmos', 'Trigonometria'],
        totalQuestions: 10,
        hasFiveAlternatives: true,
      },
      {
        id: 2,
        title: 'Avaliação de História - Brasil Colonial',
        subject: 'História',
        teacher: 'Prof. Maria Clara',
        date: '18/01/2024',
        score: '7.0/10',
        percentage: 70,
        status: 'pending',
        difficulty: 'Difícil',
        topics: ['Colonização', 'Economia Colonial', 'Sociedade'],
        totalQuestions: 15,
        hasFiveAlternatives: true,
      },
      {
        id: 7,
        title: 'Prova de Português - Literatura',
        subject: 'Português',
        teacher: 'Prof. Ana Santos',
        date: '25/01/2024',
        score: 'Pendente',
        percentage: 0,
        status: 'submitted',
        difficulty: 'Difícil',
        topics: ['Romantismo', 'Realismo', 'Análise Textual'],
        totalQuestions: 12,
        hasFiveAlternatives: true,
      },
    ],
  },
  {
    period: 'Fevereiro 2024',
    exams: [
      {
        id: 8,
        title: 'Prova de Física - Eletricidade',
        subject: 'Física',
        teacher: 'Prof. Roberto Silva',
        date: '05/02/2024',
        score: '7.5/10',
        percentage: 75,
        status: 'corrected',
        difficulty: 'Difícil',
        topics: ['Corrente Elétrica', 'Resistência', 'Circuitos'],
        totalQuestions: 8,
        hasFiveAlternatives: false,
      },
      {
        id: 9,
        title: 'Avaliação de Química - Soluções',
        subject: 'Química',
        teacher: 'Prof. Fernanda Costa',
        date: '08/02/2024',
        score: '9.0/10',
        percentage: 90,
        status: 'corrected',
        difficulty: 'Médio',
        topics: ['Concentração', 'Diluição', 'Mistura de Soluções'],
        totalQuestions: 10,
        hasFiveAlternatives: true,
      },
    ],
  },
  {
    period: 'Dezembro 2023',
    exams: [
      {
        id: 3,
        title: 'Prova Final de Português',
        subject: 'Português',
        teacher: 'Prof. Ana Santos',
        date: '12/12/2023',
        score: '9.0/10',
        percentage: 90,
        status: 'corrected',
        difficulty: 'Fácil',
        topics: ['Literatura', 'Gramática', 'Redação'],
        totalQuestions: 12,
        hasFiveAlternatives: false,
      },
      {
        id: 4,
        title: 'Avaliação de Biologia - Genética',
        subject: 'Biologia',
        teacher: 'Prof. Carlos Lima',
        date: '08/12/2023',
        score: 'Pendente',
        percentage: 0,
        status: 'submitted',
        difficulty: 'Médio',
        topics: ['DNA', 'Hereditariedade', 'Mutações'],
        totalQuestions: 15,
        hasFiveAlternatives: true,
      },
    ],
  },
]

export function Exams() {
  const allExams = examsPeriods.flatMap((period) => period.exams)
  const availableExams = allExams.filter((exam) => exam.status === 'available')
  const submittedExams = allExams.filter((exam) => exam.status === 'submitted')
  const correctedExams = allExams.filter((exam) => exam.status === 'corrected')

  const averageScore =
    correctedExams.length > 0
      ? correctedExams.reduce((sum, exam) => sum + exam.percentage, 0) /
        correctedExams.length
      : 0

  return (
    <div className="space-y-6 p-4 md:p-6">
      {/* Header */}
      <ExamsHeader />

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Disponíveis</CardTitle>
            <BookOpen className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">
              {availableExams.length}
            </div>
            <p className="text-muted-foreground text-xs">Para responder</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Enviadas</CardTitle>
            <Calendar className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">
              {submittedExams.length}
            </div>
            <p className="text-muted-foreground text-xs">Aguardando correção</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Corrigidas</CardTitle>
            <Filter className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {correctedExams.length}
            </div>
            <p className="text-muted-foreground text-xs">
              Resultados disponíveis
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Média Geral</CardTitle>
            <Filter className="text-muted-foreground h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div
              className={`text-2xl font-bold ${averageScore >= 80 ? 'text-green-600' : averageScore >= 70 ? 'text-yellow-600' : 'text-red-600'}`}
            >
              {averageScore > 0 ? `${averageScore.toFixed(1)}%` : '--'}
            </div>
            <p className="text-muted-foreground text-xs">
              Das provas corrigidas
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <ExamsFilter />

      {/* Exams by Period */}
      <div className="space-y-4">
        {examsPeriods.map((period) => (
          <ExamsPeriodSection
            key={period.period}
            period={period.period}
            exams={period.exams}
          />
        ))}
      </div>
    </div>
  )
}
