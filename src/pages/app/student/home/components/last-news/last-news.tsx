import { Bell } from 'lucide-react'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ScrollArea } from '@/components/ui/scroll-area'

import { CardNews } from '../card/card-news'

const newsData = [
  {
    id: 1,
    title: 'Culminância das Eletivas',
    content:
      'PAIS/RESPONSÁVEIS! Bom dia! ☀️ Hoje celebramos a CULMINÂNCIA DAS ELETIVAS DO 3º TRIMESTRE. 🎉 Convidamos às famílias para prestigiarem este importante momento. 🥰 Às 9h50, teremos a apresentação de uma belíssima CANTATA DE NATAL. 🎄 A visitação começa às 9h50 e vai até às 11h30. ✅ Esperamos todos vocês para abrilhantarem nosso momento! 🤩 Abraços! 🌹',
    date: '15/12/2023',
    time: '09:30',
    priority: 'high',
    category: 'Evento',
  },
  {
    id: 2,
    title: 'Recuperação Final',
    content:
      'Atenção alunos! As provas de recuperação final serão realizadas entre os dias 18 e 22 de dezembro. Consultem o cronograma no mural da escola ou no portal do aluno. Estudem bastante!',
    date: '12/12/2023',
    time: '14:20',
    priority: 'medium',
    category: 'Acadêmico',
  },
  {
    id: 3,
    title: 'Férias Escolares',
    content:
      'Informamos que as férias escolares terão início no dia 23 de dezembro. O retorno às aulas está previsto para o dia 05 de fevereiro de 2024. Desejamos a todos um excelente recesso!',
    date: '10/12/2023',
    time: '16:45',
    priority: 'low',
    category: 'Informativo',
  },
]

export function LastNews() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Bell className="h-5 w-5" />
          Últimas Notícias
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[300px]">
          <div className="space-y-3">
            {newsData.map((news) => (
              <CardNews news={news} key={news.id} />
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  )
}
