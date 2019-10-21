import React, { Component } from 'react'
import plupload from 'plupload'
import classNames from 'classnames'

import { isImage, getFileExt, urlCreator } from '../../utils'
import { ProgressBar } from '../Loaders'

import './UploaderFile.css'
import OverlaySpinner from '../Loaders/OverlaySpinner'
import { Button } from '../Button'

window.pl = plupload
class UploaderFile extends Component {
  constructor () {
    super()

    this.state = {
      uploading: false,
      progress: 0
    }
  }

  renderUpload () {
    const { progress, status, className, onRemoveClick, mimeType, name, errorMessage } = this.props

    const clsName = classNames('uploader-image', className, { 'uploader-image__failed': status === plupload.FAILED })

    return <div className={clsName} data-error={errorMessage}>
      { status === plupload.QUEUED ? <OverlaySpinner backgroundColor={'rgba(255, 255, 255, 0.9)'} /> : null }
      { status === plupload.STARTED ? <div className='uploader-image__progress'><ProgressBar progress={progress} /></div> : null }
      { status === plupload.DONE || status === plupload.FAILED ? <Button className='uploader-image__remove' onClick={(e) => { onRemoveClick(e) }}>×</Button> : null }

      {
        isImage(mimeType)
          ? <img src={this.state.src} alt='' />
          : (
            <div className='file-view'>
              <div className='file-view__ext' data-mime-type={mimeType}>{ getFileExt(name) }</div>
              <div className='file-view__name'>{ name }</div>
            </div>
          )
      }
    </div>
  }

  componentDidMount () {
    const url = urlCreator.createObjectURL(this.props.native)

    this.setState({
      src: url
    })
  }

  render () {
    return <div className='media-item'>
      {
        this.renderUpload()
      }
    </div>
  }
}

export default UploaderFile
