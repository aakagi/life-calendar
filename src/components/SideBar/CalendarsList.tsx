import { CalendarsListData } from 'data'

import { CalendarsListItem } from './CalendarsListItem'

type Props = {
  calendarsList: CalendarsListData
}

export function CalendarsList(props: Props) {
  const { calendarsList } = props
  return (
    <div>
      {calendarsList.map((calendarsListItem) => (
        <CalendarsListItem {...calendarsListItem} />
      ))}
    </div>
  )
}
