import { createBrowserRouter } from 'react-router-dom'

import { ManagerLayout } from './pages/_layouts/manager-layout'
import { StudentLayout } from './pages/_layouts/student-layout'
import { TeacherLayout } from './pages/_layouts/teacher-layout'
import { NotFound } from './pages/404'
import { ManagerAnnouncements } from './pages/app/manager/announcements/manager-announcements'
import { ManagerClasses } from './pages/app/manager/classes/manager-classes'
// Manager routes
import { ManagerDashboard } from './pages/app/manager/dashboard/manager-dashboard'
import { ManagerElectives } from './pages/app/manager/electives/manager-electives'
import { ManagerEvents } from './pages/app/manager/events/manager-events'
import { ManagerPerformance } from './pages/app/manager/performance/manager-performance'
import { ManagerReports } from './pages/app/manager/reports/manager-reports'
import { ManagerSettings } from './pages/app/manager/settings/manager-settings'
import { ManagerStudents } from './pages/app/manager/students/manager-students'
import { ManagerSubjects } from './pages/app/manager/subjects/manager-subjects'
import { ManagerTeachers } from './pages/app/manager/teachers/manager-teachers'
import { ManagerTutoring } from './pages/app/manager/tutoring/manager-tutoring'
// Student routes
import { AI } from './pages/app/student/ai/ai'
import { AppCalendar } from './pages/app/student/calendar/app-calendar'
import { Chat } from './pages/app/student/chat/chat'
import { Electives } from './pages/app/student/electives/electives'
import { Exams } from './pages/app/student/exams/exams'
import { Home } from './pages/app/student/home/home'
import { Performance } from './pages/app/student/performance/performance'
import { Tutoring } from './pages/app/student/tutoring/tutoring'
// Teacher routes
import { TeacherClasses } from './pages/app/teacher/classes/teacher-classes'
import { TeacherDashboard } from './pages/app/teacher/dashboard/teacher-dashboard'
import { TeacherElectives } from './pages/app/teacher/electives/teacher-electives'
import { TeacherExams } from './pages/app/teacher/exams/teacher-exams'
import { TeacherGrades } from './pages/app/teacher/grades/teacher-grades'
import { TeacherSettings } from './pages/app/teacher/settings/teacher-settings'
import { TeacherStudents } from './pages/app/teacher/students/teacher-students'
import { TeacherTutoring } from './pages/app/teacher/tutoring/teacher-tutoring'
import { SignIn } from './pages/auth/sign-in'

export const routes = createBrowserRouter([
  // Student routes
  {
    path: '/',
    element: <StudentLayout />,
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
        element: <Exams />,
      },
      {
        path: '/calendario',
        element: <AppCalendar />,
      },
      {
        path: '/eletivas',
        element: <Electives />,
      },
      {
        path: '/tutoria',
        element: <Tutoring />,
      },
      {
        path: '/chat',
        element: <Chat />,
      },
      {
        path: '/ia',
        element: <AI />,
      },
    ],
  },
  // Manager routes
  {
    path: '/gestor',
    element: <ManagerLayout />,
    children: [
      {
        path: '/gestor',
        element: <ManagerDashboard />,
      },
      {
        path: '/gestor/alunos',
        element: <ManagerStudents />,
      },
      {
        path: '/gestor/professores',
        element: <ManagerTeachers />,
      },
      {
        path: '/gestor/turmas',
        element: <ManagerClasses />,
      },
      {
        path: '/gestor/disciplinas',
        element: <ManagerSubjects />,
      },
      {
        path: '/gestor/desempenho',
        element: <ManagerPerformance />,
      },
      {
        path: '/gestor/anuncios',
        element: <ManagerAnnouncements />,
      },
      {
        path: '/gestor/eventos',
        element: <ManagerEvents />,
      },
      {
        path: '/gestor/relatorios',
        element: <ManagerReports />,
      },
      {
        path: '/gestor/eletivas',
        element: <ManagerElectives />,
      },
      {
        path: '/gestor/tutoria',
        element: <ManagerTutoring />,
      },
      {
        path: '/gestor/chat',
        element: <Chat />,
      },
      {
        path: '/gestor/ia',
        element: <AI />,
      },
      {
        path: '/gestor/configuracoes',
        element: <ManagerSettings />,
      },
    ],
  },
  // Teacher routes
  {
    path: '/professor',
    element: <TeacherLayout />,
    children: [
      {
        path: '/professor',
        element: <TeacherDashboard />,
      },
      {
        path: '/professor/turmas',
        element: <TeacherClasses />,
      },
      {
        path: '/professor/alunos',
        element: <TeacherStudents />,
      },
      {
        path: '/professor/provas',
        element: <TeacherExams />,
      },
      {
        path: '/professor/notas',
        element: <TeacherGrades />,
      },
      {
        path: '/professor/eletivas',
        element: <TeacherElectives />,
      },
      {
        path: '/professor/tutoria',
        element: <TeacherTutoring />,
      },
      {
        path: '/professor/chat',
        element: <Chat />,
      },
      {
        path: '/professor/ia',
        element: <AI />,
      },
      {
        path: '/professor/configuracoes',
        element: <TeacherSettings />,
      },
    ],
  },
  {
    path: '/sign-in',
    element: <SignIn />,
  },
])
