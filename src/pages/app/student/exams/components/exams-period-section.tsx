import { ChevronDown } from 'lucide-react'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible'

import { ExamCard } from './exam-card'

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

export interface ExamsPeriodSectionProps {
  period: string
  exams: Exam[]
}

export function ExamsPeriodSection({ period, exams }: ExamsPeriodSectionProps) {
  const correctedExams = exams.filter((exam) => exam.status === 'corrected')
  const pendingExams = exams.filter((exam) => exam.status === 'pending')

  const averageScore =
    correctedExams.length > 0
      ? correctedExams.reduce((sum, exam) => sum + exam.percentage, 0) /
        correctedExams.length
      : 0

  return (
    <Card>
      <Collapsible defaultOpen>
        <CollapsibleTrigger asChild>
          <CardHeader className="hover:bg-muted/50 cursor-pointer transition-colors">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <ChevronDown className="h-5 w-5 transition-transform group-data-[state=closed]:rotate-[-90deg]" />
                <CardTitle className="text-xl">{period}</CardTitle>
              </div>
              <div className="flex items-center gap-4 text-sm">
                <span className="text-muted-foreground">
                  {exams.length} {exams.length === 1 ? 'prova' : 'provas'}
                </span>
                {correctedExams.length > 0 && (
                  <span
                    className={`font-medium ${
                      averageScore >= 80
                        ? 'text-green-600'
                        : averageScore >= 70
                          ? 'text-yellow-600'
                          : 'text-red-600'
                    }`}
                  >
                    Média: {averageScore.toFixed(1)}%
                  </span>
                )}
                {pendingExams.length > 0 && (
                  <span className="font-medium text-yellow-600">
                    {pendingExams.length} pendente
                    {pendingExams.length > 1 ? 's' : ''}
                  </span>
                )}
              </div>
            </div>
          </CardHeader>
        </CollapsibleTrigger>

        <CollapsibleContent>
          <CardContent className="pt-0">
            <div className="grid gap-4 md:grid-cols-2">
              {exams.map((exam) => (
                <ExamCard key={exam.id} exam={exam} />
              ))}
            </div>
          </CardContent>
        </CollapsibleContent>
      </Collapsible>
    </Card>
  )
}
