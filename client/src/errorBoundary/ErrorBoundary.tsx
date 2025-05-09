import React, { Component } from 'react'

export default class ErrorBoundary extends Component <any, any> {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: any) {
    return { hasError: true }
  }


  render() {
    if(this.state.hasError) {
      return this.props.fallback
    }

    return this.props.children
  }
}