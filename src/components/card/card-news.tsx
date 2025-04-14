import { AlertCircle } from 'lucide-react'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

import { Button } from '../ui/button'

interface CardNewsProps {
  title: string
  content: string
  date?: string
}

export function CardNews({ title, content, date }: CardNewsProps) {
  return (
    <Card className="bg-card w-full max-w-90 rounded-2xl border dark:bg-slate-950">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center justify-between">
          <div className="flex items-center gap-2">
            <AlertCircle className="h-5 w-5" />
            <span>{title}</span>
          </div>
          {date && (
            <span className="text-muted-foreground text-sm">{date}</span>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-foreground text-sm">
          <p className="line-clamp-6">{content}</p>
          {content.length > 150 && (
            <Button className="text-primary mt-2 bg-transparent text-sm font-medium hover:bg-transparent hover:underline">
              Ler mais
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
