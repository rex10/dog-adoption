// components/ErrorBoundary.tsx
import React from 'react';
import Button from './Button';

interface ErrorBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ReactElement;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Error Boundary caught:', error, errorInfo);
  }

  handleReset = () => {
    window.location.reload()
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      return this.props.fallback || (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
          <h2 className="text-lg font-semibold mb-2">Something went wrong</h2>
          <p className="mb-4">{this.state.error?.message}</p>
          <Button
            onClick={this.handleReset}
            className="bg-red-600 text-white rounded hover:bg-red-700"
          >
            Refresh
          </Button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;