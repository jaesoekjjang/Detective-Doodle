import React from 'react';

interface ErrorBoundaryProps {
  children: React.ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
  info: React.ErrorInfo | null;
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps> {
  state: ErrorBoundaryState = { hasError: false, error: null, info: null };

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    this.setState({ hasError: true, error, info });
  }

  render() {
    if (this.state.hasError && this.state.error) {
      return <h1>Error:{this.state.error.name} has occured.</h1>;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
