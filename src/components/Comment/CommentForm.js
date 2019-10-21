import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { Button } from '../Button'
import { TextArea, Label } from '../Form'

import './CommentForm.css'

class CommentForm extends Component {
  render () {
    const { props } = this
    const { label, placeholder, onChange, onSubmit } = props
    return (
      <form className='comment-form' onSubmit={onSubmit}>
        { label && <Label>{ label }</Label> }
        <TextArea onChange={onChange} placeholder={placeholder} className='comment-textarea' />
        <Button>Отправить</Button>
      </form>
    )
  }
}

CommentForm.defaultProps = {
  onSubmit: () => {}
}

CommentForm.propTypes = {
  onSubmit: PropTypes.func,
  label: PropTypes.string,
  onChange: PropTypes.func,
  placeholder: PropTypes.string
}

export default CommentForm
