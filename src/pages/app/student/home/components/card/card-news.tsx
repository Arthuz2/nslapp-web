import { Clock } from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'

interface NewsProps {
  id: number
  title: string
  content: string
  date: string
  time: string
  priority: string
  category: string
}

interface CardNewsProps {
  news: NewsProps
}

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case 'high':
      return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
    case 'medium':
      return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
    case 'low':
      return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
    default:
      return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
  }
}

const getPriorityIcon = (priority: string) => {
  switch (priority) {
    case 'high':
      return '🔴'
    case 'medium':
      return '🟡'
    case 'low':
      return '🔵'
    default:
      return '⚪'
  }
}

export function CardNews({ news }: CardNewsProps) {
  return (
    <div className="hover:bg-muted/50 rounded-lg border p-3 transition-colors">
      <div className="flex items-start gap-3">
        <div className="text-xl">{getPriorityIcon(news.priority)}</div>
        <div className="flex-1 space-y-2">
          <div className="flex items-start justify-between">
            <h3 className="line-clamp-2 text-sm font-medium">{news.title}</h3>
            <span
              className={`ml-2 rounded-full px-2 py-1 text-xs font-medium ${getPriorityColor(news.priority)}`}
            >
              {news.category}
            </span>
          </div>

          <p className="text-muted-foreground line-clamp-2 text-xs">
            {news.content}
          </p>

          <div className="flex items-center justify-between">
            <div className="text-muted-foreground flex items-center gap-2 text-xs">
              <Clock className="h-3 w-3" />
              <span>
                {news.date} às {news.time}
              </span>
            </div>

            <Dialog>
              <DialogTrigger asChild>
                <Button variant="ghost" size="sm" className="h-6 text-xs">
                  Ler mais
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-md">
                <DialogHeader>
                  <DialogTitle className="flex items-center gap-2">
                    {getPriorityIcon(news.priority)}
                    {news.title}
                  </DialogTitle>
                  <DialogDescription className="flex items-center gap-2">
                    <Clock className="h-3 w-3" />
                    {news.date} às {news.time}
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter className="text-left">
                  <p className="text-sm">{news.content}</p>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>
    </div>
  )
}
