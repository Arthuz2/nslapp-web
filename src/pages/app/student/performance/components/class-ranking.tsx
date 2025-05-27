import { Award, Medal, Trophy } from 'lucide-react'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

const rankingData = [
  { position: 1, name: 'Maria Silva', grade: 9.2, isYou: false },
  { position: 2, name: 'João Santos', grade: 8.9, isYou: false },
  { position: 3, name: 'Arthur Porcino', grade: 8.2, isYou: true },
  { position: 4, name: 'Ana Costa', grade: 8.0, isYou: false },
  { position: 5, name: 'Pedro Lima', grade: 7.8, isYou: false },
  { position: 6, name: 'Carla Souza', grade: 7.6, isYou: false },
  { position: 7, name: 'Lucas Oliveira', grade: 7.4, isYou: false },
  { position: 8, name: 'Beatriz Alves', grade: 7.2, isYou: false },
]

const getPositionIcon = (position: number) => {
  switch (position) {
    case 1:
      return <Trophy className="h-5 w-5 text-yellow-500" />
    case 2:
      return <Medal className="h-5 w-5 text-gray-400" />
    case 3:
      return <Award className="h-5 w-5 text-amber-600" />
    default:
      return (
        <span className="text-muted-foreground text-lg font-bold">
          {position}º
        </span>
      )
  }
}

const getPositionColor = (position: number, isYou: boolean) => {
  if (isYou)
    return 'bg-blue-50 border-blue-200 dark:bg-blue-950 dark:border-blue-800'

  switch (position) {
    case 1:
      return 'bg-yellow-50 border-yellow-200 dark:bg-yellow-950 dark:border-yellow-800'
    case 2:
      return 'bg-gray-50 border-gray-200 dark:bg-gray-950 dark:border-gray-800'
    case 3:
      return 'bg-amber-50 border-amber-200 dark:bg-amber-950 dark:border-amber-800'
    default:
      return 'bg-muted/20 border-border'
  }
}

export function ClassRanking() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          🏆 Ranking da Turma
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {rankingData.map((student) => (
            <div
              key={student.position}
              className={`flex items-center justify-between rounded-lg border p-4 transition-all hover:shadow-md ${getPositionColor(student.position, student.isYou)}`}
            >
              <div className="flex items-center gap-4">
                <div className="flex h-10 w-10 items-center justify-center">
                  {getPositionIcon(student.position)}
                </div>

                <div>
                  <h3
                    className={`font-medium ${student.isYou ? 'font-bold text-blue-600' : ''}`}
                  >
                    {student.name} {student.isYou && '(Você)'}
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    {student.position}º lugar na turma
                  </p>
                </div>
              </div>

              <div className="text-right">
                <div
                  className={`text-xl font-bold ${student.grade >= 9 ? 'text-green-600' : student.grade >= 8 ? 'text-blue-600' : student.grade >= 7 ? 'text-yellow-600' : 'text-red-600'}`}
                >
                  {student.grade}
                </div>
                <p className="text-muted-foreground text-xs">média geral</p>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-muted/50 mt-6 rounded-lg p-4">
          <div className="flex items-center justify-between text-sm">
            <span className="font-medium">Sua posição:</span>
            <span className="font-bold text-blue-600">3º de 32 alunos</span>
          </div>
          <div className="mt-1 flex items-center justify-between text-sm">
            <span className="font-medium">Percentil:</span>
            <span className="font-bold text-green-600">Top 9%</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
