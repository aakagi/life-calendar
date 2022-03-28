import { calendarSectionsData } from './side-bar-mock-data'

import { request } from 'graphql-request'

import { useQuery } from 'react-query'

export const GET_SIDE_BAR_CALENDAR_QUERY_KEY = 'side-bar-calendars'

// export function

export function getSideBarCalendars() {
  return calendarSectionsData
}

export function useGetSideBarCalendars() {
  return useQuery(GET_SIDE_BAR_CALENDAR_QUERY_KEY, getSideBarCalendars)
}
