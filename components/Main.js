import React, { Component } from 'react'
import { Switch } from 'react-router'
import { Route } from 'react-router-native'
import Page1 from './Page1'
import Page2 from './Page2'
import AnimatedChild from './AnimatedChild'

export default class Main extends Component {
  render () {
    return (
      <AnimatedChild style={{ flex: 1 }} isAtParent={this.props.match.isExact} loc={this.props.location}>
        <Switch location={this.props.location}>
          <Route path='/page1' component={Page1} />
          <Route path='/page2' component={Page2} />
        </Switch>
      </AnimatedChild>
    )
  }
}
