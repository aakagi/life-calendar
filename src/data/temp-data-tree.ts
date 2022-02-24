export type CalendarsListItemData = {
  name: string
  category: string
}

export type CalendarsListData = CalendarsListItemData[]

export type AppDataTree = {
  calendarsList: CalendarsListData
}

export const data: AppDataTree = {
  calendarsList: [
    {
      category: 'Exercise',
      name: 'Climb',
    },
  ],
}

// Exercise
// - Climb
// - Yoga

// Chores
// - Laundry

// Drugs
// - Adderall
// - Coffee
// - Alcohol
// - Hangovers

// Location
// - City
// - Flights / Transit
