/*
 * A basic 'slider' react component
 * always displays one of it's children based on it's state.shows
 * basic usage included inside the Main component
 */

import React, { Component } from 'react';

const styles = {
  slider: {
    display: 'flex',
    flex: 1,
    flexDirection: 'row'
  }
}

class Slider extends Component {
  constructor(props) {
    super(props);
    self.SIZE = React.Children.count(this.props.children);
    // maybe could transition to use react-measure in the future
    self.width = this.props.width? this.props.width : window.innerWidth
    this.state = {
      show: 0,
    };
  }
  // adding flex 1 to all children
  children = React.Children.map(this.props.children, function(child) {
    return React.cloneElement(child, {style: {flex: 1}})
  }, this)

  // shows the next slide
  next(){
    const next = (this.state.show + 1) % self.SIZE
    this.setState({show: next})
  }

  render(){
    return (
      <div style={{overflowX: 'hidden', width: self.width}}>
        <div style={{...styles.slider, width: self.SIZE * self.width,
          marginLeft: - this.state.show * self.width}}>
          {this.children}
        </div>
      </div>
    )
  }
}

class Main extends Component {
  next(){
    this.refs.slider.next()
  }
  render() {
    return (
      <div>
        <Slider width={300} ref='slider'>
          <div>Hello</div>
          <div>Hello again</div>
        </Slider>
        <div onClick={this.next.bind(this)}> Next </div>
      </div>
    );
  }
}

export default Main;
