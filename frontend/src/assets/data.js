import {
  FileUp,
  Users,
  Globe,
  Activity,
  LayoutDashboard,
  Upload,
  Files,
  CreditCard,
  Receipt,
} from "lucide-react";

// ─── Side Menu Data ──────────────────────────────────────────────────────────
export const SIDE_MENU_DATA = [
  {
    id: "01",
    label: "Dashboard",
    icon: LayoutDashboard,
    path: "/dashboard",
  },
  {
    id: "02",
    label: "Upload",
    icon: Upload,
    path: "/upload",
  },
  {
    id: "03",
    label: "My Files",
    icon: Files,
    path: "/my-files",
  },
  {
    id: "04",
    label: "Subscription",
    icon: CreditCard,
    path: "/subscription",
  },
  {
    id: "05",
    label: "Transactions",
    icon: Receipt,
    path: "/transactions",
  },
];

// ─── Features ────────────────────────────────────────────────────────────────
export const features = [
  {
    iconName: "ArrowUpCircle",
    iconColor: "text-blue-500",
    title: "Easy File Upload",
    description:
      "Quickly upload your files with our intuitive drag-and-drop interface.",
  },
  {
    iconName: "Shield",
    iconColor: "text-green-500",
    title: "Secure Storage",
    description:
      "Your files are encrypted and stored securely in our cloud infrastructure.",
  },
  {
    iconName: "Share2",
    iconColor: "text-purple-500",
    title: "Simple Sharing",
    description:
      "Share files with anyone using secure links that you control.",
  },
  {
    iconName: "CreditCard",
    iconColor: "text-red-500",
    title: "Flexible Credits",
    description:
      "Pay only for what you use with our credit-based system.",
  },
  {
    iconName: "FileText",
    iconColor: "text-yellow-500",
    title: "File Management",
    description:
      "Organize, preview, and manage your files from any device.",
  },
  {
    iconName: "Clock",
    iconColor: "text-cyan-500",
    title: "Transaction History",
    description:
      "Keep track of all your file uploads, downloads, and sharing activities.",
  },
];

// ─── Pricing Plans ───────────────────────────────────────────────────────────
export const pricingPlans = [
  {
    name: "Free",
    price: "0",
    period: "forever",
    description: "Perfect for individuals getting started",
    features: [
      "15 GB Secure Storage",
      "File Upload & Download",
      "Link Sharing",
      "Access Across All Devices",
      "7 Days Version History",
      "Community Support",
    ],
    cta: "Get Started",
    highlighted: false,
  },
  {
    name: "Pro",
    price: "499",
    period: "month",
    description: "For professionals and content creators",
    features: [
      "200 GB Secure Storage",
      "Unlimited File Uploads",
      "Password-Protected Sharing",
      "30 Days Version History",
      "Priority File Sync",
      "Advanced File Search",
      "Email Support",
    ],
    cta: "Upgrade to Pro",
    highlighted: true,
  },
  {
    name: "Enterprise",
    price: "999",
    period: "month",
    description: "Built for teams and organizations",
    features: [
      "2 TB Secure Storage",
      "Unlimited File Uploads",
      "Team Workspaces",
      "Role-Based Access Control",
      "Unlimited Version History",
      "Advanced Security & Encryption",
      "Activity Logs & Audit Trail",
      "24×7 Priority Support",
    ],
    cta: "Contact Sales",
    highlighted: false,
  },
];

// ─── Testimonials ────────────────────────────────────────────────────────────
// Using initials instead of external image URLs so nothing ever 404s.
export const testimonials = [
  {
    name: "Rahul Mehta",
    initials: "RM",
    role: "Software Engineer",
    company: "Infosys",
    quote:
      "The upload speed and secure sharing links have made collaboration with my clients effortless.",
    rating: 5,
  },
  {
    name: "Emily Watson",
    initials: "EW",
    role: "UI/UX Designer",
    company: "Freelancer",
    quote:
      "I share design assets daily. Password-protected links give me complete confidence.",
    rating: 5,
  },
  {
    name: "Michael Chen",
    initials: "MC",
    role: "Product Manager",
    company: "TechNova",
    quote:
      "Managing documents across multiple teams has become much easier using this platform.",
    rating: 5,
  },
  {
    name: "Priya Sharma",
    initials: "PS",
    role: "Project Manager",
    company: "TCS",
    quote:
      "The team folders and version history save us hours every week.",
    rating: 4,
  },
];

// ─── FAQs ────────────────────────────────────────────────────────────────────
export const faqs = [
  {
    question: "Is my data secure?",
    answer:
      "Yes. Every uploaded file is encrypted during transfer and securely stored using industry-standard encryption.",
  },
  {
    question: "Can I share files without creating an account?",
    answer:
      "Public sharing is available, but creating an account provides better control and security for your files.",
  },
  {
    question: "Can I password protect shared links?",
    answer:
      "Yes. Pro and Business plans support password-protected links with optional expiration dates.",
  },
  {
    question: "What is the maximum upload size?",
    answer:
      "Free users can upload files up to 2 GB. Pro plan supports up to 10 GB and Business plan supports up to 50 GB per file.",
  },
  {
    question: "How does version history work?",
    answer:
      "Every time you upload a new version of a file, the previous version is saved. You can view, compare, and restore older versions anytime.",
  },
  {
    question: "Can I cancel my subscription anytime?",
    answer:
      "Absolutely. You can cancel or downgrade your plan at any time from your account settings. No hidden charges.",
  },
];

// ─── Stats (Hero / Landing) ─────────────────────────────────────────────────
export const stats = [
  {
    value: "1M+",
    label: "Files Uploaded",
    icon: FileUp,
  },
  {
    value: "150K+",
    label: "Active Users",
    icon: Users,
  },
  {
    value: "99.99%",
    label: "Uptime",
    icon: Activity,
  },
  {
    value: "40+",
    label: "Countries",
    icon: Globe,
  },
];

// ─── Navigation Links ───────────────────────────────────────────────────────
export const navLinks = [
  { label: "Features", href: "#features" },
  { label: "Pricing", href: "#pricing" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "FAQ", href: "#faq" },
];

// ─── Footer Links ───────────────────────────────────────────────────────────
export const footerLinks = {
  product: [
    { label: "Features", href: "#features" },
    { label: "Pricing", href: "#pricing" },
    { label: "FAQ", href: "#faq" },
    { label: "Changelog", href: "#" },
  ],
  company: [
    { label: "About Us", href: "#" },
    { label: "Blog", href: "#" },
    { label: "Careers", href: "#" },
    { label: "Contact", href: "#" },
  ],
  legal: [
    { label: "Privacy Policy", href: "#" },
    { label: "Terms of Service", href: "#" },
    { label: "Cookie Policy", href: "#" },
  ],
};
