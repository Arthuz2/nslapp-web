import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

const gradeData = [
  { month: 'Mar', grade: 7.5, classAverage: 7.2 },
  { month: 'Abr', grade: 8.0, classAverage: 7.4 },
  { month: 'Mai', grade: 7.8, classAverage: 7.3 },
  { month: 'Jun', grade: 8.5, classAverage: 7.6 },
  { month: 'Jul', grade: 8.2, classAverage: 7.5 },
  { month: 'Ago', grade: 8.7, classAverage: 7.8 },
]

export function GradeChart() {
  const maxGrade = 10

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          📈 Evolução das Notas
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {gradeData.map((data) => (
            <div key={data.month} className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="font-medium">{data.month}</span>
                <div className="flex gap-4">
                  <span className="text-blue-600">Você: {data.grade}</span>
                  <span className="text-gray-500">
                    Turma: {data.classAverage}
                  </span>
                </div>
              </div>

              <div className="space-y-1">
                {/* Sua nota */}
                <div className="flex items-center gap-2">
                  <div className="h-2 w-full rounded-full bg-gray-200">
                    <div
                      className="h-2 rounded-full bg-blue-600 transition-all duration-500"
                      style={{ width: `${(data.grade / maxGrade) * 100}%` }}
                    />
                  </div>
                </div>

                {/* Média da turma */}
                <div className="flex items-center gap-2">
                  <div className="h-1 w-full rounded-full bg-gray-200">
                    <div
                      className="h-1 rounded-full bg-gray-500 transition-all duration-500"
                      style={{
                        width: `${(data.classAverage / maxGrade) * 100}%`,
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 flex items-center justify-center gap-6 text-sm">
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-blue-600" />
            <span>Suas notas</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-gray-500" />
            <span>Média da turma</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
