import React from 'react'
import DayPicker from 'react-day-picker'
import LocaleUtils from 'react-day-picker/moment'

import 'react-day-picker/lib/style.css'

const dayPickerProps = {
  localeUtils: LocaleUtils,
  locale: 'ru'
}

const Calendar = (props) => {
  return <DayPicker
    {...dayPickerProps}
  />
}

export default Calendar
