import { CardNews } from '@/components/card/card-news'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'

const newsData = [
  {
    title: 'Culminância das Eletivas',
    content:
      'PAIS/RESPONSÁVEIS! Bom dia! ☀️ Hoje celebramos a CULMINÂNCIA DAS ELETIVAS DO 3º TRIMESTRE. 🎉 Convidamos às famílias para prestigiarem este importante momento. 🥰 Às 9h50, teremos a apresentação de uma belíssima CANTATA DE NATAL. 🎄 A visitação começa às 9h50 e vai até às 11h30. ✅ Esperamos todos vocês para abrilhantarem nosso momento! 🤩 Abraços! 🌹',
    date: '15/12/2023',
  },
  {
    title: 'Recuperação Final',
    content:
      'Atenção alunos! As provas de recuperação final serão realizadas entre os dias 18 e 22 de dezembro. Consultem o cronograma no mural da escola ou no portal do aluno. Estudem bastante!',
    date: '12/12/2023',
  },
  {
    title: 'Férias Escolares',
    content:
      'Informamos que as férias escolares terão início no dia 23 de dezembro. O retorno às aulas está previsto para o dia 05 de fevereiro de 2024. Desejamos a todos um excelente recesso!',
    date: '10/12/2023',
  },
]

export function LastNews() {
  return (
    <div className="bg-card flex flex-1 flex-col gap-2 rounded-2xl border p-3 dark:bg-slate-950">
      <div className="flex gap-2">
        <span className="text-muted-foreground text-lg font-bold">
          Últimas Notícias
        </span>
      </div>
      <ScrollArea className="h-112.5">
        <div className="flex h-full flex-1 flex-col items-center gap-3">
          {newsData.map((news, index) => (
            <CardNews
              key={index}
              title={news.title}
              content={news.content}
              date={news.date}
            />
          ))}
        </div>
        <ScrollBar orientation="vertical" />
      </ScrollArea>
    </div>
  )
}
