import { AlertTriangle, CheckCircle, LoaderCircle } from 'lucide-react'
import type React from 'react'
import { useState } from 'react'
import { toast } from 'sonner'

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
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

interface Exam {
  id: number
  title: string
  subject: string
  teacher: string
  totalQuestions: number
  hasFiveAlternatives: boolean
}

interface ExamAnswerSheetProps {
  exam: Exam
  children: React.ReactNode
}

type Answer = {
  questionNumber: number
  selectedAnswer: string
}

export function ExamAnswerSheet({ exam, children }: ExamAnswerSheetProps) {
  const [open, setOpen] = useState(false)
  const [answers, setAnswers] = useState<Answer[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showConfirmDialog, setShowConfirmDialog] = useState(false)

  const alternatives = exam.hasFiveAlternatives
    ? ['A', 'B', 'C', 'D', 'E']
    : ['A', 'B', 'C', 'D']

  const handleAnswerSelect = (
    questionNumber: number,
    selectedAnswer: string,
  ) => {
    setAnswers((prev) => {
      const filtered = prev.filter((a) => a.questionNumber !== questionNumber)
      return [...filtered, { questionNumber, selectedAnswer }]
    })
  }

  const getSelectedAnswer = (questionNumber: number) => {
    return answers.find((a) => a.questionNumber === questionNumber)
      ?.selectedAnswer
  }

  const isAllAnswered = answers.length === exam.totalQuestions

  const handleSubmit = async () => {
    if (!isAllAnswered) {
      toast.error('Por favor, responda todas as questões antes de enviar!', {
        richColors: true,
      })
      return
    }

    setIsSubmitting(true)

    // Simular envio
    await new Promise((resolve) => setTimeout(resolve, 2000))

    toast.success('Gabarito enviado com sucesso!', {
      description: 'Sua prova foi enviada para correção.',
      richColors: true,
    })

    setIsSubmitting(false)
    setShowConfirmDialog(false)
    setOpen(false)
    setAnswers([])
  }

  const resetAnswers = () => {
    setAnswers([])
  }

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>{children}</DialogTrigger>
        <DialogContent className="max-h-[90vh] max-w-4xl overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-xl">{exam.title}</DialogTitle>
            <DialogDescription>
              {exam.subject} • {exam.teacher} • {exam.totalQuestions} questões
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div className="flex items-center justify-between rounded-lg bg-blue-50 p-3 dark:bg-blue-950">
              <div className="text-sm">
                <span className="font-medium">Progresso: </span>
                <span
                  className={
                    isAllAnswered ? 'font-bold text-green-600' : 'text-blue-600'
                  }
                >
                  {answers.length}/{exam.totalQuestions} questões respondidas
                </span>
              </div>
              <Button variant="outline" size="sm" onClick={resetAnswers}>
                Limpar Respostas
              </Button>
            </div>

            <div className="rounded-lg border">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/50">
                    <TableCell className="w-16 text-center font-semibold">
                      #
                    </TableCell>
                    {alternatives.map((alt) => (
                      <TableCell
                        key={alt}
                        className="min-w-[60px] text-center font-semibold"
                      >
                        {alt}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {Array.from({ length: exam.totalQuestions }, (_, index) => {
                    const questionNumber = index + 1
                    const selectedAnswer = getSelectedAnswer(questionNumber)

                    return (
                      <TableRow key={questionNumber}>
                        <TableCell className="text-center font-medium">
                          {questionNumber}
                        </TableCell>
                        {alternatives.map((alt) => (
                          <TableCell key={alt} className="text-center">
                            <Button
                              variant={
                                selectedAnswer === alt ? 'default' : 'outline'
                              }
                              size="sm"
                              className={`h-10 w-10 rounded-full ${
                                selectedAnswer === alt
                                  ? 'bg-blue-600 text-white hover:bg-blue-700'
                                  : 'hover:bg-blue-50 dark:hover:bg-blue-950'
                              }`}
                              onClick={() =>
                                handleAnswerSelect(questionNumber, alt)
                              }
                            >
                              {alt}
                            </Button>
                          </TableCell>
                        ))}
                      </TableRow>
                    )
                  })}
                </TableBody>
              </Table>
            </div>

            <div className="bg-muted/50 flex items-center justify-between rounded-lg p-3">
              <div className="flex items-center gap-2">
                {isAllAnswered ? (
                  <CheckCircle className="h-5 w-5 text-green-600" />
                ) : (
                  <AlertTriangle className="h-5 w-5 text-yellow-600" />
                )}
                <span className="text-sm font-medium">
                  {isAllAnswered
                    ? 'Todas as questões foram respondidas!'
                    : `Faltam ${exam.totalQuestions - answers.length} questões`}
                </span>
              </div>

              <Button
                onClick={() => setShowConfirmDialog(true)}
                disabled={!isAllAnswered}
                className="bg-green-600 hover:bg-green-700"
              >
                Enviar Gabarito
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Confirmation Dialog */}
      <Dialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-orange-600">
              <AlertTriangle className="h-5 w-5" />
              Confirmar Envio
            </DialogTitle>
            <DialogDescription>
              Tem certeza de que deseja enviar seu gabarito? Após o envio, não
              será possível fazer alterações.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-3">
            <div className="bg-muted/50 rounded-lg p-3">
              <h4 className="mb-2 font-medium">Resumo das Respostas:</h4>
              <div className="grid grid-cols-5 gap-2 text-sm">
                {Array.from({ length: exam.totalQuestions }, (_, index) => {
                  const questionNumber = index + 1
                  const answer = getSelectedAnswer(questionNumber)
                  return (
                    <div key={questionNumber} className="text-center">
                      <span className="text-muted-foreground">
                        {questionNumber}:
                      </span>
                      <span className="ml-1 font-bold text-blue-600">
                        {answer}
                      </span>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowConfirmDialog(false)}
            >
              Cancelar
            </Button>
            <Button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="bg-green-600 hover:bg-green-700"
            >
              {isSubmitting ? (
                <>
                  <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
                  Enviando...
                </>
              ) : (
                'Confirmar Envio'
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
