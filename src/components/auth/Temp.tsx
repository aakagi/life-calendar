import Script from 'next/script'
import { useEffect, useRef, useState } from 'react'
import { loadGoogleApiClient } from 'utils/gapi-client/loadGoogleApiClient'

export function LifeCalendar() {
  const [hasScriptLoaded, setHasScriptLoaded] = useState(false)

  return (
    <div>
      <p>Google Calendar API Quickstart</p>

      <br />
      <br />

      <button id="authorize_button" style={{ display: 'none' }}>
        Authorize
      </button>

      <button id="signout_button" style={{ display: 'none' }}>
        Sign Out
      </button>

      <pre id="content" style={{ whiteSpace: 'pre-wrap' }} />

      <Script
        async
        defer
        src="https://apis.google.com/js/api.js"
        onLoad={async () => {
          const authorizeButton = document.getElementById('authorize_button')
          const signoutButton = document.getElementById('signout_button')

          // gapi.load('client:auth2', initClient)
          loadGoogleApiClient()
            .then(() => {
              gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus)

              // Handle the initial sign-in state.
              updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get())
              authorizeButton.onclick = handleAuthClick
              signoutButton.onclick = handleSignoutClick
            })
            .catch((error) => {
              appendPre(JSON.stringify(error, null, 2))
            })

          /**
           *  Called when the signed in status changes, to update the UI
           *  appropriately. After a sign-in, the API is called.
           */
          function updateSigninStatus(isSignedIn) {
            if (isSignedIn) {
              authorizeButton.style.display = 'none'
              signoutButton.style.display = 'block'
              listCalendars()
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
          function appendPre(message: string) {
            const pre = document.getElementById('content')
            const textContent = document.createTextNode(message + '\n')
            pre.appendChild(textContent)
          }

          function listCalendars() {
            gapi.client.calendar.calendarList.list({}).then(function (response) {
              appendPre('\n\n')
              console.log('response', response)
              const calendars = response.result.items
              appendPre('Available Calendars:')

              if (calendars && calendars.length > 0) {
                for (const calendar of calendars) {
                  console.log('calendar', calendar)
                  appendPre(calendar.summary + ' - id: ' + calendar.id)
                }
              } else {
                appendPre('No calendars.')
              }
            })
          }

          /**
           * Print the summary and start datetime/date of the next ten events in
           * the authorized user's calendar. If no events are found an
           * appropriate message is printed.
           */
          function listUpcomingEvents() {
            gapi.client.calendar.events
              .list({
                // calendarId: 'primary',
                calendarId: '2fmdnq646diictdfvnj5e0ucfo@group.calendar.google.com',
                // timeMin: new Date().toISOString(),
                showDeleted: false,
                singleEvents: true,
                maxResults: 100,
                orderBy: 'startTime',
              })
              .then(function (response) {
                appendPre('\n\n')
                const events = response.result.items
                appendPre('Upcoming events:')

                if (events && events.length > 0) {
                  console.log('events', events)
                  for (const event of events) {
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
        }}
      />
    </div>
  )
}
