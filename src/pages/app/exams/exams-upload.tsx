import { ClipboardCheck } from 'lucide-react'

import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'

import { ExamsHeader } from './components/exams-header'
import { ExamsUploadCard } from './components/exams-upload-card'

const examsUploadData = [
  {
    id: 1,
    title: '1° Prova de Matemática',
    subject: 'Matemática',
    teacher: 'Alex Menezes Pereira',
    date: '12/10/2023',
    numberOfQuestions: 10,
    totalPoints: 10,
  },
  {
    id: 2,
    title: '2° Prova de História',
    subject: 'História',
    teacher: 'Maria Clara Silva',
    date: '15/10/2023',
    numberOfQuestions: 8,
    totalPoints: 10,
  },
]

export function ExamsUpload() {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-4 md:gap-7 md:px-5">
      <ExamsHeader />
      {examsUploadData.length > 0 ? (
        <ScrollArea className="h-130 w-full p-2">
          {examsUploadData.map((exam) => (
            <ExamsUploadCard
              key={exam.id}
              id={exam.id}
              title={exam.title}
              subject={exam.subject}
              teacher={exam.teacher}
              date={exam.date}
              numberOfQuestions={exam.numberOfQuestions}
              totalPoints={exam.totalPoints}
            />
          ))}
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      ) : (
        <div className="flex h-full w-full flex-col items-center justify-center gap-3 rounded-lg border p-4 text-center">
          <ClipboardCheck className="text-muted-foreground h-18 w-18" />
          <h1 className="text-muted-foreground text-lg font-semibold">
            Você não tem provas para serem enviadas.
          </h1>
        </div>
      )}
    </div>
  )
}
