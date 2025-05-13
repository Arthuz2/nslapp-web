import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import { CardScore } from '@/pages/app/home/components/card/card-score'

const scoreData = [
  {
    title: 'LINGUA PORTUGUESA',
    data: {
      trimester1: { score: '26/30', color: 'green' },
      trimester2: { score: '18/30', color: 'yellow' },
      trimester3: { score: '23/40', color: 'red' },
    },
  },
  {
    title: 'BIOLOGIA',
    data: {
      trimester1: { score: '26/30', color: 'green' },
      trimester2: { score: '26/30', color: 'green' },
      trimester3: { score: '24/40', color: 'yellow' },
    },
  },
  {
    title: 'MATEMÁTICA',
    data: {
      trimester1: { score: '26/30', color: 'green' },
      trimester2: { score: '28/30', color: 'green' },
      trimester3: { score: 'N/A', color: 'none' },
    },
  },
]

export function Score() {
  return (
    <div className="bg-card flex flex-1 flex-col gap-2 rounded-2xl border p-3 dark:bg-gray-950">
      <div className="flex gap-2">
        <span className="text-muted-foreground text-lg font-bold">Notas</span>
      </div>
      <ScrollArea className="h-112.5">
        <div className="flex h-full flex-1 flex-col items-center gap-3">
          {scoreData.map((subject, index) => (
            <CardScore key={index} title={subject.title} data={subject.data} />
          ))}
        </div>
        <ScrollBar orientation="vertical" />
      </ScrollArea>
    </div>
  )
}
