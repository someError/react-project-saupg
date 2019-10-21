import React, { PureComponent } from 'react'
import Animate from 'rc-animate'
import anime from 'animejs'

const DEFAULT_ANIMATE_PARAMS = {
  easing: 'easeInOutQuad'
}

class SlideAnimation extends PureComponent {
  constructor () {
    super()

    this.appear = this.appear.bind(this)
    this.leave = this.leave.bind(this)
  }

  appear (node, done) {
    const animateTo = node.clientHeight

    node.style.height = '0px'
    node.style.overflow = 'hidden'

    const animation = anime(
      Object.assign(
        {
          duration: this.props.duration
        },
        {
          targets: node,
          height: `${animateTo}px`
        },
        DEFAULT_ANIMATE_PARAMS
      )
    )

    animation.finished
      .then(() => {
        node.style.overflow = ''
        node.style.height = 'auto'
        done()
      })

    return {
      stop: () => {
        animation.pause()
      }
    }
  }

  leave (node, done) {
    node.style.overflow = 'hidden'

    const animation = anime(
      Object.assign(
        {
          duration: this.props.duration
        },
        {
          targets: node,
          height: '0px'
        },
        DEFAULT_ANIMATE_PARAMS
      )
    )

    animation.finished.then(done)

    return {
      stop: function () {
        animation.pause()
      }
    }
  }

  render () {
    const { children, component, ...props } = this.props

    return <Animate
      component={component}
      animation={
        {
          appear: this.appear,

          enter: function () {
            this.appear.apply(this, arguments)
          },

          leave: this.leave
        }
      }
      {...props}
    >
      {children}
    </Animate>
  }
}

SlideAnimation.defaultProps = {
  component: '',
  duration: 250
}

export default SlideAnimation
