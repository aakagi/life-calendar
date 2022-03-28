import React from 'react'
import { NextPage, GetServerSideProps } from 'next'
import Head from 'next/head'

import { Calendar } from 'components/calendar/Calendar'
import { SideBar } from 'components/side-bar/SideBar'
import {
  getSideBarCalendars,
  GET_SIDE_BAR_CALENDAR_QUERY_KEY,
} from 'lib/calendars-client/getSideBarCalendars'

import { dehydrate, QueryClient } from 'react-query'

export const getServerSideProps: GetServerSideProps = async (context) => {
  const queryClient = new QueryClient()
  await queryClient.prefetchQuery(GET_SIDE_BAR_CALENDAR_QUERY_KEY, getSideBarCalendars)

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  }
}

const Page: NextPage = function LifeCalendarPage(props) {
  return (
    <>
      <Head>
        <title>Life Calendar</title>
        <meta name="description" content="A calendar for planning out life!" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="w-full min-h-screen flex flex-col">
        <div className="flex flex-1">
          <div className="flex flex-col">
            <SideBar />
          </div>
          <div className="flex flex-1 flex-col">
            <Calendar />
          </div>
        </div>
      </div>
    </>
  )
}

export default Page
