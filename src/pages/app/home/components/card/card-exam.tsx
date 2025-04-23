import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

interface CardExamProps {
  title: string
  score: string
  color: string
  badge?: string
}

const colorMap: Record<string, string> = {
  red: 'text-red-500',
  green: 'text-green-500',
  yellow: 'text-yellow-500',
}

export function CardExam({ title, score, color, badge }: CardExamProps) {
  return (
    <Card className="w-full max-w-90 rounded-2xl border dark:bg-slate-950">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center justify-between">
          <span>{title}</span>
          {badge && (
            <span className="text-muted-foreground text-lg">{badge}</span>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-1 items-center justify-center">
        <span className={`text-lg ${colorMap[color]}`}>{score}</span>
      </CardContent>
    </Card>
  )
}
