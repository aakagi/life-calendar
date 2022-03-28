// import { MonthCalendar, CalendarDayOfWeekHeader } from 'calendars/MonthCalendar'
import { QuarterlyCalendar } from 'components/quarterly-calendar'

export function Calendar() {
  return (
    <div className="flex flex-col flex-1 bg-blue-0">
      {/* <CalendarDayOfWeekHeader /> */}

      <div className="flex-1 bg-blue-0 relative">
        <div className="bg-blue-00 absolute inset-0 overflow-y-scroll">
          {/* <MonthCalendar /> */}
          <div className="px-4 pt-4 pb-64 ">
            {/* max-w-screen-2xl mx-auto */}
            <QuarterlyCalendar />
          </div>
        </div>
      </div>
    </div>
  )
}
