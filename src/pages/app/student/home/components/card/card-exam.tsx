import { Clock } from 'lucide-react'

interface ExamProps {
  title: string
  score: string
  percentage: number
  color: string
  badge: string
  date: string
  difficulty: string
}

interface CardExamProps {
  exam: ExamProps
}

const colorMap: Record<string, string> = {
  red: 'text-red-500 bg-red-50 border-red-200 dark:bg-red-950 dark:border-red-800',
  green:
    'text-green-500 bg-green-50 border-green-200 dark:bg-green-950 dark:border-green-800',
  yellow:
    'text-yellow-500 bg-yellow-50 border-yellow-200 dark:bg-yellow-950 dark:border-yellow-800',
}

export function CardExam({ exam }: CardExamProps) {
  return (
    <div
      className={`rounded-lg border p-4 transition-all hover:shadow-md ${colorMap[exam.color]}`}
    >
      <div className="mb-2 flex items-start justify-between">
        <div className="flex-1">
          <h3 className="mb-1 text-sm font-semibold">{exam.title}</h3>
          <div className="text-muted-foreground flex items-center gap-2 text-xs">
            <Clock className="h-3 w-3" />
            <span>{exam.date}</span>
            <span>•</span>
            <span>{exam.difficulty}</span>
          </div>
        </div>
        <div className="text-right">
          <div className="mb-1 text-2xl">{exam.badge}</div>
          <div
            className={`text-lg font-bold ${exam.color === 'red' ? 'text-red-600' : exam.color === 'green' ? 'text-green-600' : 'text-yellow-600'}`}
          >
            {exam.score}
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex justify-between text-xs">
          <span>Aproveitamento</span>
          <span className="font-medium">{exam.percentage}%</span>
        </div>
        <div className="h-2 w-full rounded-full bg-gray-200">
          <div
            className={`h-2 rounded-full transition-all ${
              exam.color === 'green'
                ? 'bg-green-500'
                : exam.color === 'yellow'
                  ? 'bg-yellow-500'
                  : 'bg-red-500'
            }`}
            style={{ width: `${exam.percentage}%` }}
          ></div>
        </div>
      </div>
    </div>
  )
}
