import React, { Component } from 'react'
import { View, Animated } from 'react-native'
import PropTypes from 'prop-types'

class AnimatedChild extends Component {
  constructor (props) {
    super(props)
    this.state = {
      previousChildren: null,
      fadeAnimateValue: new Animated.Value(0.1),
      fadeoutAnimateValue: new Animated.Value(1)
    }
  }

  componentWillReceiveProps (nextProps) {
    const navigatingToRoute = nextProps.loc.pathname !== this.props.loc.pathname
    const navigateFromRoot = this.props.isAtParent && navigatingToRoute

    if (navigateFromRoot) {
      this.state.fadeAnimateValue.setValue(0.1)
      return Animated.timing(this.state.fadeAnimateValue, { toValue: 1, duration: 1000, useNativeDriver: true }).start()
    }

    if (navigatingToRoute) {
      this.state.fadeAnimateValue.setValue(0.1)
      this.state.fadeoutAnimateValue.setValue(1)
      this.setState({ previousChildren: this.props.children }, () => {
        Animated.timing(this.state.fadeoutAnimateValue, { toValue: 0.1, duration: 1000, useNativeDriver: true }).start(() => {
          this.setState({ previousChildren: null }, () => {
            Animated.timing(this.state.fadeAnimateValue, { toValue: 1, duration: 1000, useNativeDriver: true }).start()
          })
        })
      })
    }
  }

  render () {
    const { children } = this.props
    const { fadeAnimateValue, fadeoutAnimateValue, previousChildren } = this.state
    return (
      <View style={{ flex: 1 }}>
        {previousChildren && <Animated.View style={{ backgroundColor: '#ecf0f1', opacity: fadeoutAnimateValue }}>
          {previousChildren}
        </Animated.View>}
        <Animated.View style={{ backgroundColor: '#ecf0f1', opacity: fadeAnimateValue }}>
          {children}
        </Animated.View>
      </View>
    )
  }
}

AnimatedChild.propTypes = {
  isAtParent: PropTypes.bool,
  loc: PropTypes.any
}

export default AnimatedChild
