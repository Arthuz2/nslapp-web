import { DialogTitle } from '@radix-ui/react-dialog'
import { Eye, Pencil, TriangleAlert } from 'lucide-react'
import { Link } from 'react-router-dom'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
} from '@/components/ui/dialog'

interface ExamsUploadCardProps {
  id: number
  title: string
  subject: string
  teacher: string
  date: string
  numberOfQuestions: number
  totalPoints: number
}

export function ExamsUploadCard({
  id,
  date,
  title,
  subject,
  teacher,
  numberOfQuestions,
  totalPoints,
}: ExamsUploadCardProps) {
  return (
    <Card className="mb-2 border border-l-6 border-l-amber-400 py-3 hover:opacity-90 md:py-6 dark:bg-gray-900">
      <div className="flex w-full items-center px-3 md:justify-between">
        <TriangleAlert className="h-14 w-14 text-amber-400 md:h-16 md:w-16" />
        <div className="flex gap-2 not-md:flex-col md:w-full md:items-center md:justify-between">
          <CardHeader>
            <CardTitle className="text-foreground font-bold text-nowrap md:text-lg">
              {title}
            </CardTitle>
            <CardDescription className="text-foreground flex flex-col text-sm font-semibold text-nowrap">
              <span>{subject}</span>
              <span>{teacher}</span>
              <span>Data: {date}</span>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Dialog>
              <DialogTrigger asChild>
                <Button className="bg-input text-foreground p-4 text-base font-bold hover:bg-gray-300 dark:bg-gray-800 dark:hover:bg-gray-800/50">
                  <Eye className="h-6 w-6" />
                  Visualizar
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle className="text-foreground text-2xl font-bold">
                    Prova Avaliativa
                  </DialogTitle>
                </DialogHeader>
                <div className="flex w-full flex-col justify-center">
                  <p className="text-foreground text-base font-normal">
                    <span className="text-foreground text-lg font-semibold">
                      Disciplina
                    </span>
                    : {subject}
                  </p>
                  <p className="text-foreground text-base font-normal">
                    <span className="text-foreground text-lg font-semibold">
                      Professor
                    </span>
                    : {teacher}
                  </p>
                  <p className="text-foreground text-base font-normal">
                    <span className="text-foreground text-lg font-semibold">
                      Data
                    </span>
                    : {date}
                  </p>
                  <p className="text-foreground text-base font-normal">
                    <span className="text-foreground text-lg font-semibold">
                      Valor
                    </span>
                    : {totalPoints} pontos
                  </p>
                  <p className="text-foreground text-base font-normal">
                    <span className="text-foreground text-lg font-semibold">
                      Questões
                    </span>
                    : {numberOfQuestions}
                  </p>
                </div>
                <DialogFooter>
                  <Link to={`/provas/lancar/${id}`}>
                    <Button
                      className="bg-input text-foreground p-4 text-base font-bold hover:bg-gray-300 dark:bg-gray-800 dark:hover:bg-gray-800/50"
                      type="submit"
                    >
                      <Pencil className="h-6 w-6" />
                      Enviar Gabarito
                    </Button>
                  </Link>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </CardContent>
        </div>
      </div>
    </Card>
  )
}
