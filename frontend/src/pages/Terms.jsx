import PublicNavbar from "../components/landing/PublicNavbar";
import FooterSection from "../components/landing/FooterSection";
import { FileText, ShieldAlert, CheckCircle2 } from "lucide-react";

const Terms = () => {
    const sections = [
        {
            id: "acceptance",
            title: "1. Acceptance of Terms",
            content: "By creating a CloudShare account or accessing any file uploaded through our platform, you agree to be legally bound by these Terms of Service. If you do not agree to these terms, please do not use our services.",
        },
        {
            id: "account-credits",
            title: "2. Account Registration & User Credits",
            content: "To access CloudShare storage services, you must authenticate using our secure authentication providers. Each registered user receives account credits required to upload files. Credits represent system bandwidth and storage quota allocations. Unused credits remain valid according to your active subscription plan.",
        },
        {
            id: "acceptable-use",
            title: "3. Acceptable Use & Content Guidelines",
            content: "You retain ownership of all files you upload to CloudShare. However, you strictly agree NOT to upload, store, or share content that is illegal, harmful, infringes intellectual property rights, contains malware/viruses, or violates personal privacy laws. CloudShare reserves the right to terminate accounts and delete files violating this policy.",
        },
        {
            id: "security-privacy",
            title: "4. Security & Data Protection",
            content: "CloudShare employs industry-standard AES-256 encryption for files at rest and SSL/TLS transport layer security for files in transit. While we take every security precaution, users are responsible for maintaining the confidentiality of their public share links.",
        },
        {
            id: "payments",
            title: "5. Subscription & Payment Policy",
            content: "Purchases of Pro or Ultimate credit packages are processed securely via Razorpay. All fees are non-refundable unless required by applicable law. Subscriptions grant increased file upload limits and priority support.",
        },
        {
            id: "termination",
            title: "6. Termination & Service Modifications",
            content: "CloudShare reserves the right to modify, suspend, or discontinue any aspect of the service with or without notice. Accounts found engaging in abusive behavior or fraudulent transactions will be suspended immediately.",
        },
    ];

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-[#030712] text-gray-900 dark:text-gray-100 flex flex-col">
            <PublicNavbar />

            <main className="flex-grow pt-28 pb-16 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto w-full">
                
                {/* Header */}
                <div className="py-6 border-b border-gray-200 dark:border-gray-800 mb-8">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-semibold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/60 rounded-md mb-3">
                        <FileText size={14} />
                        Legal Agreement
                    </span>
                    <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white">
                        Terms of Service
                    </h1>
                    <p className="mt-2 text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                        Last updated: September 8, 2026 · Effective for all CloudShare users globally.
                    </p>
                </div>

                {/* Key Summary Box */}
                <div className="mb-10 p-6 rounded-2xl bg-blue-50 dark:bg-gray-900/80 border border-blue-200 dark:border-gray-800 flex items-start gap-4">
                    <ShieldAlert className="text-blue-600 dark:text-blue-400 w-6 h-6 flex-shrink-0 mt-0.5" />
                    <div className="text-xs sm:text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                        <strong>Quick Summary:</strong> You own your files. We encrypt and store them securely. You are responsible for keeping your share links safe and complying with copyright and content regulations.
                    </div>
                </div>

                {/* Content Sections */}
                <div className="space-y-8">
                    {sections.map((section) => (
                        <div
                            key={section.id}
                            id={section.id}
                            className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-sm"
                        >
                            <h2 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                                <CheckCircle2 className="text-blue-600 dark:text-blue-400 w-5 h-5" />
                                {section.title}
                            </h2>
                            <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                                {section.content}
                            </p>
                        </div>
                    ))}
                </div>

                {/* Questions */}
                <div className="mt-12 text-center text-xs text-gray-500 dark:text-gray-400">
                    If you have any questions regarding these Terms of Service, please reach out via{" "}
                    <a href="mailto:cloudsharesupport@gmail.com" className="text-blue-600 dark:text-blue-400 underline">
                        cloudsharesupport@gmail.com
                    </a>.
                </div>

            </main>

            <FooterSection />
        </div>
    );
};

export default Terms;
