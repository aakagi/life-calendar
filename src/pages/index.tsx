import Head from 'next/head'
import MainScreen from '../screens/MainScreen'

export default function () {
  return (
    <>
      <Head>
        <title>Life Calendar</title>
        <meta name="description" content="A calendar for planning out life!" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <MainScreen />
    </>
  )
}
