import { AlertTriangle, LoaderCircle } from 'lucide-react'
import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
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

const mockExams = [
  {
    id: 1,
    title: '1° Prova de Matemática',
    numberOfQuestions: 10,
    hasFiveAlternatives: false,
  },
  {
    id: 2,
    title: '1° Prova de História',
    numberOfQuestions: 13,
    hasFiveAlternatives: true,
  },
]

type AnswersType = {
  numberOfQuestion: number
  answer: string
}

export function ExamsAnswerKeyUpload() {
  const { id } = useParams()
  const navigate = useNavigate()
  const exam = mockExams.find((exam) => exam.id === Number(id))
  const { numberOfQuestions, hasFiveAlternatives } = exam || {
    numberOfQuestions: 0,
    hasFiveAlternatives: false,
  }

  const alternatives = hasFiveAlternatives
    ? ['A', 'B', 'C', 'D', 'E']
    : ['A', 'B', 'C', 'D']

  const [answers, setAnswers] = useState<AnswersType[]>([])
  const [dialogOpen, setDialogOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  function handleSelect(questionIndex: number, alternative: string) {
    setAnswers((prev) => {
      const updated = prev.filter(
        (a) => a.numberOfQuestion !== questionIndex + 1,
      )
      return [
        ...updated,
        { numberOfQuestion: questionIndex + 1, answer: alternative },
      ]
    })
  }

  async function handleConfirmSubmit() {
    setIsSubmitting(true)
    const allAnswered = answers.length === numberOfQuestions
    await new Promise((resolve) => setTimeout(resolve, 2000))

    if (!allAnswered) {
      toast.error('Por Favor, preencha todas as questões do gabarito!', {
        richColors: true,
      })
      setIsSubmitting(false)
      await new Promise((resolve) => setTimeout(resolve, 2000))
      setDialogOpen(false)
      return
    }

    console.log('Respostas enviadas:', answers)
    toast.success('Gabarito enviado com sucesso!', {
      richColors: true,
    })
    navigate('/provas/resultados')
  }

  const getAnswerForQuestion = (index: number) =>
    answers.find((a) => a.numberOfQuestion === index + 1)?.answer

  return (
    <div className="flex h-full w-full flex-col items-center gap-6 p-6">
      <h1 className="text-foreground text-3xl font-bold">Lançar Gabarito</h1>
      <h2 className="text-foreground text-xl font-semibold">{exam?.title}</h2>

      <Table className="rounded-md border">
        <TableHeader>
          <TableRow className="text-foreground text-lg font-semibold">
            <TableCell className="w-20 text-center">#</TableCell>
            {alternatives.map((alt) => (
              <TableCell key={alt} className="text-center">
                {alt}
              </TableCell>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {Array.from({ length: numberOfQuestions }, (_, index) => (
            <TableRow key={index} className="text-center">
              <TableCell className="text-lg font-semibold">
                {index + 1}
              </TableCell>
              {alternatives.map((alt) => {
                const selected = getAnswerForQuestion(index) === alt
                return (
                  <TableCell key={alt}>
                    <Button
                      onClick={() => handleSelect(index, alt)}
                      className={`h-10 w-10 rounded-md border-2 bg-inherit font-bold transition-colors ${
                        selected
                          ? 'border-indigo-500 bg-indigo-500 text-white hover:bg-indigo-500/80'
                          : 'border-indigo-500 text-indigo-500 hover:bg-indigo-500 hover:text-white'
                      }`}
                    >
                      {alt}
                    </Button>
                  </TableCell>
                )
              })}
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogTrigger asChild>
          <Button className="w-full p-6 text-lg font-semibold">
            Enviar Gabarito
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-1 text-lg text-red-600">
              <AlertTriangle className="h-6 w-8" />
              Confirmar envio
            </DialogTitle>
            <DialogDescription>
              Tem certeza de que deseja enviar o gabarito? Verifique se todas as
              alternativas corretas foram marcadas.
            </DialogDescription>
          </DialogHeader>

          <DialogFooter className="mt-4 flex justify-end gap-2">
            <Button variant="outline" onClick={() => setDialogOpen(false)}>
              Cancelar
            </Button>
            <Button
              onClick={handleConfirmSubmit}
              disabled={isSubmitting}
              className="bg-indigo-600 text-white hover:bg-indigo-700 disabled:opacity-80 disabled:hover:cursor-pointer"
            >
              {isSubmitting ? (
                <LoaderCircle className="h-4 w-4 animate-spin" />
              ) : (
                'Enviar gabarito'
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
