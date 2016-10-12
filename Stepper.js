/**
 * Stepper React Native component
 * children must have flex: 1 styling
 * receives 'position' prop and shows that element
 */

import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Dimensions,
  Animated
} from 'react-native';

let screen = Dimensions.get("window");

class Stepper extends Component {

  SIZE = React.Children.count(this.props.children);

  constructor(props) {
  super(props);
    this.state = {
      position: new Animated.Value(0),
    };
  }
  componentWillMount(){
    this.state.position.setValue(- screen.width * this.props.position)
  }
  componentWillReceiveProps(nextProps){
    Animated.spring(
      this.state.position,
      {
        toValue: - screen.width * nextProps.position,
        friction: 10
      }
    ).start()
  }
  render() {
    return (
      <Animated.View style={[styles.container, {
        width: screen.width * this.SIZE,
        left: this.state.position
      }]}>
        {this.props.children}
      </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row'
  }
});

module.exports = Stepper;
