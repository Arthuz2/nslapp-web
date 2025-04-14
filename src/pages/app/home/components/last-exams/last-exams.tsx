import { CardExam } from '@/components/card/card-exam'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'

const examsData = [
  {
    title: 'LINGUA PORTUGUESA',
    score: '5/12',
    color: 'red',
    badge: '❌',
  },
  {
    title: 'BIOLOGIA',
    score: '7/10',
    color: 'yellow',
    badge: '',
  },
  {
    title: 'MATEMÁTICA',
    score: '10/10',
    color: 'green',
    badge: '🥇',
  },
]

export function LastExams() {
  return (
    <div className="bg-card flex flex-1 flex-col gap-2 rounded-2xl border p-3 dark:bg-slate-950">
      <div className="flex gap-2">
        <span className="text-muted-foreground text-lg font-bold">
          Últimas Provas Realizadas
        </span>
      </div>
      <ScrollArea className="h-112.5">
        <div className="flex h-full flex-1 flex-col items-center gap-3">
          {examsData.map((exam, index) => (
            <CardExam
              key={index}
              title={exam.title}
              score={exam.score}
              color={exam.color}
              badge={exam.badge}
            />
          ))}
        </div>
        <ScrollBar orientation="vertical" />
      </ScrollArea>
    </div>
  )
}
