import PublicNavbar from "../components/landing/PublicNavbar";
import FooterSection from "../components/landing/FooterSection";
import { ShieldCheck, Lock, Eye, Key } from "lucide-react";

const Privacy = () => {
    const pillars = [
        {
            icon: <Lock className="w-6 h-6 text-blue-600 dark:text-blue-400" />,
            title: "Zero Selling of Data",
            desc: "We will never sell, rent, or monetize your personal information or file data to third parties.",
        },
        {
            icon: <ShieldCheck className="w-6 h-6 text-blue-600 dark:text-blue-400" />,
            title: "AES-256 Storage Encryption",
            desc: "All files stored on CloudShare servers are encrypted using high-grade enterprise cryptographic protocols.",
        },
        {
            icon: <Eye className="w-6 h-6 text-blue-600 dark:text-blue-400" />,
            title: "Strict Visibility Control",
            desc: "Your files remain completely private to your account unless you explicitly turn on public link access.",
        },
    ];

    const sections = [
        {
            title: "1. Information We Collect",
            content: "When you sign in to CloudShare, we collect basic profile details (email address, full name, profile image) supplied by Clerk authentication. Additionally, we store metadata associated with uploaded files (file name, file size, content type, upload timestamp, public sharing status).",
        },
        {
            title: "2. How We Use Your Information",
            content: "Your data is strictly used to provide, maintain, and improve CloudShare services. Specifically, information is used to authenticate your identity, process file uploads/downloads, calculate credit consumption, and verify Razorpay payment transactions.",
        },
        {
            title: "3. File Access & Security Protocols",
            content: "Files are stored in secure cloud storage buckets protected by authorization rules. Private files are only accessible to the authenticated owner. Public files are accessible via non-guessable, unique hash identifiers generated on-demand.",
        },
        {
            title: "4. Data Retention & Deletion",
            content: "When you delete a file from your CloudShare dashboard, it is permanently purged from storage. You retain complete control to delete any or all files associated with your profile at any time.",
        },
        {
            title: "5. Contact & Data Officer",
            content: "For any privacy concerns, data export requests, or security reports, contact our Privacy Compliance Officer at cloudsharesupport@gmail.com.",
        },
    ];

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-[#030712] text-gray-900 dark:text-gray-100 flex flex-col">
            <PublicNavbar />

            <main className="flex-grow pt-28 pb-16 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto w-full">
                
                {/* Header */}
                <div className="py-6 border-b border-gray-200 dark:border-gray-800 mb-8">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-semibold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/60 rounded-md mb-3">
                        <Key size={14} />
                        Data Protection & Trust
                    </span>
                    <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white">
                        Privacy Policy
                    </h1>
                    <p className="mt-2 text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                        Last updated: September 8, 2026 · We value your trust and prioritize your file confidentiality.
                    </p>
                </div>

                {/* Pillars */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                    {pillars.map((p, i) => (
                        <div key={i} className="p-6 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-sm">
                            <div className="p-3 w-fit rounded-xl bg-blue-50 dark:bg-blue-950 mb-3">
                                {p.icon}
                            </div>
                            <h3 className="text-base font-bold text-gray-900 dark:text-white mb-1">{p.title}</h3>
                            <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">{p.desc}</p>
                        </div>
                    ))}
                </div>

                {/* Privacy Sections */}
                <div className="space-y-6">
                    {sections.map((sec, idx) => (
                        <div key={idx} className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-sm">
                            <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-3">
                                {sec.title}
                            </h2>
                            <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                                {sec.content}
                            </p>
                        </div>
                    ))}
                </div>

            </main>

            <FooterSection />
        </div>
    );
};

export default Privacy;
