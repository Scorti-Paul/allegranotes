import React, { Component, ReactNode } from "react";

type Props = {
  children: ReactNode;
};

type State = {
  hasError: boolean;
  error?: Error;
};

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: undefined };
  }

  static getDerivedStateFromError(error: Error) {
    // Update state to display fallback UI
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("Error caught by ErrorBoundary:", error, errorInfo);
    // Optionally send logs to an external monitoring service
  }

  handleReset = () => {
    this.setState({ hasError: false, error: undefined });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="h-screen flex flex-col items-center justify-center bg-red-100 text-center p-5">
          <h2 className="text-red-600 text-2xl font-bold">Something went wrong!</h2>
          <p className="text-gray-700">{this.state.error?.message}</p>
          <button
            className="mt-3 px-4 py-2 bg-indigo-500 text-white rounded hover:bg-indigo-600"
            onClick={this.handleReset}
          >
            Try Again
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
