import React from 'react'
import './styles.css'
import { OverlaySpinner } from '../Loaders'
import classnames from 'classnames'

export default class Avatar extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      imageIsLoaded: false
    }
  }
  render () {
    const { src, className } = this.props
    const { state } = this
    const classNames = classnames('avatar', className, { 'loaded': state.imageIsLoaded })
    return <div className={classNames}>
      {!state.imageIsLoaded && src && <OverlaySpinner />}
      { src && <img src={src} onLoad={() => this.setState({ imageIsLoaded: true })} alt='avatar' /> }
    </div>
  }
}
