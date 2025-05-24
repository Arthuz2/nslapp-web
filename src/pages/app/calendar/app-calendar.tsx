import { CalendarGrid } from '@/components/calendar/calendar-grid'
import { CalendarHeader } from '@/components/calendar/calendar-header'
import { CalendarLegend } from '@/components/calendar/calendar-legend'
import { Card } from '@/components/ui/card'
import { useCalendar } from '@/hooks/use-calendar'

export function AppCalendar() {
  const {
    currentDate,
    today,
    loading,
    calendarDays,
    goToPreviousMonth,
    goToNextMonth,
  } = useCalendar()

  return (
    <div className="flex h-full w-full flex-col gap-4 p-2 sm:gap-6 sm:p-4">
      {/* Legend */}
      <CalendarLegend />

      {/* Calendar Container */}
      <Card className="flex-1 bg-inherit p-2 sm:p-4">
        {/* Header */}
        <CalendarHeader
          currentDate={currentDate}
          onPreviousMonth={goToPreviousMonth}
          onNextMonth={goToNextMonth}
          loading={loading}
        />

        {/* Calendar Grid */}
        <CalendarGrid days={calendarDays} today={today} />
      </Card>
    </div>
  )
}
