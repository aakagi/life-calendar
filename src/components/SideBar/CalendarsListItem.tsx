import { CalendarsListItemData } from 'data'

type Props = CalendarsListItemData & {
  // TODO
}

export function CalendarsListItem(props: Props) {
  const { name, category } = props
  return (
    <div>
      <div>{name}</div>
      <div>{category}</div>
    </div>
  )
}
