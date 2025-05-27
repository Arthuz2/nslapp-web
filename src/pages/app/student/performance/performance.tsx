import { Award, BarChart3, TrendingUp, Users } from 'lucide-react'

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

import { AttendanceChart } from './components/attendance-chart'
import { ClassRanking } from './components/class-ranking'
import { GradeChart } from './components/grade-chart'
import { MonthlyProgress } from './components/monthly-progress'
import { PerformanceOverview } from './components/performance-overview'
import { SubjectComparison } from './components/subject-comparision'

export function Performance() {
  return (
    <div className="space-y-6 p-4 md:p-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <BarChart3 className="h-8 w-8 text-blue-600" />
        <div>
          <h1 className="text-3xl font-bold">Desempenho Acadêmico</h1>
          <p className="text-muted-foreground">
            Acompanhe sua evolução e estatísticas
          </p>
        </div>
      </div>

      {/* Overview Cards */}
      <PerformanceOverview />

      {/* Main Content */}
      <Tabs defaultValue="grades" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="grades" className="flex items-center gap-2">
            <BarChart3 className="h-4 w-4" />
            <span className="hidden sm:inline">Notas</span>
          </TabsTrigger>
          <TabsTrigger value="subjects" className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4" />
            <span className="hidden sm:inline">Disciplinas</span>
          </TabsTrigger>
          <TabsTrigger value="ranking" className="flex items-center gap-2">
            <Award className="h-4 w-4" />
            <span className="hidden sm:inline">Ranking</span>
          </TabsTrigger>
          <TabsTrigger value="attendance" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            <span className="hidden sm:inline">Frequência</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="grades" className="space-y-6">
          <div className="grid gap-6 lg:grid-cols-2">
            <GradeChart />
            <MonthlyProgress />
          </div>
        </TabsContent>

        <TabsContent value="subjects" className="space-y-6">
          <SubjectComparison />
        </TabsContent>

        <TabsContent value="ranking" className="space-y-6">
          <ClassRanking />
        </TabsContent>

        <TabsContent value="attendance" className="space-y-6">
          <AttendanceChart />
        </TabsContent>
      </Tabs>
    </div>
  )
}
