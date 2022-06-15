import React, { Component } from 'react';

export default class BodyWrapper extends Component {

  render() {
    return (
      <>
        {this.props.children}
      </>
    )
  }
}
