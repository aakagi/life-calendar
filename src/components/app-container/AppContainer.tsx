import { useState } from 'react'
import Script from 'next/script'

import { loadGoogleApiClient } from 'lib/gapi-client'

import { Hydrate, QueryClient, QueryClientProvider } from 'react-query'
import { useCreateStore, ZustandProvider } from 'lib/store'

function GoogleApisLoaderScript() {
  const [hasGoogleClientApiLoaded, setHasGoogleClientApiLoaded] = useState(false)
  console.log('hasGoogleClientApiLoaded', hasGoogleClientApiLoaded)

  return (
    <Script
      async
      defer
      strategy="afterInteractive"
      src="https://apis.google.com/js/api.js"
      onLoad={async () => {
        // const authorizeButton = document.getElementById('authorize_button')
        // const signoutButton = document.getElementById('signout_button')

        // gapi.load('client:auth2', initClient)
        loadGoogleApiClient()
          .then(() => {
            setHasGoogleClientApiLoaded(true)
            console.log(
              'gapi.auth2.getAuthInstance().isSignedIn.get()',
              gapi.auth2.getAuthInstance().isSignedIn.get(),
            )

            gapi.auth2
              .getAuthInstance()
              .isSignedIn.listen((isSignedIn) => console.log('isSignedIn', isSignedIn))

            // Handle the initial sign-in state.
            // updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get())
            // authorizeButton.onclick = handleAuthClick
            // signoutButton.onclick = handleSignoutClick
          })
          .catch((error) => {
            console.log('error', error)
          })
      }}
    />
  )
}

type AppContainerProps = {
  children: React.ReactElement
  dehydratedState: any
  // initialZustandState: any
}

export function AppContainer(props: AppContainerProps) {
  const { children, dehydratedState, initialZustandState } = props

  const [queryClient] = useState(() => new QueryClient())
  const createStore = useCreateStore(initialZustandState)

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Hydrate state={dehydratedState}>
          <ZustandProvider createStore={createStore}>
            {/*  */}
            {children}
            {/*  */}
          </ZustandProvider>
        </Hydrate>
      </QueryClientProvider>

      <GoogleApisLoaderScript />
    </>
  )
}
