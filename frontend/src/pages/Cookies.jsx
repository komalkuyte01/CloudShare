import { useState } from "react";
import PublicNavbar from "../components/landing/PublicNavbar";
import FooterSection from "../components/landing/FooterSection";
import { Cookie, Check, Info } from "lucide-react";

const Cookies = () => {
    const [preferences, setPreferences] = useState({
        essential: true, // Always true & locked
        functional: true,
        analytics: true,
    });

    const togglePreference = (key) => {
        if (key === "essential") return;
        setPreferences((prev) => ({ ...prev, [key]: !prev[key] }));
    };

    const cookieCategories = [
        {
            key: "essential",
            name: "Strictly Necessary Cookies",
            required: true,
            description: "Essential for secure authentication, Clerk user session persistence, and Razorpay payment security. These cannot be disabled.",
        },
        {
            key: "functional",
            name: "Functional & Theme Cookies",
            required: false,
            description: "Remembers your visual preferences, dark/light theme setting, and table filter selections.",
        },
        {
            key: "analytics",
            name: "Analytics & Performance Cookies",
            required: false,
            description: "Helps us measure site performance, page load speeds, and error diagnostics to improve CloudShare.",
        },
    ];

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-[#030712] text-gray-900 dark:text-gray-100 flex flex-col">
            <PublicNavbar />

            <main className="flex-grow pt-28 pb-16 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto w-full">
                
                {/* Header */}
                <div className="py-6 border-b border-gray-200 dark:border-gray-800 mb-8">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-semibold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/60 rounded-md mb-3">
                        <Cookie size={14} />
                        Cookie Policy & Management
                    </span>
                    <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white">
                        Cookie Policy
                    </h1>
                    <p className="mt-2 text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                        Last updated: September 8, 2026 · Learn how CloudShare uses cookies and local storage.
                    </p>
                </div>

                {/* Explanation */}
                <div className="p-6 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-sm mb-10 space-y-4">
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white">What Are Cookies?</h2>
                    <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                        Cookies are small text files placed on your browser or device when visiting websites. CloudShare uses minimal essential cookies and browser local storage to maintain your authenticated login session, preserve dark mode theme preferences, and secure file download authorizations.
                    </p>
                </div>

                {/* Preferences Manager Box */}
                <div className="mb-12 p-6 sm:p-8 rounded-3xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-sm">
                    <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-200 dark:border-gray-800">
                        <div>
                            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Cookie Preferences</h2>
                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Manage your cookie settings for CloudShare.</p>
                        </div>
                        <span className="text-xs font-medium px-3 py-1 bg-green-100 dark:bg-green-950 text-green-700 dark:text-green-300 rounded-full flex items-center gap-1">
                            <Check size={12} /> Preferences Saved
                        </span>
                    </div>

                    <div className="space-y-6">
                        {cookieCategories.map((cat) => (
                            <div key={cat.key} className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-xl bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700/60">
                                <div className="space-y-1">
                                    <div className="flex items-center gap-2">
                                        <span className="font-bold text-sm text-gray-900 dark:text-white">{cat.name}</span>
                                        {cat.required && (
                                            <span className="text-[11px] font-semibold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950 px-2 py-0.5 rounded">
                                                Required
                                            </span>
                                        )}
                                    </div>
                                    <p className="text-xs text-gray-500 dark:text-gray-400 max-w-xl">{cat.description}</p>
                                </div>

                                <button
                                    onClick={() => togglePreference(cat.key)}
                                    disabled={cat.required}
                                    className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                                        preferences[cat.key] ? "bg-blue-600" : "bg-gray-300 dark:bg-gray-700"
                                    } ${cat.required ? "opacity-60 cursor-not-allowed" : ""}`}
                                >
                                    <span
                                        className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                                            preferences[cat.key] ? "translate-x-5" : "translate-x-0"
                                        }`}
                                    />
                                </button>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Additional Details */}
                <div className="p-6 rounded-2xl bg-blue-50 dark:bg-gray-900/80 border border-blue-200 dark:border-gray-800 flex items-start gap-4">
                    <Info className="text-blue-600 dark:text-blue-400 w-6 h-6 flex-shrink-0 mt-0.5" />
                    <div className="text-xs sm:text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                        You can also control cookies directly within your web browser settings. Clearing browser cookies will require you to log back into CloudShare on your next visit.
                    </div>
                </div>

            </main>

            <FooterSection />
        </div>
    );
};

export default Cookies;
