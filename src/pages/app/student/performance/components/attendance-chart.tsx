import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

const attendanceData = [
  { month: 'Janeiro', present: 20, total: 22, percentage: 91 },
  { month: 'Fevereiro', present: 18, total: 20, percentage: 90 },
  { month: 'Março', present: 21, total: 23, percentage: 91 },
  { month: 'Abril', present: 19, total: 20, percentage: 95 },
  { month: 'Maio', present: 22, total: 23, percentage: 96 },
  { month: 'Junho', present: 20, total: 21, percentage: 95 },
]

const getAttendanceColor = (percentage: number) => {
  if (percentage >= 95) return 'text-green-600'
  if (percentage >= 90) return 'text-yellow-600'
  return 'text-red-600'
}

const getAttendanceBarColor = (percentage: number) => {
  if (percentage >= 95) return 'bg-green-500'
  if (percentage >= 90) return 'bg-yellow-500'
  return 'bg-red-500'
}

export function AttendanceChart() {
  const totalPresent = attendanceData.reduce(
    (sum, month) => sum + month.present,
    0,
  )
  const totalDays = attendanceData.reduce((sum, month) => sum + month.total, 0)
  const overallPercentage = Math.round((totalPresent / totalDays) * 100)

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          📅 Frequência Escolar
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="bg-muted/50 mb-6 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold">Frequência Geral</h3>
              <p className="text-muted-foreground text-sm">
                {totalPresent} de {totalDays} dias letivos
              </p>
            </div>
            <div
              className={`text-3xl font-bold ${getAttendanceColor(overallPercentage)}`}
            >
              {overallPercentage}%
            </div>
          </div>

          <div className="mt-3 h-3 w-full rounded-full bg-gray-200">
            <div
              className={`h-3 rounded-full transition-all duration-500 ${getAttendanceBarColor(overallPercentage)}`}
              style={{ width: `${overallPercentage}%` }}
            />
          </div>
        </div>

        <div className="space-y-4">
          <h4 className="text-muted-foreground font-medium">
            Frequência por Mês
          </h4>

          {attendanceData.map((month) => (
            <div key={month.month} className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-medium">{month.month}</span>
                <div className="flex items-center gap-2">
                  <span className="text-muted-foreground text-sm">
                    {month.present}/{month.total}
                  </span>
                  <span
                    className={`font-bold ${getAttendanceColor(month.percentage)}`}
                  >
                    {month.percentage}%
                  </span>
                </div>
              </div>

              <div className="h-2 w-full rounded-full bg-gray-200">
                <div
                  className={`h-2 rounded-full transition-all duration-500 ${getAttendanceBarColor(month.percentage)}`}
                  style={{ width: `${month.percentage}%` }}
                />
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 grid grid-cols-3 gap-4 text-center">
          <div className="rounded-lg bg-green-50 p-3 dark:bg-green-950">
            <div className="text-2xl font-bold text-green-600">4</div>
            <div className="text-muted-foreground text-xs">Meses com +95%</div>
          </div>
          <div className="rounded-lg bg-yellow-50 p-3 dark:bg-yellow-950">
            <div className="text-2xl font-bold text-yellow-600">2</div>
            <div className="text-muted-foreground text-xs">
              Meses com 90-94%
            </div>
          </div>
          <div className="rounded-lg bg-red-50 p-3 dark:bg-red-950">
            <div className="text-2xl font-bold text-red-600">0</div>
            <div className="text-muted-foreground text-xs">Meses com -90%</div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
