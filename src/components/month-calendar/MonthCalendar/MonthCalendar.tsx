import { useState } from 'react'
import * as dfs from 'date-fns'
import cx from 'classnames'

function DOW({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full flex items-center justify-center text-gray-500 font-bold uppercase text-xs">
      {children}
    </div>
  )
}

// @tgif
export function CalendarDayOfWeekHeader() {
  return (
    <div className="w-full grid grid-cols-7 pb-3 border-b">
      <DOW>Sun</DOW>
      <DOW>Mon</DOW>
      <DOW>Tue</DOW>
      <DOW>Wed</DOW>
      <DOW>Thr</DOW>
      <DOW>Fri</DOW>
      <DOW>Sat</DOW>
    </div>
  )
}

type CalendarDateCellProps = {
  date: Date
  isLastDayOfWeek: boolean
}

function CalendarDateCell(props: CalendarDateCellProps) {
  const { date, isLastDayOfWeek } = props
  return (
    <div
      className={cx('w-full flex justify-center border-b', isLastDayOfWeek && 'border-r')}
    >
      <div>{dfs.format(date, 'M/d')}</div>
      <div className="h-24"></div>
    </div>
  )
}

// @tgif
export function MonthCalendar() {
  const [today] = useState(dfs.startOfDay(new Date()))
  const firstCalendarDate = dfs.startOfWeek(today)
  const lastCalendarDate = dfs.addWeeks(dfs.endOfWeek(firstCalendarDate), 30)

  const calendarDates = dfs.eachDayOfInterval({
    start: firstCalendarDate,
    end: lastCalendarDate,
  })

  return (
    <div className="h-full w-full grid grid-cols-7">
      {calendarDates.map((date, index) => (
        <CalendarDateCell
          key={date.toString()}
          date={date}
          isLastDayOfWeek={index % 7 !== 6}
        />
      ))}
    </div>
  )
}
