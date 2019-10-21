import React from 'react'
import DayPickerInput from 'react-day-picker/DayPickerInput'
import LocaleUtils from 'react-day-picker/moment'
import 'react-day-picker/lib/style.css'
import classnames from 'classnames'

import './Input.css'
import './InputDate.css'

const DAY_PICKER_DEFAULT_PROPS = {
  localeUtils: LocaleUtils,
  locale: 'ru'
}

const InputDate = ({ className, dayPickerProps, format = 'DD.MM.YYYY', ...otherProps }) => {
  const inputClass = classnames('form_input', 'input-date', className)

  // let styles = {
  //   backgroundImage: `url(${calendarIconBg})`
  // }

  return <div className='input-date-wrapper'>
    <DayPickerInput
      {...otherProps}
      className={inputClass}
      format={format}
      dayPickerProps={Object.assign({}, DAY_PICKER_DEFAULT_PROPS, dayPickerProps)}
    />
  </div>
}

export default InputDate
