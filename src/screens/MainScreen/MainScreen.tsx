import { LifeCalendar, SideBar } from 'components'
import { data } from 'data'

// import styles from './MainScreen.module.css'

type LayoutProps = {
  sideBar: React.ReactChild
  calendar: React.ReactChild
}

function MainScreenLayout(props: LayoutProps) {
  const { sideBar, calendar } = props
  return (
    <div className="w-full min-h-screen flex flex-col">
      <div className="flex flex-1">
        <div className="flex flex-col">{sideBar}</div>
        <div className="flex flex-1 flex-col">{calendar}</div>
      </div>
    </div>
  )
}

export function MainScreen() {
  const calendarsList = data.calendarsList
  return (
    <MainScreenLayout
      sideBar={<SideBar calendarsList={calendarsList} />}
      calendar={<LifeCalendar />}
    />
  )
}
