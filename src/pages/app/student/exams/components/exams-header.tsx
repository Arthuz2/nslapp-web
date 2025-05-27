import { BookOpen } from 'lucide-react'

export function ExamsHeader() {
  return (
    <div className="flex items-center gap-3">
      <BookOpen className="h-8 w-8 text-blue-600" />
      <div>
        <h1 className="text-3xl font-bold">Minhas Provas</h1>
        <p className="text-muted-foreground">
          Responda suas avaliações e acompanhe seus resultados
        </p>
      </div>
    </div>
  )
}
