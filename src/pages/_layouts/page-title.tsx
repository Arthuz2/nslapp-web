import { useLocation } from 'react-router-dom'

export function PageTitle() {
  const location = useLocation()

  const getPageTitle = () => {
    const path = location.pathname

    if (path === '/') return 'Home'
    if (path === '/ia') return 'A.I'

    // Convert path to title case (e.g., /desempenho -> Desempenho)
    return (
      path.split('/')[1].charAt(0).toUpperCase() + path.split('/')[1].slice(1)
    )
  }

  return <span className="font-lg font-semibold">{getPageTitle()}</span>
}
