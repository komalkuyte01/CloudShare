import { CreditCard } from "lucide-react";
const CreditsDisplay = ({ credits }) => {
    console.log("credits is", credits);
    return (
        <div className="flex items-center gap-1 bg-blue-50 dark:bg-blue-900/30 px-3 py-1.5 rounded-full text-blue-700 dark:text-blue-300">

            <CreditCard size={16} />
            <span className="font-medium">{credits}</span>
            <span className="text-xs text-gray-500 dark:text-gray-400">Credits</span>
        </div>
    )

}
export default CreditsDisplay;