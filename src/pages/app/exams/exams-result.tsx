import { ClipboardCheck } from 'lucide-react'

import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'

import { ExamsHeader } from './components/exams-header'
import {
  ExamsResultCard,
  ExamsResultCardProps,
} from './components/exams-result-card'

const examsResultData: ExamsResultCardProps[] = [
  {
    title: '1° Prova de Matemática',
    subject: 'Matemática',
    teacher: 'Alex Menezes Pereira',
    date: '12/10/2023',
    answerKey: [
      { numberOfQuestion: 1, answer: 'A', answerStudent: 'A' },
      { numberOfQuestion: 2, answer: 'A', answerStudent: 'A' },
      { numberOfQuestion: 3, answer: 'A', answerStudent: 'A' },
      { numberOfQuestion: 4, answer: 'A', answerStudent: 'D' },
      { numberOfQuestion: 5, answer: 'B', answerStudent: 'D' },
      { numberOfQuestion: 6, answer: 'B', answerStudent: 'B' },
      { numberOfQuestion: 7, answer: 'B', answerStudent: 'B' },
      { numberOfQuestion: 8, answer: 'B', answerStudent: 'A' },
      { numberOfQuestion: 9, answer: 'D', answerStudent: 'D' },
      { numberOfQuestion: 10, answer: 'D', answerStudent: 'D' },
    ],
    score: 7,
    totalPoints: 12,
    isVisible: true,
    hasFiveAlternatives: false,
  },
  {
    title: '2° Prova de História',
    subject: 'História',
    teacher: 'Maria Clara Silva',
    date: '15/10/2023',
    answerKey: [
      { numberOfQuestion: 1, answer: 'A', answerStudent: 'A' },
      { numberOfQuestion: 2, answer: 'A', answerStudent: 'A' },
      { numberOfQuestion: 3, answer: 'A', answerStudent: 'A' },
      { numberOfQuestion: 4, answer: 'D', answerStudent: 'D' },
      { numberOfQuestion: 5, answer: 'C', answerStudent: 'C' },
      { numberOfQuestion: 6, answer: 'C', answerStudent: 'C' },
      { numberOfQuestion: 7, answer: 'E', answerStudent: 'E' },
      { numberOfQuestion: 8, answer: 'E', answerStudent: 'E' },
    ],
    score: 10,
    totalPoints: 10,
    isVisible: false,
    hasFiveAlternatives: true,
  },
]

export function ExamsResult() {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-4 md:gap-7 md:px-5">
      <ExamsHeader />
      {examsResultData.length > 0 ? (
        <ScrollArea className="h-130 w-full p-2">
          {examsResultData.map((exam) => (
            <ExamsResultCard
              key={exam.title}
              title={exam.title}
              subject={exam.subject}
              teacher={exam.teacher}
              date={exam.date}
              answerKey={exam.answerKey}
              score={exam.score}
              totalPoints={exam.totalPoints}
              isVisible={exam.isVisible}
              hasFiveAlternatives={exam.hasFiveAlternatives}
            />
          ))}
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      ) : (
        <div className="flex h-full w-full flex-col items-center justify-center gap-3 rounded-lg border p-4 text-center">
          <ClipboardCheck className="text-muted-foreground h-18 w-18" />
          <h1 className="text-muted-foreground text-lg font-semibold">
            Você não tem provas corrigidas.
          </h1>
        </div>
      )}
    </div>
  )
}
