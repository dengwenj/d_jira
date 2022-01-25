import React, { Component, PropsWithChildren, ReactElement } from 'react';

type FallbackRender = (props: { error: Error | null }) => ReactElement

interface IProps {
  fallbackRender: FallbackRender
}

interface IState { 
  error: Error | null
}

// React 中使用错误边界要使用 class 组件
export default class ErrorBoundary extends Component<PropsWithChildren<IProps>, IState> { // 第一个是 props, 第二个是 state
  state = {
    error: null
  }

  // 当 ErrorBoundary 的子组件发生渲染错误的时候，这个方法就会被调用，返回的这个值 { error } 就会被赋给 state
  static getDerivedStateFromError(error: Error) {
    return { error }
  }
  
  render() {
    const { fallbackRender, children } = this.props
    const { error } = this.state
    
    if (error) return fallbackRender({ error })
    return children
  }
}
