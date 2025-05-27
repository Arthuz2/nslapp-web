import { TrendingDown, TrendingUp } from 'lucide-react'

interface SubjectProps {
  title: string
  data: {
    trimester1: {
      score: string
      color: string
      percentage: number
    }
    trimester2: {
      score: string
      color: string
      percentage: number
    }
    trimester3: {
      score: string
      color: string
      percentage: number
    }
  }
  trend: string
}

interface CardScoreProps {
  subject: SubjectProps
}

const colorMap: Record<string, string> = {
  red: 'text-red-500',
  green: 'text-green-500',
  yellow: 'text-yellow-500',
  none: 'text-muted-foreground',
}

export function CardScore({ subject }: CardScoreProps) {
  return (
    <div className="hover:bg-muted/40 bg-muted/20 rounded-lg border p-4 transition-colors">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="text-sm font-semibold">{subject.title}</h3>
        {subject.trend === 'up' ? (
          <TrendingUp className="h-4 w-4 text-green-500" />
        ) : (
          <TrendingDown className="h-4 w-4 text-red-500" />
        )}
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="text-center">
          <p className="text-muted-foreground mb-1 text-xs">1º Trim</p>
          <p className={`font-bold ${colorMap[subject.data.trimester1.color]}`}>
            {subject.data.trimester1.score}
          </p>
          <div className="mt-1 h-1.5 w-full rounded-full bg-gray-200">
            <div
              className="h-1.5 rounded-full bg-blue-600 transition-all"
              style={{
                width: `${subject.data.trimester1.percentage}%`,
              }}
            ></div>
          </div>
        </div>

        <div className="text-center">
          <p className="text-muted-foreground mb-1 text-xs">2º Trim</p>
          <p className={`font-bold ${colorMap[subject.data.trimester2.color]}`}>
            {subject.data.trimester2.score}
          </p>
          <div className="mt-1 h-1.5 w-full rounded-full bg-gray-200">
            <div
              className="h-1.5 rounded-full bg-blue-600 transition-all"
              style={{
                width: `${subject.data.trimester2.percentage}%`,
              }}
            ></div>
          </div>
        </div>

        <div className="text-center">
          <p className="text-muted-foreground mb-1 text-xs">3º Trim</p>
          <p className={`font-bold ${colorMap[subject.data.trimester3.color]}`}>
            {subject.data.trimester3.score}
          </p>
          <div className="mt-1 h-1.5 w-full rounded-full bg-gray-200">
            <div
              className="h-1.5 rounded-full bg-blue-600 transition-all"
              style={{
                width: `${subject.data.trimester3.percentage}%`,
              }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  )
}
