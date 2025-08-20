"use client";

import React, { ReactNode, ErrorInfo, createContext } from "react";

export interface ErrorBoundaryContextType {
  log: (error: Error, errorInfo: ErrorInfo) => void;
}

export const ErrorBoundaryContext = createContext<ErrorBoundaryContextType>({
  log(_, info) {
    console.log(info.componentStack);
  },
});

export interface ErrorBoundaryProps {
  children?: ReactNode;
  fallback?: ReactNode;
}
export interface ErrorBoundaryState {
  hasError: boolean;
}
export default class ErrorBoundary extends React.Component<ErrorBoundaryProps> {
  static readonly propTypes = {
    children: null,
    fallback: null,
  };

  static readonly contextType = ErrorBoundaryContext;
  context!: React.ContextType<typeof ErrorBoundaryContext>;

  static getDerivedStateFromError(): ErrorBoundaryState {
    return {
      hasError: true,
    };
  }

  state: ErrorBoundaryState = {
    hasError: false,
  };

  componentDidCatch(error: Error, info: ErrorInfo) {
    this.context.log(error, info);
  }

  componentDidUpdate(prevProps: ErrorBoundaryProps) {
    if (prevProps.children !== this.props.children) {
      this.setState({ hasError: false });
    }
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }
    return this.props.children;
  }
}
