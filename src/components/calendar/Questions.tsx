import { useState } from 'react'

function IndentedQuestion(props) {
  const { children } = props
  return <div className="ml-4 font-normal">{children}</div>
}

function IndentedAnswer(props) {
  const { children } = props

  return <div className="ml-4 font-bold">{children}</div>
}

export function Questions() {
  const [isGoogleCalendarAvailable] = useState(false)

  return (
    <div>
      <IndentedQuestion>
        - My goal is to climb an average of 2.5 times per week in 2022. What is my average
        so far?
        <IndentedQuestion>
          - How many days have I climbed in 2022, according to my calendar(s)?
          <IndentedQuestion>
            - Which calendar(s) do I use for documenting my climbing days?
            <IndentedQuestion>
              - Which calendar apps do I use to keep track of my climbing calendar days?
              <IndentedAnswer>
                A: Google Calendar
                <IndentedQuestion>
                  - How do I know if I'm authenticated into Google Calendar?
                  <IndentedAnswer>{`${isGoogleCalendarAvailable}`}</IndentedAnswer>
                </IndentedQuestion>
              </IndentedAnswer>
            </IndentedQuestion>
            <IndentedQuestion>- Which calendars are available to me?</IndentedQuestion>
          </IndentedQuestion>
        </IndentedQuestion>
      </IndentedQuestion>
    </div>
  )
}
