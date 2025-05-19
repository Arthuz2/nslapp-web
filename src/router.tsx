import { createBrowserRouter } from 'react-router-dom'

import { DefaultLayout } from './pages/_layouts/default-layout'
import { NotFound } from './pages/404'
import { AI } from './pages/app/ai/ai'
import { Calendar } from './pages/app/calendar/calendar'
import { Chat } from './pages/app/chat/chat'
import { ExamsResult } from './pages/app/exams/exams-result'
import { ExamsUpload } from './pages/app/exams/exams-upload'
import { Home } from './pages/app/home/home'
import { Performance } from './pages/app/performance/performance'
import { Settings } from './pages/app/settings/settings'
import { SignIn } from './pages/auth/sign-in'

export const routes = createBrowserRouter([
  {
    path: '/',
    element: <DefaultLayout />,
    errorElement: <NotFound />,
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
        children: [
          {
            path: '/provas/lancar',
            element: <ExamsUpload />,
          },
          {
            path: '/provas/resultados',
            element: <ExamsResult />,
          },
        ],
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
    path: '/sign-in',
    element: <SignIn />,
  },
])
