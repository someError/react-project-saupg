import React, { PureComponent } from 'react'
import Input from './Input'
import { asYouType as AsYouType } from 'libphonenumber-js'
import { normalizePhoneNumber } from '../../utils/index'

class InputPhone extends PureComponent {
  constructor ({ value, maxLength }) {
    super()
    this.formatter = new AsYouType('RU')
  }

  format (val) {
    this.formatter.reset()

    return this.formatter.input(val)
  }

  onChange (e, value) {
    this.props.onChange(e, value)
  }

  componentWillReceiveProps (nextProps) {
    const { getFormattedValue, value, disabled } = this.props
    if (disabled && nextProps.value !== value) {
      getFormattedValue && getFormattedValue(() => this.format(normalizePhoneNumber(nextProps.value)))
    }
  }

  componentDidMount () {
    const { getFormattedValue, value } = this.props
    getFormattedValue && getFormattedValue(() => this.format(normalizePhoneNumber(value)))
  }

  render () {
    const { onChange, value, getFormattedValue, ...props } = this.props

    return <Input
      onChange={(e) => {
        this.onChange(e, this.format(e.target.value))
      }}
      value={this.format(normalizePhoneNumber(value))}
      {...props}
    />
  }
}

InputPhone.defaultProps = {
  onFocus: () => {},
  onChange: () => {}
}

export default InputPhone
