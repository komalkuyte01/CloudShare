import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect } from "react";

import Landing from "./pages/Landing";
import Dashboard from "./pages/Dashboard";
import Upload from "./pages/Upload";
import MyFiles from "./pages/MyFiles";
import Subscription from "./pages/Subscription";
import Transaction from "./pages/Transaction";
import PublicFileView from "./pages/PublicFileView";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Support from "./pages/Support";
import Terms from "./pages/Terms";
import Privacy from "./pages/Privacy";
import Cookies from "./pages/Cookies";
import ScrollToTop from "./components/ui/ScrollToTop";
import { Toaster } from "react-hot-toast";

import {
    RedirectToSignIn,
    SignedIn,
    SignedOut,
    useUser,
    useAuth,
} from "@clerk/clerk-react";
import { UserCreditsProvider } from "./context/UserCreditsContext.jsx";

const RAW_BACKEND_URL =
    import.meta.env.VITE_BACKEND_URL ||
    "https://flavorful-retype-vengeful.ngrok-free.dev/api/v1.0";

const BACKEND_URL = RAW_BACKEND_URL.replace(/\/+$/, "");

// Syncs the current Clerk user into the database
const UserSync = () => {
    const { isSignedIn, user } = useUser();
    const { getToken } = useAuth();

    useEffect(() => {
        if (!isSignedIn || !user) return;

        const syncUser = async () => {
            try {
                const token = await getToken();

                await fetch(`${BACKEND_URL}/profiles/register`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "ngrok-skip-browser-warning": "true",
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify({
                        email: user.primaryEmailAddress?.emailAddress || "",
                        firstName: user.firstName || "",
                        lastName: user.lastName || "",
                        photoUrl: user.imageUrl || "",
                    }),
                });
            } catch (err) {
                console.error("Failed to sync user to DB:", err);
            }
        };

        syncUser();
    }, [isSignedIn, user, getToken]);

    return null;
};

const NotFound = () => (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white dark:bg-[#030712] text-gray-900 dark:text-gray-100">
        <h1 className="text-6xl font-extrabold text-blue-600 dark:text-blue-400">
            404
        </h1>

        <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
            Page not found
        </p>

        <a
            href="/"
            className="mt-6 px-6 py-3 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-xl transition-colors duration-200"
        >
            Go Home
        </a>
    </div>
);

const App = () => {
    return (
        <UserCreditsProvider>
            <BrowserRouter>
                <ScrollToTop />
                <Toaster />
                <UserSync />

                <Routes>
                    <Route path="/" element={<Landing />} />

                    <Route
                        path="/dashboard"
                        element={
                            <>
                                <SignedIn>
                                    <Dashboard />
                                </SignedIn>
                                <SignedOut>
                                    <RedirectToSignIn />
                                </SignedOut>
                            </>
                        }
                    />

                    <Route
                        path="/upload"
                        element={
                            <>
                                <SignedIn>
                                    <Upload />
                                </SignedIn>
                                <SignedOut>
                                    <RedirectToSignIn />
                                </SignedOut>
                            </>
                        }
                    />

                    <Route
                        path="/my-files"
                        element={
                            <>
                                <SignedIn>
                                    <MyFiles />
                                </SignedIn>
                                <SignedOut>
                                    <RedirectToSignIn />
                                </SignedOut>
                            </>
                        }
                    />

                    <Route
                        path="/subscription"
                        element={
                            <>
                                <SignedIn>
                                    <Subscription />
                                </SignedIn>
                                <SignedOut>
                                    <RedirectToSignIn />
                                </SignedOut>
                            </>
                        }
                    />

                    <Route
                        path="/transactions"
                        element={
                            <>
                                <SignedIn>
                                    <Transaction />
                                </SignedIn>
                                <SignedOut>
                                    <RedirectToSignIn />
                                </SignedOut>
                            </>
                        }
                    />

                    <Route path="/file/:fileId" element={<PublicFileView />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/support" element={<Support />} />
                    <Route path="/terms" element={<Terms />} />
                    <Route path="/privacy" element={<Privacy />} />
                    <Route path="/cookies" element={<Cookies />} />

                    <Route path="*" element={<NotFound />} />
                </Routes>
            </BrowserRouter>
        </UserCreditsProvider>
    );
};

export default App;