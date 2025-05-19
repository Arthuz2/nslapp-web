import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

interface ScoreData {
  trimester1: {
    score: string
    color: string
  }
  trimester2: {
    score: string
    color: string
  }
  trimester3: {
    score: string
    color: string
  }
}

interface CardScoreProps {
  title: string
  data: ScoreData
}

const colorMap: Record<string, string> = {
  red: 'text-red-500',
  green: 'text-green-500',
  yellow: 'text-yellow-500',
  none: 'text-muted-foreground',
}

export function CardScore({ title, data }: CardScoreProps) {
  return (
    <Card className="bg-card w-full max-w-90 rounded-2xl border dark:bg-slate-950">
      <CardHeader>
        <CardTitle className="text-foreground">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex h-full w-full items-center justify-center gap-1">
          <div className="flex flex-1 flex-col items-center justify-center gap-2 text-nowrap">
            <span className="text-foreground text-lg">1º Trim</span>
            <span className={`text-lg ${colorMap[data.trimester1.color]}`}>
              {data.trimester1.score}
            </span>
          </div>
          <div className="flex flex-1 flex-col items-center justify-center gap-2 text-nowrap">
            <span className="text-foreground text-lg">2º Trim</span>
            <span className={`text-lg ${colorMap[data.trimester2.color]}`}>
              {data.trimester2.score}
            </span>
          </div>
          <div className="flex flex-1 flex-col items-center justify-center gap-2 text-nowrap">
            <span className="text-foreground text-lg">3º Trim</span>
            <span className={`text-lg ${colorMap[data.trimester3.color]}`}>
              {data.trimester3.score}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
