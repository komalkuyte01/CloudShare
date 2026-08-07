import { StrictMode, Component } from 'react'
import { createRoot } from 'react-dom/client'
import { ClerkProvider } from '@clerk/clerk-react'
import './index.css'
import App from './App.jsx'

const clerkPublishableKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

const isKeyValid = clerkPublishableKey && clerkPublishableKey !== 'pk_test_your_publishable_key' && !clerkPublishableKey.includes('your_publishable_key');

class ErrorBoundary extends Component {
    state = { hasError: false, error: null };
    static getDerivedStateFromError(error) {
        return { hasError: true, error };
    }
    render() {
        if (this.state.hasError) {
            return (
                <div className="min-h-screen flex items-center justify-center bg-slate-900 text-white p-6">
                    <div className="max-w-md w-full bg-slate-800 border border-slate-700 rounded-2xl p-8 shadow-xl text-center">
                        <div className="w-16 h-16 bg-amber-500/10 text-amber-400 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">⚠️</div>
                        <h2 className="text-xl font-semibold mb-2">Clerk API Key Error</h2>
                        <p className="text-sm text-slate-400 mb-6">
                            The Clerk publishable key in <code className="bg-slate-950 px-2 py-1 rounded text-amber-300">frontend/.env</code> is invalid.
                        </p>
                        <div className="bg-slate-950 p-4 rounded-xl text-left text-xs font-mono text-slate-300 mb-6 overflow-x-auto border border-slate-800">
                            <p className="text-slate-500 mb-1"># Open frontend/.env and paste your Clerk Key:</p>
                            <p className="text-emerald-400">VITE_CLERK_PUBLISHABLE_KEY=pk_test_...</p>
                        </div>
                        <p className="text-xs text-slate-400">
                            Get your free key at <a href="https://dashboard.clerk.com" target="_blank" rel="noreferrer" className="text-indigo-400 hover:underline">dashboard.clerk.com</a>
                        </p>
                    </div>
                </div>
            );
        }
        return this.props.children;
    }
}

const SetupNotice = () => (
    <div className="min-h-screen flex items-center justify-center bg-slate-900 text-white p-6">
        <div className="max-w-md w-full bg-slate-800 border border-slate-700 rounded-2xl p-8 shadow-xl text-center">
            <div className="w-16 h-16 bg-indigo-500/10 text-indigo-400 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">🔐</div>
            <h2 className="text-xl font-semibold mb-2">Clerk Setup Required</h2>
            <p className="text-sm text-slate-400 mb-6">
                Please add your real Clerk Publishable Key in <code className="bg-slate-950 px-2 py-1 rounded text-indigo-300">frontend/.env</code> to run the app.
            </p>
            <div className="bg-slate-950 p-4 rounded-xl text-left text-xs font-mono text-slate-300 mb-6 overflow-x-auto border border-slate-800">
                <p className="text-slate-500 mb-1"># Open frontend/.env and update:</p>
                <p className="text-emerald-400">VITE_CLERK_PUBLISHABLE_KEY=pk_test_your_real_key</p>
            </div>
            <p className="text-xs text-slate-400">
                Get your key from <a href="https://dashboard.clerk.com" target="_blank" rel="noreferrer" className="text-indigo-400 hover:underline">dashboard.clerk.com</a>
            </p>
        </div>
    </div>
);

createRoot(document.getElementById('root')).render(
    <StrictMode>
        {!isKeyValid ? (
            <SetupNotice />
        ) : (
            <ErrorBoundary>
                <ClerkProvider publishableKey={clerkPublishableKey}>
                    <App />
                </ClerkProvider>
            </ErrorBoundary>
        )}
    </StrictMode>
)

