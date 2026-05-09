import { Component, type ErrorInfo, type ReactNode } from 'react'

interface Props {
  children: ReactNode
  fallback?: ReactNode
}

interface State {
  hasError: boolean
}

/**
 * Standard Error Boundary to prevent a single component crash 
 * (like a 3D gallery calculation error) from taking down the entire app.
 */
export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  }

  public static getDerivedStateFromError(_: Error): State {
    return { hasError: true }
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo)
  }

  public render() {
    if (this.state.hasError) {
      return this.props.fallback || (
        <div className="p-8 text-center bg-slate-50 rounded-3xl border border-slate-100">
          <h2 className="text-xl font-heading font-bold text-slate-800 mb-2">Something went wrong</h2>
          <p className="text-sm text-slate-500">We encountered an issue displaying this section.</p>
          <button 
            onClick={() => this.setState({ hasError: false })}
            className="mt-4 px-4 py-2 bg-grape text-white rounded-xl text-sm font-bold"
          >
            Try again
          </button>
        </div>
      )
    }

    return this.props.children
  }
}
