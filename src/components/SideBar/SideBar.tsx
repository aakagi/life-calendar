import { CalendarsListData } from 'data'

import { CalendarsList } from './CalendarsList'

type Props = {
  calendarsList: CalendarsListData
}

export function SideBar(props: Props) {
  const { calendarsList } = props
  return (
    <div>
      <CalendarsList calendarsList={calendarsList} />
    </div>
  )
}
