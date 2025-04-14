import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

interface CardExamProps {
  title: string
  score: string
  color: string
  badge?: string
}

export function CardExam({ title, score, color, badge }: CardExamProps) {
  return (
    <Card className="bg-card w-full max-w-90 rounded-2xl border dark:bg-slate-950">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center justify-between">
          <span>{title}</span>
          {badge && (
            <span className="text-muted-foreground text-lg">{badge}</span>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex h-full w-full items-center justify-center gap-1">
          <div className="flex flex-1 flex-col items-center justify-center gap-2">
            <span className={`text-lg text-${color}-500`}>{score}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
