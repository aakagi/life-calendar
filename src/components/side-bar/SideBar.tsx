import cx from 'classnames'
import { useGetSideBarCalendars } from 'lib/calendars-client/getSideBarCalendars'
import Link from 'next/link'
import { useStore } from 'lib/store'

const SIDEBAR_PADDING_TW_CLASSES = 'pl-6 pr-2'

type SideBarCalendarItemProps = {
  id: string
  color: string
  name: string
  isVisible: boolean
  isActive: boolean
}

export function SideBarCalendarItem(props: SideBarCalendarItemProps) {
  const { name, color, isActive, isVisible } = props
  const FONT_SIZE = 14

  return (
    <div className="flex items-center">
      <div
        onClick={() => {
          isVisible
        }}
        className="rounded-full mr-2 border cursor-pointer"
        style={{
          backgroundColor: isVisible ? color : 'white',
          borderColor: color,
          width: FONT_SIZE,
          height: FONT_SIZE,
        }}
      />
      <div
        className="font-normal text-gray-600 cursor-pointer"
        style={{ fontSize: FONT_SIZE, lineHeight: 1 }}
      >
        {name}
      </div>
    </div>
  )
}

export function SidebarLogoHeader() {
  return (
    <Link href="/">
      <a>
        <h1 className="">Life Calendar</h1>
      </a>
    </Link>
  )
}

// const isVisibleAtom = atom(false)

function SideBarCalendarCategoryTitle(props: SideBarCalendarCategoryTitleProps) {
  const { categoryName } = props
  return <h5 className="text-xs font-medium text-gray-500 select-none">{categoryName}</h5>
}

function TempCalendarItem(props) {
  const { tempCalendarAtom } = props

  const [{ name, abbr, isActive, isVisible }, setTempCalendar] = useAtom(tempCalendarAtom)

  const visibilityAtom = useMemo(
    () =>
      focusAtom(tempCalendarAtom, (optic) => {
        return optic.prop('isVisible')
      }),
    [isVisible],
  )

  // const toggleVisibilityAtom = atom(null, (get, set, action) => {
  //   const { isVisible } = get(tempCalendarAtom)
  //   console.log('HERE tempCalendarAtom', tempCalendarAtom)
  //   console.log('HERE isVisible', isVisible)
  //   console.log('HERE action', action)
  //   set(tempCalendarAtom, action)
  // })

  const setIsVisible = useUpdateAtom(visibilityAtom)
  // const [isVisible, setIsVisible] = useAtom(visibilityAtom)

  useEffect(() => {
    console.log('isVisible', isVisible)
  }, [])

  console.log('hi')

  // const { name, abbr, isActive } = props
  // const [isVisible, setIsVisible] = useAtom(isVisibleAtom)
  const FONT_SIZE = 10
  const TEMP_COLOR = 'rgb(156 163 175)'

  return (
    <div
      className={cx('flex items-center py-1')}
      style={{ opacity: isVisible ? '1' : '0.2' }}
    >
      <div
        onClick={() => {
          // setIsVisible((prev) => !prev)
          // setTempCalendar((prev) => ({ ...prev, isVisible: !prev.isVisible }))
          setIsVisible((prev) => !prev)
        }}
        className="rounded-full mr-2 border cursor-pointer flex items-center justify-center"
        style={{
          // backgroundColor: isVisible ? TEMP_COLOR : 'white',
          backgroundColor: TEMP_COLOR,
          borderColor: TEMP_COLOR,
          width: FONT_SIZE * 2.3,
          height: FONT_SIZE * 2.3,
          // opacity: isVisible ? '1' : '0.2',
        }}
      >
        <div
          className="select-none font-bold"
          style={{
            // color: isVisible ? 'white' : TEMP_COLOR,
            color: 'white',
            fontSize: FONT_SIZE,
          }}
        >
          {abbr}
        </div>
      </div>
      <div
        onClick={() => {
          setTempCalendar((prev) => ({ ...prev, isActive: !prev.isActive }))
        }}
        className="text-gray-600 cursor-pointer select-none"
        style={{
          fontSize: 14,
          lineHeight: `${14}px`,
          // color: isActive ? 'white' : TEMP_COLOR,
        }}
      >
        {name}
      </div>
    </div>
  )
}

function SideBarCalendarSections() {
  return (
    <div>
      {/* {calendarSections.map(({ id, categoryName, categoryCalendars }) => (
          <div key={id} className="mb-4">
            <div className={cx(SIDEBAR_PADDING_TW_CLASSES, 'py-1')}>
              <h5 className="text-xs font-medium text-gray-500 select-none hover:select-text">
                {categoryName}
              </h5>
            </div>

            {categoryCalendars.map((calendarListItemData) => (
              <div
                key={calendarListItemData.id}
                className={cx(SIDEBAR_PADDING_TW_CLASSES, 'py-2')}
              >
                <SideBarCalendarItem {...calendarListItemData} />
              </div>
            ))}
          </div>
        ))} */}
    </div>
  )
}

export function SideBar() {
  useGetSideBarCalendars()

  const count = useStore((state) => state.count)

  console.log('count', count)

  return (
    <div className="bg-blue-0 flex-1 border-r" style={{ width: '200px' }}>
      <div className={cx(SIDEBAR_PADDING_TW_CLASSES, 'my-6')}>
        <SidebarLogoHeader />
      </div>
      <div>
        <SideBarCalendarSections />
      </div>
    </div>
  )
}
