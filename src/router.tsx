import { createBrowserRouter } from 'react-router-dom'

import { DefaultLayout } from './pages/_layouts/default-layout'
import { AI } from './pages/app/ai/ai'
import { Calendar } from './pages/app/calendario/calendar'
import { Chat } from './pages/app/chat/chat'
import { Settings } from './pages/app/configuracoes/settings'
import { Performance } from './pages/app/desempenho/performance'
import { Home } from './pages/app/home/home'
import { Exams } from './pages/app/provas/exams'
import { Login } from './pages/auth/login'

export const routes = createBrowserRouter([
  {
    path: '/',
    element: <DefaultLayout />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/desempenho',
        element: <Performance />,
      },
      {
        path: '/provas',
        element: <Exams />,
      },
      {
        path: '/calendario',
        element: <Calendar />,
      },
      {
        path: '/chat',
        element: <Chat />,
      },
      {
        path: '/ia',
        element: <AI />,
      },
      {
        path: '/configuracoes',
        element: <Settings />,
      },
    ],
  },
  {
    path: '/login',
    element: <Login />,
  },
])
