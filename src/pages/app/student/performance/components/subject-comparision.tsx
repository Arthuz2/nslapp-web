import { Target, TrendingDown, TrendingUp } from 'lucide-react'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

const subjectData = [
  {
    name: 'Matemática',
    currentGrade: 8.7,
    trend: 'up',
    color: 'bg-blue-500',
    classAverage: 7.2,
    goal: 9.0,
    evolution: [7.5, 8.0, 8.2, 8.5, 8.7],
    months: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai'],
    exams: [
      { name: 'Funções', grade: 8.5, date: '15/01' },
      { name: 'Logaritmos', grade: 9.0, date: '20/02' },
      { name: 'Trigonometria', grade: 8.5, date: '18/03' },
    ],
  },
  {
    name: 'Português',
    currentGrade: 7.8,
    trend: 'down',
    color: 'bg-green-500',
    classAverage: 7.5,
    goal: 8.5,
    evolution: [8.2, 8.0, 7.9, 7.8, 7.8],
    months: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai'],
    exams: [
      { name: 'Literatura', grade: 8.0, date: '12/01' },
      { name: 'Gramática', grade: 7.5, date: '25/02' },
      { name: 'Redação', grade: 8.0, date: '15/03' },
    ],
  },
  {
    name: 'História',
    currentGrade: 8.5,
    trend: 'up',
    color: 'bg-yellow-500',
    classAverage: 7.8,
    goal: 8.0,
    evolution: [7.8, 8.0, 8.2, 8.3, 8.5],
    months: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai'],
    exams: [
      { name: 'Brasil Colonial', grade: 8.5, date: '18/01' },
      { name: 'Império', grade: 8.0, date: '22/02' },
      { name: 'República', grade: 9.0, date: '20/03' },
    ],
  },
  {
    name: 'Geografia',
    currentGrade: 8.2,
    trend: 'stable',
    color: 'bg-purple-500',
    classAverage: 7.6,
    goal: 8.5,
    evolution: [8.0, 8.1, 8.2, 8.2, 8.2],
    months: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai'],
    exams: [
      { name: 'Geologia', grade: 8.0, date: '10/01' },
      { name: 'Clima', grade: 8.5, date: '14/02' },
      { name: 'População', grade: 8.0, date: '12/03' },
    ],
  },
  {
    name: 'Biologia',
    currentGrade: 9.0,
    trend: 'up',
    color: 'bg-red-500',
    classAverage: 8.1,
    goal: 9.0,
    evolution: [8.5, 8.7, 8.8, 8.9, 9.0],
    months: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai'],
    exams: [
      { name: 'Genética', grade: 9.0, date: '08/01' },
      { name: 'Evolução', grade: 9.5, date: '12/02' },
      { name: 'Ecologia', grade: 8.5, date: '16/03' },
    ],
  },
  {
    name: 'Física',
    currentGrade: 7.5,
    trend: 'down',
    color: 'bg-indigo-500',
    classAverage: 6.8,
    goal: 8.0,
    evolution: [8.0, 7.8, 7.6, 7.5, 7.5],
    months: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai'],
    exams: [
      { name: 'Mecânica', grade: 7.0, date: '25/01' },
      { name: 'Termodinâmica', grade: 8.0, date: '28/02' },
      { name: 'Óptica', grade: 7.5, date: '25/03' },
    ],
  },
  {
    name: 'Química',
    currentGrade: 8.3,
    trend: 'up',
    color: 'bg-pink-500',
    classAverage: 7.4,
    goal: 8.5,
    evolution: [7.8, 8.0, 8.1, 8.2, 8.3],
    months: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai'],
    exams: [
      { name: 'Orgânica', grade: 8.0, date: '20/01' },
      { name: 'Inorgânica', grade: 8.5, date: '24/02' },
      { name: 'Físico-Química', grade: 8.5, date: '22/03' },
    ],
  },
  {
    name: 'Inglês',
    currentGrade: 8.8,
    trend: 'up',
    color: 'bg-teal-500',
    classAverage: 8.0,
    goal: 9.0,
    evolution: [8.2, 8.4, 8.6, 8.7, 8.8],
    months: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai'],
    exams: [
      { name: 'Grammar', grade: 9.0, date: '16/01' },
      { name: 'Reading', grade: 8.5, date: '20/02' },
      { name: 'Writing', grade: 9.0, date: '18/03' },
    ],
  },
]

const getTrendIcon = (trend: string) => {
  switch (trend) {
    case 'up':
      return <TrendingUp className="h-4 w-4 text-green-600" />
    case 'down':
      return <TrendingDown className="h-4 w-4 text-red-600" />
    default:
      return <Target className="h-4 w-4 text-gray-600" />
  }
}

const getGradeColor = (grade: number) => {
  if (grade >= 9) return 'text-green-600'
  if (grade >= 8) return 'text-blue-600'
  if (grade >= 7) return 'text-yellow-600'
  return 'text-red-600'
}

const getGoalProgress = (current: number, goal: number) => {
  return Math.min((current / goal) * 100, 100)
}

export function SubjectComparison() {
  const sortedSubjects = [...subjectData].sort(
    (a, b) => b.currentGrade - a.currentGrade,
  )

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          📚 Desempenho por Disciplina
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="overview">Visão Geral</TabsTrigger>
            <TabsTrigger value="evolution">Evolução</TabsTrigger>
            <TabsTrigger value="exams">Avaliações</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              {sortedSubjects.map((subject, index) => (
                <div
                  key={subject.name}
                  className="hover:bg-muted/50 flex items-center justify-between rounded-lg border p-4 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="bg-muted flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold">
                      {index + 1}
                    </div>
                    <div>
                      <h3 className="font-medium">{subject.name}</h3>
                      <div className="flex items-center gap-2">
                        <span
                          className={`text-2xl font-bold ${getGradeColor(subject.currentGrade)}`}
                        >
                          {subject.currentGrade}
                        </span>
                        {getTrendIcon(subject.trend)}
                        <span className="text-muted-foreground text-sm">
                          vs {subject.classAverage} (turma)
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2 text-right">
                    <div className="text-muted-foreground text-sm">
                      Meta: {subject.goal}
                    </div>
                    <div className="w-20">
                      <div className="h-2 w-full rounded-full bg-gray-200">
                        <div
                          className={`${subject.color} h-2 rounded-full transition-all duration-500`}
                          style={{
                            width: `${getGoalProgress(subject.currentGrade, subject.goal)}%`,
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="evolution" className="space-y-4">
            <div className="grid gap-6 md:grid-cols-2">
              {sortedSubjects.slice(0, 6).map((subject) => (
                <div key={subject.name} className="rounded-lg border p-4">
                  <div className="mb-4 flex items-center justify-between">
                    <h3 className="font-medium">{subject.name}</h3>
                    <div className="flex items-center gap-1">
                      {getTrendIcon(subject.trend)}
                      <span
                        className={`font-bold ${getGradeColor(subject.currentGrade)}`}
                      >
                        {subject.currentGrade}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-3">
                    {subject.evolution.map((grade, index) => (
                      <div key={index} className="flex items-center gap-3">
                        <span className="w-8 text-sm font-medium">
                          {subject.months[index]}
                        </span>
                        <div className="h-2 flex-1 rounded-full bg-gray-200">
                          <div
                            className={`${subject.color} h-2 rounded-full transition-all duration-500`}
                            style={{ width: `${(grade / 10) * 100}%` }}
                          />
                        </div>
                        <span
                          className={`w-8 text-sm font-bold ${getGradeColor(grade)}`}
                        >
                          {grade}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-4 border-t pt-3">
                    <div className="text-muted-foreground flex justify-between text-xs">
                      <span>Progresso da meta:</span>
                      <span>
                        {Math.round(
                          getGoalProgress(subject.currentGrade, subject.goal),
                        )}
                        %
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="exams" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {sortedSubjects.map((subject) => (
                <div key={subject.name} className="rounded-lg border p-4">
                  <div className="mb-3 flex items-center justify-between">
                    <h3 className="font-medium">{subject.name}</h3>
                    <span
                      className={`text-lg font-bold ${getGradeColor(subject.currentGrade)}`}
                    >
                      {subject.currentGrade}
                    </span>
                  </div>

                  <div className="space-y-2">
                    {subject.exams.map((exam, index) => (
                      <div
                        key={index}
                        className="bg-muted/30 flex items-center justify-between rounded p-2"
                      >
                        <div>
                          <div className="text-sm font-medium">{exam.name}</div>
                          <div className="text-muted-foreground text-xs">
                            {exam.date}
                          </div>
                        </div>
                        <span
                          className={`font-bold ${getGradeColor(exam.grade)}`}
                        >
                          {exam.grade}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-3 border-t pt-2">
                    <div className="flex justify-between text-xs">
                      <span className="text-muted-foreground">Média:</span>
                      <span
                        className={`font-bold ${getGradeColor(subject.currentGrade)}`}
                      >
                        {subject.currentGrade}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
