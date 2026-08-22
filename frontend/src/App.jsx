import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect } from "react";

import Landing from "./pages/Landing";
import Dashboard from "./pages/Dashboard";
import Upload from "./pages/Upload";
import MyFiles from "./pages/MyFiles";
import Subscription from "./pages/Subscription";
import Transaction from "./pages/Transaction";
import PublicFileView from "./pages/PublicFileView";
import { Toaster } from "react-hot-toast";

import {
    RedirectToSignIn,
    SignedIn,
    SignedOut,
    useUser,
    useAuth,
} from "@clerk/clerk-react";


const BACKEND_URL =
    import.meta.env.VITE_BACKEND_URL ||
    "http://localhost:8080/api/v1.0";

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
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify({
                        email:
                            user.primaryEmailAddress?.emailAddress || "",
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
        <h1 className="text-6xl font-extrabold text-purple-600 dark:text-purple-400">
            404
        </h1>

        <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
            Page not found
        </p>

        <a
            href="/"
            className="mt-6 px-6 py-3 text-sm font-semibold text-white bg-purple-600 hover:bg-purple-700 rounded-xl transition-colors duration-200"
        >
            Go Home
        </a>
    </div>
);

const App = () => {
    return (
        <BrowserRouter>
           <Toaster/>

            <Routes>
                <Route
                    path="/"
                    element={<Landing />}
                />

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

                <Route
                    path="/file/:id"
                    element={<PublicFileView />}
                />

                <Route
                    path="*"
                    element={<NotFound />}
                />
            </Routes>
        </BrowserRouter>
    );
};

export default App;