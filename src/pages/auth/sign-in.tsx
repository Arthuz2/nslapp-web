import { zodResolver } from '@hookform/resolvers/zod'
import { LoaderCircle } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Toaster } from '@/components/ui/sonner'

const loginFormSchema = z.object({
  email: z.string().email('E-mail inválido'),
  password: z.string().min(4, 'Senha deve ter no mínimo 4 caracteres'),
})

type LoginFormData = z.infer<typeof loginFormSchema>

export function SignIn() {
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  async function handleUserLogin(data: LoginFormData) {
    console.log(data)
    await new Promise((resolve) => setTimeout(resolve, 2000))
    toast.success('Login realizado com sucesso!', {
      description: 'Você será redirecionado para a página inicial.',
      duration: 2000,
      richColors: true,
    })
    reset()
    return await setTimeout(() => {
      navigate('/')
    }, 3000)
  }

  return (
    <div className="flex h-screen min-w-screen flex-col items-center justify-center gap-11 bg-gradient-to-br from-gray-900 to-slate-950 p-10">
      <div className="flex items-center gap-7.5">
        <img
          src="/NSL-Brasao.png"
          alt="Brasão da escola Nossa Senhora de Lourdes"
          className="h-40.5 w-30"
        />
        <h1 className="text-foreground font-sans text-7xl font-bold tracking-tight">
          Entrar
        </h1>
      </div>

      <form
        className="flex w-104.5 flex-col gap-4"
        onSubmit={handleSubmit(handleUserLogin)}
      >
        <div className="flex flex-col gap-2">
          <Label htmlFor="email" className="text-foreground text-lg font-bold">
            E-mail:
          </Label>
          <Input
            id="email"
            type="text"
            className="text-foreground placeholder:text-foreground w-full py-5.5 text-lg"
            placeholder="Digite seu e-mail"
            {...register('email')}
          />
        </div>
        <div className="flex flex-col gap-2">
          <Label
            htmlFor="password"
            className="text-foreground text-lg font-bold"
          >
            Senha:
          </Label>
          <Input
            id="password"
            type="password"
            className="text-foreground placeholder:text-foreground w-full py-5.5 text-lg"
            placeholder="Digite sua senha"
            {...register('password')}
          />
        </div>
        <Button
          disabled={isSubmitting}
          className="text-foreground flex cursor-pointer items-center justify-center p-6 text-2xl font-bold disabled:opacity-50"
        >
          {isSubmitting ? (
            <LoaderCircle className="h-5 w-5 animate-spin" />
          ) : (
            'Logar'
          )}
        </Button>
      </form>
      <Toaster />
    </div>
  )
}
