import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { NativeRouter, Route, Link } from 'react-router-native'
import Main from './components/Main'
import SlideAnimatedChild from './components/SlideAnimatedChild'
import Menu from './components/Menu'

export default class App extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      isMenuOpen: false
    }
  }

  render () {
    return (
      <NativeRouter>
        <View style={styles.container}>
          <Text style={styles.welcome}>Welcome to React Native!</Text>
          <Text style={styles.instructions}>To get started, edit App.js</Text>

          <Link to="/menu" onPress={() => this.setState({isMenuOpen: !this.state.isMenuOpen})}>
            <Text>toggle menu</Text>
          </Link>

          <Link to="/page1"><Text>move to page 1</Text></Link>
          <Link to="/page2"><Text>move to page 2</Text></Link>

          <SlideAnimatedChild isVisible={this.state.isMenuOpen}>
            <Route path="/menu" component={Menu} />
            <Link to="/page1" onPress={() => this.setState({isMenuOpen: false})}><Text>go to page 1</Text></Link>
            <Link to="/page2" onPress={() => this.setState({isMenuOpen: false})}><Text>go to page 2</Text></Link>
          </SlideAnimatedChild>
          <Route path="/" component={Main} />
        </View>
      </NativeRouter>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
})
