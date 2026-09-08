import { useState } from "react";
import PublicNavbar from "../components/landing/PublicNavbar";
import FooterSection from "../components/landing/FooterSection";
import { Search, HelpCircle, FileText, CreditCard, Shield, ChevronDown, MessageSquare } from "lucide-react";
import { Link } from "react-router-dom";

const Support = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [openFaq, setOpenFaq] = useState(null);

    const categories = [
        {
            icon: <FileText className="w-6 h-6 text-blue-600 dark:text-blue-400" />,
            title: "File Upload & Management",
            description: "How to upload, preview, download, and organize files securely.",
        },
        {
            icon: <CreditCard className="w-6 h-6 text-blue-600 dark:text-blue-400" />,
            title: "Billing & Credits",
            description: "Understanding CloudShare credits, purchasing plans, and Razorpay transactions.",
        },
        {
            icon: <Shield className="w-6 h-6 text-blue-600 dark:text-blue-400" />,
            title: "Security & Encryption",
            description: "AES-256 encryption, zero-knowledge architecture, and privacy protection.",
        },
    ];

    const faqs = [
        {
            question: "How do CloudShare credits work?",
            answer: "Every file upload consumes credits based on your storage plan. Free tier users receive 100 default credits. Additional credits can be purchased seamlessly via Razorpay on the Subscription page.",
        },
        {
            question: "Are my uploaded files private?",
            answer: "Yes! By default, all uploaded files are strictly private to your account. You can toggle public sharing at any time to generate a secure shareable link.",
        },
        {
            question: "What is the maximum file upload size?",
            answer: "Free tier accounts can upload files up to 50MB per file. Pro and Ultimate subscription tiers support file uploads up to 2GB per file with priority bandwidth.",
        },
        {
            question: "How do public share links work?",
            answer: "When you toggle a file to public, CloudShare generates a unique secure URL (`/file/:fileId`). Anyone with the link can view and download the file without needing an account.",
        },
        {
            question: "What payment methods are supported for Pro subscriptions?",
            answer: "We support Razorpay payments including credit/debit cards, UPI (Google Pay, PhonePe, Paytm), net banking, and digital wallets.",
        },
        {
            question: "How can I contact technical support?",
            answer: "You can submit an inquiry via our Contact Us page or email our support team directly at cloudsharesupport@gmail.com.",
        },
    ];

    const filteredFaqs = faqs.filter(
        (faq) =>
            faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
            faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-[#030712] text-gray-900 dark:text-gray-100 flex flex-col">
            <PublicNavbar />

            <main className="flex-grow pt-28 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
                
                {/* Hero Header */}
                <div className="text-center max-w-3xl mx-auto py-8">
                    <span className="inline-flex items-center gap-1.5 px-3.5 py-1 mb-4 text-xs font-semibold tracking-wide text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-950/60 rounded-full border border-blue-200 dark:border-blue-800">
                        <HelpCircle size={14} />
                        CloudShare Support Center
                    </span>
                    <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 dark:text-white tracking-tight">
                        How can we help you today?
                    </h1>
                    
                    {/* Search Bar */}
                    <div className="mt-8 relative max-w-xl mx-auto">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search questions, billing, file limits..."
                            className="w-full pl-12 pr-4 py-3.5 rounded-2xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-sm shadow-sm"
                        />
                    </div>
                </div>

                {/* Categories */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-12">
                    {categories.map((cat, i) => (
                        <div key={i} className="p-6 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-sm hover:shadow-md transition-shadow">
                            <div className="p-3 w-fit rounded-xl bg-blue-50 dark:bg-blue-950 mb-4">
                                {cat.icon}
                            </div>
                            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">{cat.title}</h3>
                            <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">{cat.description}</p>
                        </div>
                    ))}
                </div>

                {/* FAQs Section */}
                <div className="my-12 max-w-3xl mx-auto">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
                        Frequently Asked Questions
                    </h2>

                    <div className="space-y-4">
                        {filteredFaqs.length > 0 ? (
                            filteredFaqs.map((faq, idx) => (
                                <div
                                    key={idx}
                                    className="rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 overflow-hidden shadow-sm transition-colors"
                                >
                                    <button
                                        onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                                        className="w-full p-5 text-left flex items-center justify-between font-semibold text-gray-900 dark:text-white text-sm hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                                    >
                                        <span>{faq.question}</span>
                                        <ChevronDown
                                            size={18}
                                            className={`transform transition-transform text-gray-500 ${
                                                openFaq === idx ? "rotate-180 text-blue-600" : ""
                                            }`}
                                        />
                                    </button>
                                    {openFaq === idx && (
                                        <div className="px-5 pb-5 text-xs sm:text-sm text-gray-600 dark:text-gray-300 border-t border-gray-100 dark:border-gray-800 pt-3 leading-relaxed">
                                            {faq.answer}
                                        </div>
                                    )}
                                </div>
                            ))
                        ) : (
                            <div className="text-center py-8 text-gray-500 text-sm">
                                No answers found for "{searchQuery}". Please contact our support team.
                            </div>
                        )}
                    </div>
                </div>

                {/* Still Need Help Box */}
                <div className="my-16 p-8 rounded-3xl bg-blue-50 dark:bg-gray-900/80 border border-blue-200 dark:border-gray-800 text-center flex flex-col items-center">
                    <div className="p-3 rounded-full bg-blue-600 text-white mb-3">
                        <MessageSquare size={24} />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">Still have questions?</h3>
                    <p className="mt-2 text-sm text-gray-600 dark:text-gray-400 max-w-md">
                        Can't find what you're looking for? Reach out to our dedicated support team.
                    </p>
                    <Link
                        to="/contact"
                        className="mt-6 px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm transition-colors shadow-sm"
                    >
                        Contact Support Team
                    </Link>
                </div>

            </main>

            <FooterSection />
        </div>
    );
};

export default Support;
