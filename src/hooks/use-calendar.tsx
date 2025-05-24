'use client'

import { useEffect, useState } from 'react'

import { fetchAllEvents } from '@/services/calendar-api'
import type { CalendarDay, CalendarEvent } from '@/types/calendar'

export function useCalendar() {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [events, setEvents] = useState<CalendarEvent[]>([])
  const [loading, setLoading] = useState(false)
  const [today] = useState(new Date())

  const year = currentDate.getFullYear()
  const month = currentDate.getMonth()

  // Fetch events when month/year changes
  useEffect(() => {
    const loadEvents = async () => {
      setLoading(true)
      try {
        const allEvents = await fetchAllEvents(year, month)
        setEvents(allEvents)
      } catch (error) {
        console.error('Error loading events:', error)
        setEvents([])
      } finally {
        setLoading(false)
      }
    }

    loadEvents()
  }, [year, month])

  // Get events for a specific date
  const getEventsForDate = (date: Date) => {
    return events.filter(
      (event) =>
        event.date.getDate() === date.getDate() &&
        event.date.getMonth() === date.getMonth() &&
        event.date.getFullYear() === date.getFullYear(),
    )
  }

  // Generate calendar days
  const generateCalendarDays = (): CalendarDay[] => {
    const firstDayOfMonth = new Date(year, month, 1)
    const lastDayOfMonth = new Date(year, month + 1, 0)
    const firstDayWeekday = firstDayOfMonth.getDay()
    const daysInMonth = lastDayOfMonth.getDate()
    const prevMonth = new Date(year, month, 0)
    const daysInPrevMonth = prevMonth.getDate()

    const days: CalendarDay[] = []

    // Previous month days
    for (let i = firstDayWeekday - 1; i >= 0; i--) {
      const day = daysInPrevMonth - i
      const date = new Date(year, month - 1, day)
      days.push({
        date,
        isCurrentMonth: false,
        events: [],
      })
    }

    // Current month days
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day)
      days.push({
        date,
        isCurrentMonth: true,
        events: getEventsForDate(date),
      })
    }

    // Next month days to complete the grid
    const remainingDays = 42 - days.length // 6 rows × 7 days
    for (let day = 1; day <= remainingDays; day++) {
      const date = new Date(year, month + 1, day)
      days.push({
        date,
        isCurrentMonth: false,
        events: [],
      })
    }

    return days
  }

  // Navigation functions
  const goToPreviousMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1))
  }

  const goToNextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1))
  }

  const goToToday = () => {
    setCurrentDate(new Date())
  }

  return {
    currentDate,
    today,
    events,
    loading,
    calendarDays: generateCalendarDays(),
    goToPreviousMonth,
    goToNextMonth,
    goToToday,
    getEventsForDate,
  }
}
