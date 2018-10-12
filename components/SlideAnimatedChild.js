import React, { Component } from 'react'
import { Animated, Dimensions } from 'react-native'
import PropTypes from 'prop-types'

const screenWidth = Dimensions.get('window').width

class SlideAnimatedChild extends Component {
  constructor (props) {
    super(props)
    this.state = {
      slideAnimatePosition: new Animated.Value(screenWidth)
    }
  }

  componentWillReceiveProps (nextProps) {
    if (this.props.isVisible !== nextProps.isVisible) {
      Animated.spring(this.state.slideAnimatePosition,
        { toValue: nextProps.isVisible ? 0 : screenWidth, useNativeDriver: true }).start()
    }
  }

  render () {
    const { children } = this.props
    const { slideAnimatePosition } = this.state
    return (
      <Animated.View style={{ flex: 1,
        transform: [ {
          translateX: slideAnimatePosition
        }] }}>
        {children}
      </Animated.View>
    )
  }
}

SlideAnimatedChild.propTypes = {
  isVisible: PropTypes.bool
}

export default SlideAnimatedChild
