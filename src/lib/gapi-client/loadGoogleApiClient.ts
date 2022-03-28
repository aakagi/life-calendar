import config from './config'

export const GOOGLE_API_SCRIPT_SRC = 'https://apis.google.com/js/api.js'

// TODO: Report to developers?
function __verifyGoogleApiIsDefined() {
  if (typeof gapi === 'undefined') {
    const ERROR_MESSAGE = 'gapi client failed to load.'
    console.error(ERROR_MESSAGE)
    throw new Error(ERROR_MESSAGE)
  }
}

export function initGoogleApiClient() {
  __verifyGoogleApiIsDefined()
  return gapi.client.init({
    clientId: config.clientId,
    discoveryDocs: config.discoveryDocs,
    scope: config.scope,
  })
}

export function loadGoogleApiClient() {
  __verifyGoogleApiIsDefined()
  return new Promise<void>((resolve, reject) => {
    gapi.load('client:auth2', () => {
      initGoogleApiClient()
        .then(() => {
          resolve()
        })
        .catch((error) => reject(error))
    })
  })
}
