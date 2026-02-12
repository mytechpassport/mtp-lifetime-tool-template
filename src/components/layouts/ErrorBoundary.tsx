import React, { Component, ErrorInfo, ReactNode } from "react";
import { DefaultErrorFallback } from "./DefaultErrorFallback";

/**
 * Props for ErrorBoundary component
 */
interface Props {
  children: ReactNode;
  fallback?: React.ComponentType<{ error: Error; retry: () => void }>;
}

/**
 * State for ErrorBoundary component
 */
interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

/**
 * Error boundary component that catches React errors and displays fallback UI
 *
 * @remarks
 * Provides error recovery mechanisms including retry functionality
 * and automatic error reporting for debugging purposes
 */
export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    };
  }

  /**
   * Static method to update state when an error occurs
   */
  static getDerivedStateFromError(error: Error): Partial<State> {
    return {
      hasError: true,
      error,
    };
  }

  /**
   * Lifecycle method called when an error occurs
   */
  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    this.setState({
      error,
      errorInfo,
    });

    // Log error for debugging
    // console.error("ErrorBoundary caught an error:", error);
    // console.error("Error info:", errorInfo);
  }

  /**
   * Retry mechanism to reset error state
   */
  private handleRetry = (): void => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
    });
  };

  render(): ReactNode {
    const { hasError, error } = this.state;
    const { children, fallback: CustomFallback } = this.props;

    if (hasError && error) {
      // Use custom fallback if provided, otherwise use default
      if (CustomFallback) {
        return <CustomFallback error={error} retry={this.handleRetry} />;
      }

      return <DefaultErrorFallback error={error} retry={this.handleRetry} />;
    }

    return children;
  }
}
