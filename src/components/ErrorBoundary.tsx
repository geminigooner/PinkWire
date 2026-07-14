import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RotateCcw } from 'lucide-react';

interface Props {
  children?: ReactNode;
  fallback?: ReactNode;
  onReset?: () => void;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  private handleReset = () => {
    this.setState({ hasError: false, error: undefined });
    this.props.onReset?.();
  };

  private copyDiagnostics = () => {
    if (this.state.error) {
      navigator.clipboard.writeText(this.state.error.stack || this.state.error.message);
    }
  };

  public render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="w-full h-full flex flex-col items-center justify-center p-8 bg-os-window-bg text-os-text">
          <AlertTriangle className="text-red-500 mb-4" size={48} />
          <h2 className="text-xl font-medium mb-2">Application Error</h2>
          <p className="text-os-text-muted text-sm text-center max-w-md mb-6">
            The application encountered an unexpected error and could not continue.
          </p>
          <div className="flex gap-4">
            <button
              onClick={this.handleReset}
              className="flex items-center gap-2 px-4 py-2 bg-os-accent text-white rounded hover:bg-os-accent/90 transition-colors"
            >
              <RotateCcw size={16} />
              Restart Application
            </button>
            <button
              onClick={this.copyDiagnostics}
              className="px-4 py-2 bg-black/20 text-os-text hover:bg-black/40 rounded border border-os-window-border transition-colors"
            >
              Copy Diagnostics
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
