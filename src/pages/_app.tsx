import 'tailwindcss/tailwind.css'
import '../../public/globals.css'

import type { AppProps } from 'next/app'
import { AppContainer } from 'components/app-container'

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AppContainer
      dehydratedState={pageProps.dehydratedState}
      // initialZustandState={pageProps.initialZustandState}
    >
      <Component {...pageProps} />
    </AppContainer>
  )
}
