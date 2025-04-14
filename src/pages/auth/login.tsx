import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

const loginFormSchema = z.object({
  email: z.string().email('E-mail inválido'),
  password: z.string().min(6, 'Senha deve ter no mínimo 6 caracteres'),
})

type LoginFormData = z.infer<typeof loginFormSchema>

export function Login() {
  const { register, handleSubmit } = useForm<LoginFormData>()

  function handleUserLogin(data: LoginFormData) {
    console.log(data)
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
            type="e-mail"
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
        <Button className="text-foreground flex cursor-pointer items-center justify-center bg-indigo-600 p-6 text-2xl hover:bg-indigo-700">
          Logar
        </Button>
      </form>
    </div>
  )
}
