import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

const progressData = [
  { month: 'Jan', completed: 85, total: 100 },
  { month: 'Fev', completed: 92, total: 100 },
  { month: 'Mar', completed: 78, total: 100 },
  { month: 'Abr', completed: 95, total: 100 },
  { month: 'Mai', completed: 88, total: 100 },
  { month: 'Jun', completed: 90, total: 100 },
]

export function MonthlyProgress() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          🎯 Progresso Mensal
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {progressData.map((month) => {
            const percentage = (month.completed / month.total) * 100

            return (
              <div key={month.month} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-medium">{month.month}</span>
                  <span className="text-sm font-bold">
                    {month.completed}/{month.total} ({Math.round(percentage)}%)
                  </span>
                </div>

                <div className="relative">
                  <div className="h-4 w-full rounded-full bg-gray-200">
                    <div
                      className={`h-4 rounded-full transition-all duration-700 ${
                        percentage >= 90
                          ? 'bg-green-500'
                          : percentage >= 75
                            ? 'bg-yellow-500'
                            : 'bg-red-500'
                      }`}
                      style={{ width: `${percentage}%` }}
                    />
                  </div>

                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-xs font-medium text-white mix-blend-difference">
                      {Math.round(percentage)}%
                    </span>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        <div className="bg-muted/50 mt-6 rounded-lg p-4">
          <h4 className="mb-2 font-medium">Resumo do Semestre</h4>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-muted-foreground">Média de conclusão:</span>
              <span className="ml-2 font-bold text-blue-600">88%</span>
            </div>
            <div>
              <span className="text-muted-foreground">Melhor mês:</span>
              <span className="ml-2 font-bold text-green-600">Abril (95%)</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
