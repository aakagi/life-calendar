import { LifeCalendar, SideBar } from 'components'

// import styles from './MainScreen.module.css'

type LayoutProps = {
  sideBar: React.ReactChild
  calendar: React.ReactChild
}

function MainScreenLayout(props: LayoutProps) {
  const { sideBar, calendar } = props
  return (
    <div className="bg-red-500">
      <div>{sideBar}</div>
      <div>{calendar}</div>
    </div>
  )
}

export function MainScreen() {
  return <MainScreenLayout sideBar={<SideBar />} calendar={<LifeCalendar />} />
}
