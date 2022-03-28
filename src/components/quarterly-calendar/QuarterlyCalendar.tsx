import { useState } from 'react'
import * as dfs from 'date-fns'
import cx from 'classnames'

import { useQuarterlyCalendar } from './useQuarterlyCalendar'

function DOW({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full flex items-center justify-center text-gray-500 font-bold uppercase text-xs select-none">
      {children}
    </div>
  )
}

// @tgif
export function CalendarDayOfWeekHeader() {
  return (
    <div className="w-full grid grid-cols-7">
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

type QuarterlyMonthCellChipProps = {
  text: string
}

function QuarterlyMonthCellChip(props: QuarterlyMonthCellChipProps) {
  const { text } = props
  const CHIP_HEIGHT = 24

  return (
    <div
      className="bg-gray-400 text-white flex items-center justify-center rounded-full px-3 cursor-pointer"
      style={{ height: CHIP_HEIGHT }}
    >
      <div className="text-2xs font-medium select-none">{text}</div>
    </div>
  )
}

type QuarterlyMonthCellProps = {
  date: Date
  isToday: boolean
  chips: QuarterlyMonthCellChipProps[]
  // chips: Array<React.ReactElement<QuarterlyMonthCellChipProps>>
}

function QuarterlyMonthCell(props: QuarterlyMonthCellProps) {
  const { date, isToday, chips } = props

  return (
    <div className="flex flex-col border-gray-50 cursor-pointer">
      <div className="self-center pt-2 pb-2">
        <div
          className={cx(
            'text-xs select-none ',
            'w-6 h-6 rounded-full p-1 -m-1 flex items-center justify-center',
            {
              'bg-red-600 text-white font-semibold': isToday,
            },
          )}
          style={{
            lineHeight: '11px', // NOTE: Hack to center, but should probably figure out something better
          }}
        >
          {dfs.format(date, 'd')}
        </div>
      </div>
      <div className="flex flex-col px-2 items-center w-full" style={{ height: 30 }}>
        {chips.map(({ text }, index) => (
          <div className="pb-2 w-full" key={`chip-${index}`}>
            <QuarterlyMonthCellChip text={text} />
          </div>
        ))}
      </div>
    </div>
  )
}

type QuarterlyMonthViewProps = {
  firstDateOfMonth: Date
  lastDateOfMonth: Date
  formattedMonth: string
  formattedYear: string
  dates: Date[]
}

export function QuarterlyMonthView(props: QuarterlyMonthViewProps) {
  const { firstDateOfMonth, dates, formattedMonth, formattedYear } = props
  const initialDateOffset = dfs.getDay(firstDateOfMonth)

  return (
    <div className="w-full">
      <div className="pt-4 pb-4 pl-4 flex items-center select-none">
        <h3 className="text-gray-700 font-bold border-l-2 border-l-red-600 pl-6 -ml-3 flex">
          {formattedMonth}
        </h3>
        <h3 className="text-gray-300 font-normal ml-2 ">{formattedYear}</h3>
      </div>

      <div className="py-2">
        <CalendarDayOfWeekHeader />
      </div>

      <div className="grid grid-cols-7 ">
        {[...Array(initialDateOffset)].map((_, index) => (
          <div key={`spacer-${index}`} />
        ))}
        {dates.map(({ date, chips, isToday }, index) => (
          <div
            key={`qmc-${index}`}
            className={cx(
              // 'border-gray-50',
              {
                'border-r': initialDateOffset + (index % 7) !== 6, // not last day of week
              },
            )}
          >
            <QuarterlyMonthCell date={date} chips={chips} isToday={isToday} />
          </div>
        ))}
      </div>
    </div>
  )
}

// @tgif
export function QuarterlyCalendar() {
  const { data } = useQuarterlyCalendar()

  return (
    <div className="h-full w-full">
      <div className="w-full grid grid-cols-3 gap-x-6 gap-y-6">
        {data.map((quarterlyMonth, index) => (
          <QuarterlyMonthView key={`qm-${index}`} {...quarterlyMonth} />
        ))}
      </div>
    </div>
  )
}
