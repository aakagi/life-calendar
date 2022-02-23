import Script from 'next/script'

export function LifeCalendar() {
  return (
    <>
      <p>Google Calendar API Quickstart</p>

      <button id="authorize_button" style={{ display: 'none' }}>
        Authorize
      </button>
      <button id="signout_button" style={{ display: 'none' }}>
        Sign Out
      </button>

      <pre id="content" style={{ whiteSpace: 'pre-wrap' }} />

      <Script
        // async
        // defer
        // strategy="beforeInteractive"
        src="https://apis.google.com/js/api.js"
        // onload="this.onload=function(){};handleClientLoad()"
        // onreadystatechange="if (this.readyState === 'complete') this.onload()"
        onLoad={() => {
          // Client ID and API key from the Developer Console
          const CLIENT_ID = process.env.NEXT_PUBLIC__GOOGLE_CLIENT_ID

          // Array of API discovery doc URLs for APIs used by the quickstart
          const DISCOVERY_DOCS = [
            'https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest',
          ]

          // Authorization scopes required by the API; multiple scopes can be
          // included, separated by spaces.
          const SCOPES = 'https://www.googleapis.com/auth/calendar'

          const authorizeButton = document.getElementById('authorize_button')
          const signoutButton = document.getElementById('signout_button')

          /**
           *  On load, called to load the auth2 library and API client library.
           */
          function handleClientLoad() {
            gapi.load('client:auth2', initClient)
          }

          /**
           *  Initializes the API client library and sets up sign-in state
           *  listeners.
           */
          function initClient() {
            gapi.client
              .init({
                clientId: CLIENT_ID,
                discoveryDocs: DISCOVERY_DOCS,
                scope: SCOPES,
              })
              .then(
                function () {
                  // Listen for sign-in state changes.
                  gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus)

                  // Handle the initial sign-in state.
                  updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get())
                  authorizeButton.onclick = handleAuthClick
                  signoutButton.onclick = handleSignoutClick
                },
                function (error) {
                  appendPre(JSON.stringify(error, null, 2))
                },
              )
          }

          /**
           *  Called when the signed in status changes, to update the UI
           *  appropriately. After a sign-in, the API is called.
           */
          function updateSigninStatus(isSignedIn) {
            if (isSignedIn) {
              authorizeButton.style.display = 'none'
              signoutButton.style.display = 'block'
              listUpcomingEvents()
            } else {
              authorizeButton.style.display = 'block'
              signoutButton.style.display = 'none'
            }
          }

          /**
           *  Sign in the user upon button click.
           */
          function handleAuthClick() {
            gapi.auth2.getAuthInstance().signIn()
          }

          /**
           *  Sign out the user upon button click.
           */
          function handleSignoutClick() {
            gapi.auth2.getAuthInstance().signOut()
          }

          /**
           * Append a pre element to the body containing the given message
           * as its text node. Used to display the results of the API call.
           *
           * @param {string} message Text to be placed in pre element.
           */
          function appendPre(message) {
            const pre = document.getElementById('content')
            const textContent = document.createTextNode(message + '\n')
            pre.appendChild(textContent)
          }

          /**
           * Print the summary and start datetime/date of the next ten events in
           * the authorized user's calendar. If no events are found an
           * appropriate message is printed.
           */
          function listUpcomingEvents() {
            gapi.client.calendar.events
              .list({
                calendarId: 'primary',
                timeMin: new Date().toISOString(),
                showDeleted: false,
                singleEvents: true,
                maxResults: 10,
                orderBy: 'startTime',
              })
              .then(function (response) {
                const events = response.result.items
                appendPre('Upcoming events:')

                if (events && events.length > 0) {
                  for (let i = 0; i < events.length; i++) {
                    const event = events[i]
                    console.log('event', event)
                    let when = event.start.dateTime
                    if (!when) {
                      when = event.start.date
                    }
                    appendPre(event.summary + ' (' + when + ')')
                  }
                } else {
                  appendPre('No upcoming events found.')
                }
              })
          }
          handleClientLoad()
        }}
      />
    </>
  )
}
