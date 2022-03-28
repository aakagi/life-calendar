export const GOOGLE_CLIENT_ID = process.env.NEXT_PUBLIC__GOOGLE_CLIENT_ID as string
export const GOOGLE_CALENDAR_DISCOVERY_DOC =
  'https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest'
export const GOOGLE_CALENDAR_SCOPE = 'https://www.googleapis.com/auth/calendar'

export const config = {
  clientId: GOOGLE_CLIENT_ID,
  discoveryDocs: [GOOGLE_CALENDAR_DISCOVERY_DOC],
  scope: GOOGLE_CALENDAR_SCOPE,
}

export default config
