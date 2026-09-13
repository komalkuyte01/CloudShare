import { StrictMode, Component } from "react";
import { createRoot } from "react-dom/client";
import { ClerkProvider } from "@clerk/clerk-react";
import "./index.css";
import App from "./App.jsx";

const clerkPublishableKey = import.meta.env.CLERK_PUBLISHABLE_KEY || import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

const isKeyValid =
    clerkPublishableKey &&
    clerkPublishableKey.startsWith("pk_") &&
    !clerkPublishableKey.includes("your_publishable_key") &&
    clerkPublishableKey !== "pk_test_your_publishable_key";

class ErrorBoundary extends Component {
    state = {
        hasError: false,
        error: null,
    };

    static getDerivedStateFromError(error) {
        return {
            hasError: true,
            error,
        };
    }

    render() {
        if (this.state.hasError) {
            const errorMsg = this.state.error?.message || "";

            const isKeyError =
                errorMsg.toLowerCase().includes("publishable") ||
                errorMsg.toLowerCase().includes("clerk key") ||
                errorMsg.toLowerCase().includes("invalid key");

            return (
                <div className="min-h-screen flex items-center justify-center bg-slate-900 text-white p-6">
                    <div className="max-w-lg w-full bg-slate-800 border border-slate-700 rounded-2xl p-8 shadow-xl text-center">

                        <div className="w-16 h-16 bg-red-500/10 text-red-400 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                            ⚠️
                        </div>

                        <h2 className="text-xl font-semibold mb-2">
                            {isKeyError
                                ? "Clerk API Key Error"
                                : "Application Error"}
                        </h2>

                        {isKeyError ? (
                            <p className="text-sm text-slate-400 mb-4">
                                The Clerk publishable key in{" "}
                                <code className="bg-slate-950 px-2 py-1 rounded text-amber-300">
                                    frontend/.env
                                </code>{" "}
                                is invalid. Get your key from{" "}
                                <a
                                    href="https://dashboard.clerk.com"
                                    target="_blank"
                                    rel="noreferrer"
                                    className="text-indigo-400 hover:underline">
                                    dashboard.clerk.com
                                </a>
                            </p>
                        ) : (
                            <p className="text-sm text-slate-400 mb-4">
                                An unexpected error occurred during
                                initialization.
                            </p>
                        )}

                        {/* Show detailed error only during development */}
                        {import.meta.env.DEV && (
                            <div className="bg-slate-950 p-4 rounded-xl text-left text-xs font-mono text-red-300 mb-4 overflow-x-auto border border-slate-700 max-h-48 overflow-y-auto">
                                <p className="text-slate-500 mb-1">
                                    # Actual error:
                                </p>

                                <p className="whitespace-pre-wrap break-all">
                                    {errorMsg || "Unknown error"}
                                </p>

                                {this.state.error?.stack && (
                                    <p className="text-slate-500 mt-2 whitespace-pre-wrap break-all text-[10px]">
                                        {this.state.error.stack}
                                    </p>
                                )}
                            </div>
                        )}

                        <button
                            onClick={() => window.location.reload()}
                            className="text-xs text-indigo-400 hover:underline"
                        >
                            Reload page
                        </button>
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

            <div className="w-16 h-16 bg-indigo-500/10 text-indigo-400 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">
                🔐
            </div>

            <h2 className="text-xl font-semibold mb-2">
                Clerk Setup Required
            </h2>

            <p className="text-sm text-slate-400 mb-6">
                Please add your real Clerk Publishable Key in{" "}
                <code className="bg-slate-950 px-2 py-1 rounded text-indigo-300">
                    frontend/.env
                </code>{" "}
                to run the app.
            </p>

            <div className="bg-slate-950 p-4 rounded-xl text-left text-xs font-mono text-slate-300 mb-6 overflow-x-auto border border-slate-800">
                <p className="text-slate-500 mb-1">
                    # Open frontend/.env and update:
                </p>

                <p className="text-emerald-400">
                    VITE_CLERK_PUBLISHABLE_KEY=pk_test_your_publishable_key
                </p>
            </div>

            <p className="text-xs text-slate-400">
                Get your key from{" "}
                <a
                    href="https://dashboard.clerk.com"
                    target="_blank"
                    rel="noreferrer"
                    className="text-indigo-400 hover:underline"
                >
                    dashboard.clerk.com
                </a>
            </p>
        </div>
    </div>
);

createRoot(document.getElementById("root")).render(
    <StrictMode>
        {!isKeyValid ? (
            <SetupNotice />
        ) : (
            <ErrorBoundary>
                <ClerkProvider
                    publishableKey={clerkPublishableKey}
                    appearance={{
                        elements: {
                            footer: { display: "none" },
                            footerAction: { display: "none" },
                            userButtonPopoverFooter: { display: "none" },
                        }
                    }}
                >
                    <App />
                </ClerkProvider>
            </ErrorBoundary>
        )}
    </StrictMode>
);