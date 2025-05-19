import { Link } from 'react-router-dom'

export function NotFound() {
  return (
    <div className="flex h-screen min-w-screen flex-col items-center justify-center gap-11 bg-gradient-to-br from-slate-900 to-gray-950 p-10">
      <h1 className="text-6xl font-bold tracking-tight text-white">
        Página não encontrada
      </h1>
      <p className="text-lg text-white">
        Desculpe, a página que você está procurando não existe. Volte para a{' '}
        <Link to="/" className="text-blue-700 underline hover:text-blue-400">
          página inicial
        </Link>
        .
      </p>
    </div>
  )
}
