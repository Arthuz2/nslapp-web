import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ScrollArea } from '@/components/ui/scroll-area'

import { CardScore } from '../card/card-score'

const scoreData = [
  {
    title: 'LÍNGUA PORTUGUESA',
    data: {
      trimester1: { score: '26/30', color: 'green', percentage: 87 },
      trimester2: { score: '18/30', color: 'yellow', percentage: 60 },
      trimester3: { score: '23/40', color: 'red', percentage: 58 },
    },
    trend: 'down',
  },
  {
    title: 'BIOLOGIA',
    data: {
      trimester1: { score: '26/30', color: 'green', percentage: 87 },
      trimester2: { score: '26/30', color: 'green', percentage: 87 },
      trimester3: { score: '24/40', color: 'yellow', percentage: 60 },
    },
    trend: 'down',
  },
  {
    title: 'MATEMÁTICA',
    data: {
      trimester1: { score: '26/30', color: 'green', percentage: 87 },
      trimester2: { score: '28/30', color: 'green', percentage: 93 },
      trimester3: { score: 'N/A', color: 'none', percentage: 0 },
    },
    trend: 'up',
  },
]

export function Score() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          📊 Desempenho por Disciplina
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[400px]">
          <div className="space-y-4">
            {scoreData.map((subject, i) => (
              <CardScore subject={subject} key={i} />
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  )
}
