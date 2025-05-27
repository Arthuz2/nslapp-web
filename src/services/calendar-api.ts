import type { CalendarEvent, HolidayApiResponse } from '@/types/calendar'

// Helper function to get the second Sunday of a month
const getSecondSunday = (year: number, month: number): Date => {
  const firstDay = new Date(year, month, 1)
  const firstSunday = new Date(year, month, 1 + ((7 - firstDay.getDay()) % 7))
  return new Date(year, month, firstSunday.getDate() + 7)
}

// Static Brazilian holidays and commemorative dates
export const getStaticHolidays = (year: number): CalendarEvent[] => {
  return [
    // Fixed holidays
    {
      id: 'new-year',
      title: 'Ano Novo',
      type: 'holiday',
      date: new Date(year, 0, 1),
      description: 'Confraternização Universal',
    },
    {
      id: 'tiradentes',
      title: 'Tiradentes',
      type: 'holiday',
      date: new Date(year, 3, 21),
      description: 'Feriado Nacional',
    },
    {
      id: 'labor-day',
      title: 'Dia do Trabalhador',
      type: 'holiday',
      date: new Date(year, 4, 1),
      description: 'Feriado Nacional',
    },
    {
      id: 'independence',
      title: 'Independência do Brasil',
      type: 'holiday',
      date: new Date(year, 8, 7),
      description: 'Feriado Nacional',
    },
    {
      id: 'our-lady',
      title: 'Nossa Senhora Aparecida',
      type: 'holiday',
      date: new Date(year, 9, 12),
      description: 'Padroeira do Brasil',
    },
    {
      id: 'all-souls',
      title: 'Finados',
      type: 'holiday',
      date: new Date(year, 10, 2),
      description: 'Feriado Nacional',
    },
    {
      id: 'republic',
      title: 'Proclamação da República',
      type: 'holiday',
      date: new Date(year, 10, 15),
      description: 'Feriado Nacional',
    },
    {
      id: 'christmas',
      title: 'Natal',
      type: 'holiday',
      date: new Date(year, 11, 25),
      description: 'Nascimento de Jesus Cristo',
    },

    // Commemorative dates
    {
      id: 'mothers-day',
      title: 'Dia das Mães',
      type: 'event',
      date: getSecondSunday(year, 4), // Second Sunday of May
      description: 'Homenagem às mães',
    },
    {
      id: 'fathers-day',
      title: 'Dia dos Pais',
      type: 'event',
      date: getSecondSunday(year, 7), // Second Sunday of August
      description: 'Homenagem aos pais',
    },
    {
      id: 'valentines-day',
      title: 'Dia dos Namorados',
      type: 'event',
      date: new Date(year, 5, 12),
      description: 'Dia dos Namorados no Brasil',
    },
    {
      id: 'teachers-day',
      title: 'Dia do Professor',
      type: 'event',
      date: new Date(year, 9, 15),
      description: 'Homenagem aos educadores',
    },
    {
      id: 'student-day',
      title: 'Dia do Estudante',
      type: 'event',
      date: new Date(year, 7, 11),
      description: 'Dia dedicado aos estudantes',
    },
  ]
}

// Placeholder API functions (to be replaced with your actual API)
export const fetchSchoolEvents = async (
  year: number,
  month: number,
): Promise<CalendarEvent[]> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500))

  // Placeholder school events - replace with actual API call
  return [
    {
      id: 'math-exam-1',
      title: 'Prova de Matemática',
      type: 'exam',
      date: new Date(year, 4, 15),
      subject: 'Matemática',
      description: 'Prova do 1º bimestre',
    },
    {
      id: 'history-exam',
      title: 'Prova de História',
      type: 'exam',
      date: new Date(year, 4, 18),
      subject: 'História',
      description: 'Avaliação sobre Brasil Colonial',
    },
    {
      id: 'science-fair',
      title: 'Feira de Ciências',
      type: 'event',
      date: new Date(year, 4, 20),
      description: 'Apresentação de projetos científicos',
    },
    {
      id: 'sports-day',
      title: 'Gincana Esportiva',
      type: 'event',
      date: new Date(year, month, 25),
      description: 'Competições esportivas entre turmas',
    },
  ]
}

// Fetch holidays from Brazilian holidays API
export const fetchBrazilianHolidays = async (
  year: number,
): Promise<CalendarEvent[]> => {
  try {
    const response = await fetch(
      `https://api.invertexto.com/v1/holidays/${year}?token=19789|i0XWT4arcfQVoy9nHLNgtodw9XUOhhIt&state=ES`,
    )
    if (!response.ok) {
      throw new Error('Failed to fetch holidays')
    }

    const holidays: HolidayApiResponse[] = await response.json()

    return holidays.map((holiday, index) => {
      const dateArray = holiday.date.split('-')
      const correctDate = new Date(
        Number(dateArray[0]),
        Number(dateArray[1]) - 1,
        Number(dateArray[2]),
      )

      return {
        id: `api-holiday-${index}`,
        title: holiday.name,
        type: 'holiday' as const,
        level: holiday.level,
        date: new Date(correctDate),
        description: 'Feriado Nacional',
      }
    })
  } catch (error) {
    console.warn(
      'Failed to fetch holidays from API, using static holidays:',
      error,
    )
    return []
  }
}

// Main function to fetch all events
export const fetchAllEvents = async (
  year: number,
  month: number,
): Promise<CalendarEvent[]> => {
  try {
    // Get static holidays
    const staticHolidays = getStaticHolidays(year)

    // Try to fetch holidays from API
    const apiHolidays = await fetchBrazilianHolidays(year)

    // Fetch school events (placeholder)
    const schoolEvents = await fetchSchoolEvents(year, month)

    // Combine all events, prioritizing API holidays over static ones
    const allHolidays =
      apiHolidays.length > 0
        ? apiHolidays
        : staticHolidays.filter((e) => e.type === 'holiday')
    const commemorativeDates = staticHolidays.filter((e) => e.type === 'event')

    return [...allHolidays, ...commemorativeDates, ...schoolEvents]
  } catch (error) {
    console.error('Error loading events:', error)
    // Fallback to static holidays only
    return getStaticHolidays(year)
  }
}
