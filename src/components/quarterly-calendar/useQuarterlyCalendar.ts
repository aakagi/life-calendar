import { useState } from 'react'
import * as dfs from 'date-fns'
import { atom } from 'jotai'

import { mockClimbingDates } from './mock-data'

export function useQuarterlyCalendar() {
  const [today] = useState(dfs.startOfDay(new Date()))

  const initialStart = dfs.startOfQuarter(today)
  const [start, setStart] = useState(initialStart)

  const DEFAULT_QUARTERLY_ADDED_QUARTERS = 13
  const eoq = dfs.endOfQuarter(today) // Get end of quarter to ensure 3 months per row, really isn't a big deal lol but whatever, is nicer
  const initialEnd = dfs.addQuarters(eoq, DEFAULT_QUARTERLY_ADDED_QUARTERS)
  const [end, setEnd] = useState(initialEnd)

  // Creates an array w/ an item for each month
  const monthsOfInterval = dfs.eachMonthOfInterval({ start, end })
  const data = monthsOfInterval.map((firstDateOfMonth) => {
    const lastDateOfMonth = dfs.endOfMonth(firstDateOfMonth)
    return {
      firstDateOfMonth,
      lastDateOfMonth,
      title: dfs.format(firstDateOfMonth, 'MMMM'),
      formattedMonth: dfs.format(firstDateOfMonth, 'MMMM'),
      formattedYear: dfs.format(firstDateOfMonth, 'yyyy'),
      dates: dfs
        .eachDayOfInterval({ start: firstDateOfMonth, end: lastDateOfMonth })
        .map((d) => ({
          date: d,
          isToday: dfs.isSameDay(d, today),
          chips: [
            ...(mockClimbingDates.includes(dfs.format(d, 'yyyy-MM-dd'))
              ? [{ text: 'C' }]
              : []),
          ],
        })),
    }
  })

  return {
    today,
    start,
    end,
    setStart,
    setEnd,
    data,
  }
}
