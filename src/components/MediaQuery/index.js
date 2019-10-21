import { PureComponent, Children } from 'react'
import PropTypes from 'prop-types'

/**
 * Компонент для «программного» адаптива.
 * использование: <MediaQuery rule='(max-width: 1000px)'><div>видно при ширине окна <=1000</div></MediaQuery>
 * принимает свойство rule – любой валидный css media query
 * если указанный media query матчится, то содержимое компонента отрендерится, в противном случае – ничего не выведется
 */
class MediaQuery extends PureComponent {
  constructor () {
    super()

    this.state = {
      matches: false
    }

    this.changeListener = this.changeListener.bind(this)
  }

  changeListener () {
    this.setState({
      matches: this.matchMedia.matches
    })
  }

  componentDidMount () {
    this.matchMedia = matchMedia(this.props.rule)

    this.setState({
      matches: this.matchMedia.matches
    })

    this.matchMedia.addListener(this.changeListener)
  }

  componentWillUnmount () {
    this.matchMedia.removeListener(this.changeListener)
  }

  render () {
    const { children } = this.props
    const { matches } = this.state

    return matches ? Children.only(children) : null
  }
}

MediaQuery.propTypes = {
  rule: PropTypes.string.isRequired
}

export default MediaQuery
