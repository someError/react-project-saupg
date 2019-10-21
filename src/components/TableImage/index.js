import React from 'react'
import Modal from 'react-modal'
import { ReactImageMagnifyTouch } from 'react-image-magnify'

export default class TableImage extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      modalIsOpen: false,
      imgSize: {}
    }
    this.onImgLoad = this.onImgLoad.bind(this)
  }
  onImgLoad (e) {
    this.setState({imgSize: {
      height: e.target.offsetHeight,
      width: e.target.offsetWidth
    }})
  }
  render () {
    const { state } = this
    const { imageSrc, title } = this.props
    const { width, height } = state.imgSize
    return <div>
      <div className='table-image'>
        <a href='#' onClick={e => { e.preventDefault(); this.setState({modalIsOpen: true}) }}>
          <img src={imageSrc} onLoad={this.onImgLoad} alt={title} />
        </a>
        <div className='table-image__text'>Кликните по картинке, чтобы увеличить изображение.</div>
      </div>
      <Modal
        isOpen={state.modalIsOpen}
        onRequestClose={() => this.setState({modalIsOpen: false})}
        contentLabel='Modal'
      >
        {title && <h1>{title}</h1>}
        <ReactImageMagnifyTouch {...{
          smallImage: {
            alt: title,
            isFluidWidth: true,
            src: imageSrc
          },
          largeImage: {
            alt: '',
            src: imageSrc,
            width: width * 1.5,
            height: height * 1.5
          }
        }} />
      </Modal>
    </div>
  }
}
