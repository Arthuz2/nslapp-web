import { Calendar } from './components/calendar/calendar'
import { LastExams } from './components/last-exams/last-exams'
import { LastNews } from './components/last-news/last-news'
import { Score } from './components/score/score'

export function Home() {
  return (
    <div className="flex flex-1 flex-col justify-center gap-4">
      <Calendar />
      <div className="flex h-full flex-1 justify-evenly gap-3">
        <Score />
        <LastExams />
        <LastNews />
      </div>
    </div>
  )
}
