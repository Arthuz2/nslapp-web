import { LastExams } from './components/last-exams/last-exams'
import { LastNews } from './components/last-news/last-news'
import { QuickStats } from './components/quick-stats/quick-stats'
import { Score } from './components/score/score'
import { UpcomingEvents } from './components/upcoming-events/upcoming-events'
import { WelcomeCard } from './components/welcome-card/welcome-card'

export function Home() {
  return (
    <div className="space-y-6 p-4 md:p-6">
      {/* Welcome Section */}
      <WelcomeCard />

      {/* Quick Stats */}
      <QuickStats />

      {/* Main Content Grid */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Left Column - Scores and Performance */}
        <div className="space-y-6 lg:col-span-2">
          <Score />
          <LastExams />
        </div>

        {/* Right Column - Events and News */}
        <div className="space-y-6">
          <UpcomingEvents />
          <LastNews />
        </div>
      </div>
    </div>
  )
}
