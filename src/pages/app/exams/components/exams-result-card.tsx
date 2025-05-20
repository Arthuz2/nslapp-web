import { DialogTitle } from '@radix-ui/react-dialog'
import { Check, Eye, RefreshCcw, XCircle } from 'lucide-react'

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
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table'

export interface ExamsResultCardProps {
  title: string
  subject: string
  teacher: string
  date: string
  answerKey: Array<{
    numberOfQuestion: number
    answer: string
    answerStudent: string
  }>
  score: number
  totalPoints: number
  isVisible: boolean
  hasFiveAlternatives: boolean
}

export function ExamsResultCard({
  date,
  title,
  subject,
  teacher,
  answerKey,
  score,
  totalPoints,
  isVisible,
  hasFiveAlternatives,
}: ExamsResultCardProps) {
  const alternativesToShow = hasFiveAlternatives
    ? ['A', 'B', 'C', 'D', 'E']
    : ['A', 'B', 'C', 'D']

  return (
    <Card className="mb-2 border border-l-6 border-l-emerald-400 py-3 hover:opacity-90 md:py-6 dark:bg-gray-900">
      <div className="flex w-full items-center px-3 md:justify-between">
        <Check className="h-14 w-14 text-emerald-400 md:h-16 md:w-16" />
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
                  Resultado
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle className="text-foreground text-center text-2xl font-bold">
                    {title}
                  </DialogTitle>
                </DialogHeader>
                {isVisible ? (
                  <div className="flex w-full flex-col justify-center">
                    <div className="flex w-full items-center justify-between">
                      <h1 className="text-foreground text-lg font-semibold">
                        Acertos: {score}
                      </h1>
                      <h1 className="text-foreground text-lg font-semibold">
                        Porcentagem: {Math.round((score / totalPoints) * 100)}%
                        da prova
                      </h1>
                    </div>
                    <Table className="mt-4 w-full">
                      <TableBody>
                        {answerKey.map((question) => {
                          const acertou =
                            question.answer === question.answerStudent

                          return (
                            <TableRow key={question.numberOfQuestion}>
                              <TableCell className="text-foreground not-dark:border-foreground border text-center font-semibold">
                                {question.numberOfQuestion}
                              </TableCell>
                              {alternativesToShow.map((option) => {
                                let bg = ''

                                option === question.answer &&
                                  (bg = acertou
                                    ? 'bg-green-400 dark:bg-green-600'
                                    : 'bg-emerald-400 dark:bg-emerald-400')

                                !acertou &&
                                  option === question.answerStudent &&
                                  (bg = 'bg-red-400 dark:bg-red-700')

                                return (
                                  <TableCell
                                    key={option}
                                    className={`text-foreground not-dark:border-foreground border text-center font-semibold ${bg}`}
                                  >
                                    {option}
                                  </TableCell>
                                )
                              })}
                            </TableRow>
                          )
                        })}
                      </TableBody>
                    </Table>
                  </div>
                ) : (
                  <>
                    <div className="flex w-full flex-col items-center justify-center gap-3 p-4 text-center">
                      <XCircle className="h-18 w-18 text-red-400" />
                      <h1 className="text-foreground text-lg font-semibold">
                        Resultado indisponível
                      </h1>
                      <p className="text-foreground text-sm font-semibold">
                        O resultado dessa prova ainda não está disponível.
                      </p>
                      <p className="text-foreground text-sm font-semibold">
                        Aguarde a correção do professor.
                      </p>
                    </div>

                    <DialogFooter>
                      <Button
                        className="bg-input text-foreground w-full p-4 text-base font-bold hover:bg-gray-300 dark:bg-gray-800 dark:hover:bg-gray-800/50"
                        type="submit"
                      >
                        <RefreshCcw className="h-6 w-6" />
                        Recarregar
                      </Button>
                    </DialogFooter>
                  </>
                )}
              </DialogContent>
            </Dialog>
          </CardContent>
        </div>
      </div>
    </Card>
  )
}
