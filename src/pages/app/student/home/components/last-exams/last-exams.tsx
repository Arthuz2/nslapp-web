import { Award } from 'lucide-react'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ScrollArea } from '@/components/ui/scroll-area'

import { CardExam } from '../card/card-exam'

const examsData = [
  {
    title: 'LÍNGUA PORTUGUESA',
    score: '5/12',
    percentage: 42,
    color: 'red',
    badge: '❌',
    date: '10/01/2024',
    difficulty: 'Difícil',
  },
  {
    title: 'BIOLOGIA',
    score: '7/10',
    percentage: 70,
    color: 'yellow',
    badge: '⚠️',
    date: '08/01/2024',
    difficulty: 'Médio',
  },
  {
    title: 'MATEMÁTICA',
    score: '10/10',
    percentage: 100,
    color: 'green',
    badge: '🥇',
    date: '05/01/2024',
    difficulty: 'Fácil',
  },
]

export function LastExams() {
  const sortedExams = [...examsData].sort((a, b) => b.percentage - a.percentage)

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Award className="h-5 w-5" />
          Últimas Provas Realizadas
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[300px]">
          <div className="space-y-3">
            {sortedExams.map((exam, i) => (
              <CardExam exam={exam} key={i} />
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  )
}
