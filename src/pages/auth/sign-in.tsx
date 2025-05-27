import { zodResolver } from '@hookform/resolvers/zod'
import { GraduationCap, LoaderCircle, UserCheck, Users } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Toaster } from '@/components/ui/sonner'

const loginFormSchema = z.object({
  email: z.string().email('E-mail inválido'),
  password: z.string().min(4, 'Senha deve ter no mínimo 4 caracteres'),
})

type LoginFormData = z.infer<typeof loginFormSchema>
type UserType = 'student' | 'teacher' | 'manager'

const userTypes = [
  {
    type: 'student' as UserType,
    title: 'Estudante',
    description: 'Acesse suas notas, provas e materiais',
    icon: GraduationCap,
    color:
      'bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100 dark:bg-blue-950 dark:text-blue-300 dark:border-blue-800',
    route: '/',
  },
  {
    type: 'teacher' as UserType,
    title: 'Professor',
    description: 'Gerencie turmas, provas e avaliações',
    icon: UserCheck,
    color:
      'bg-green-50 text-green-700 border-green-200 hover:bg-green-100 dark:bg-green-950 dark:text-green-300 dark:border-green-800',
    route: '/professor',
  },
  {
    type: 'manager' as UserType,
    title: 'Gestor',
    description: 'Administre a escola e relatórios',
    icon: Users,
    color:
      'bg-purple-50 text-purple-700 border-purple-200 hover:bg-purple-100 dark:bg-purple-950 dark:text-purple-300 dark:border-purple-800',
    route: '/gestor',
  },
]

export function SignIn() {
  const navigate = useNavigate()
  const [selectedUserType, setSelectedUserType] = useState<UserType>('student')
  const [step, setStep] = useState<'userType' | 'credentials'>('userType')

  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting, errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  async function handleUserLogin(data: LoginFormData) {
    console.log({ ...data, userType: selectedUserType })
    await new Promise((resolve) => setTimeout(resolve, 2000))

    const selectedType = userTypes.find(
      (type) => type.type === selectedUserType,
    )

    toast.success('Login realizado com sucesso!', {
      description: `Bem-vindo(a) como ${selectedType?.title}!`,
      duration: 2000,
      richColors: true,
    })

    reset()

    setTimeout(() => {
      navigate(selectedType?.route || '/')
    }, 2000)
  }

  const handleUserTypeSelect = (userType: UserType) => {
    setSelectedUserType(userType)
    setStep('credentials')
  }

  const selectedTypeInfo = userTypes.find(
    (type) => type.type === selectedUserType,
  )

  if (step === 'userType') {
    return (
      <div className="flex h-screen min-w-screen flex-col items-center justify-center gap-8 bg-gradient-to-br from-gray-900 to-slate-950 p-6">
        <div className="mb-4 flex items-center gap-6">
          <img
            src="/NSL-Brasao.png"
            alt="Brasão da escola Nossa Senhora de Lourdes"
            className="h-32 w-24"
          />
          <div className="text-center">
            <h1 className="text-foreground mb-2 font-sans text-5xl font-bold tracking-tight md:text-6xl">
              NSL App
            </h1>
            <p className="text-foreground/80 text-lg">
              Sistema Educacional Integrado
            </p>
          </div>
        </div>

        <Card className="w-full max-w-4xl">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">
              Selecione seu tipo de acesso
            </CardTitle>
            <CardDescription>
              Escolha como você deseja acessar o sistema
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-3">
              {userTypes.map((userType) => (
                <Button
                  key={userType.type}
                  variant="outline"
                  className={`flex h-auto flex-col items-center gap-4 p-6 ${userType.color} transition-all hover:scale-105`}
                  onClick={() => handleUserTypeSelect(userType.type)}
                >
                  <userType.icon className="h-12 w-12" />
                  <div className="text-center">
                    <h3 className="text-lg font-semibold">{userType.title}</h3>
                    <p className="mt-1 text-sm opacity-80">
                      {userType.description}
                    </p>
                  </div>
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        <Toaster />
      </div>
    )
  }

  return (
    <div className="flex h-screen min-w-screen flex-col items-center justify-center gap-8 bg-gradient-to-br from-gray-900 to-slate-950 p-6">
      <div className="flex items-center gap-6">
        <img
          src="/NSL-Brasao.png"
          alt="Brasão da escola Nossa Senhora de Lourdes"
          className="h-32 w-24"
        />
        <div>
          <h1 className="text-foreground font-sans text-5xl font-bold tracking-tight md:text-6xl">
            Entrar
          </h1>
          {selectedTypeInfo && (
            <div className="mt-2 flex items-center gap-2">
              <selectedTypeInfo.icon className="text-foreground/80 h-5 w-5" />
              <span className="text-foreground/80 text-lg">
                {selectedTypeInfo.title}
              </span>
            </div>
          )}
        </div>
      </div>

      <Card className="w-full max-w-md">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Credenciais de Acesso</CardTitle>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setStep('userType')}
              className="text-muted-foreground"
            >
              Voltar
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <form
            className="flex flex-col gap-4"
            onSubmit={handleSubmit(handleUserLogin)}
          >
            <div className="flex flex-col gap-2">
              <Label htmlFor="email" className="text-foreground font-medium">
                E-mail:
              </Label>
              <Input
                id="email"
                type="email"
                className="text-foreground placeholder:text-foreground/60"
                placeholder="Digite seu e-mail"
                {...register('email')}
              />
              {errors.email && (
                <span className="text-sm text-red-500">
                  {errors.email.message}
                </span>
              )}
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="password" className="text-foreground font-medium">
                Senha:
              </Label>
              <Input
                id="password"
                type="password"
                className="text-foreground placeholder:text-foreground/60"
                placeholder="Digite sua senha"
                {...register('password')}
              />
              {errors.password && (
                <span className="text-sm text-red-500">
                  {errors.password.message}
                </span>
              )}
            </div>

            <Button
              disabled={isSubmitting}
              className="text-foreground mt-4 flex cursor-pointer items-center justify-center p-6 text-lg font-bold disabled:opacity-50"
            >
              {isSubmitting ? (
                <LoaderCircle className="h-5 w-5 animate-spin" />
              ) : (
                'Entrar'
              )}
            </Button>
          </form>
        </CardContent>
      </Card>

      <Toaster />
    </div>
  )
}
