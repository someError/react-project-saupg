import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Animation from 'rc-animate'

import './UploaderWidget.css'

import Uploader from './Uploader'
import UploaderImage from './UploaderFile'
import { noop } from '../../utils/index'

const replaceFile = (files = [], file) => {
  return files.reduce((res, f) => {
    res.push(file.id === f.id ? file : f)

    return res
  }, [])
}

/**
 * Виджет загрузки файлов. Построен с использованием компонента Uploader. Уже включает в себя прогрессы загрузки и превью файлов
 *
 * поддерживаемые св-ва:
 * multiple
 * autoUpload
 * filters
 *
 * События:
 * onUploadComplete
 * onStart
 * onStop
 *
 * Эти св-ва идентичны таким же из компонента Uploader
 *
 * onFileUploaded – завершение загрузки одного файла, в параметре – JSON ответа от сервера
 */
class UploaderWidget extends Component {
  constructor () {
    super()

    this.state = {
      files: []
    }
  }

  addFiles (files) {
    this.setState({
      files: this.state.files.concat(files)
    })
  }

  updateFile (file, extension = {}) {
    this.setState({
      files: replaceFile(this.state.files, Object.assign(file, extension))
    })
  }

  removeFile (f) {
    if (!Array.isArray(f)) {
      f = [f]
    }

    this.setState({
      files: this.state.files.filter((file) => f.indexOf(file) < 0)
    })
  }

  resetFiles () {
    this.setState({ files: [] })
  }

  componentDidMount () {
    this.pl = this.uploader.pl
  }

  componentWillReceiveProps (nextProps) {
    if (this.props.loaderId !== nextProps.loaderId) {
      this.resetFiles()
    }
  }

  render () {
    const {
      multiple,
      filters,
      autoUpload,
      onUploadComplete,
      onFileUploaded,
      onStart,
      onStop,
      onRemove,
      customImg
    } = this.props

    return <div className='media-wrapper'>
      <Uploader
        ref={(uploader) => {
          this.uploader = uploader
        }}
        autoUpload={autoUpload}
        multiple={multiple}
        filters={filters}
        onStart={onStart}
        onStop={onStop}
        customImg={customImg}
        onError={(pl, error) => { this.updateFile(error.file, { errorMessage: error.message }) }}
        onUploadProgress={(pl, file) => {
          this.updateFile(file)
        }}
        onFileUploaded={(pl, file, result) => {
          const response = JSON.parse(result.response)
          onFileUploaded(response)
          this.updateFile(file)
        }}
        onFilesAdded={(pl, files) => {
          this.addFiles(files)
        }}
        onUploadComplete={onUploadComplete}
        onFilesRemoved={(pl, files) => {
          this.removeFile(files)
          onRemove && onRemove(files)
        }}
      >
        <span className='uploader-widget__btn'>+</span>
      </Uploader>

      <Animation transitionName='fade'>
        { this.state.files.map((f) => <UploaderImage errorMessage={f.errorMessage} name={f.name} mimeType={f.type} onRemoveClick={() => { this.pl.removeFile(f) }} native={f.getNative()} key={f.id} status={f.status} progress={f.percent} />) }
      </Animation>
    </div>
  }
}

UploaderWidget.defaultProps = {
  onUploadComplete: noop,
  onStart: noop,
  onStop: noop,
  onFileUploaded: noop,
  multiple: true,
  autoUpload: true
}

UploaderWidget.propTypes = {
  onUploadComplete: PropTypes.func,
  onStart: PropTypes.func,
  onStop: PropTypes.func,
  onFileUploaded: PropTypes.func,
  multiple: PropTypes.bool,
  autoUpload: PropTypes.bool,
  loaderId: Number
}

export default UploaderWidget
