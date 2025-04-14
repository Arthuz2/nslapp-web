import { RouterProvider } from 'react-router-dom'

import { ThemeProvider } from './components/theme/theme-provider'
import { routes } from './router'

export function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="nsl-app-theme">
      <RouterProvider router={routes} />
    </ThemeProvider>
  )
}
