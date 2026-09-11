import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";

/**
 * Custom hook to get and toggle the current theme.
 * Reusable across any component (e.g., HeroSection, Navbar).
 */
export const useTheme = () => {
    const [isDarkMode, setIsDarkMode] = useState(() => {
        if (typeof document === "undefined") return false;
        return document.documentElement.classList.contains("dark");
    });

    useEffect(() => {
        // Check initial theme from localStorage or system preference
        const savedTheme = localStorage.getItem("theme");
        if (savedTheme === "dark") {
            setIsDarkMode(true);
            document.documentElement.classList.add("dark");
        } else if (savedTheme === "light") {
            setIsDarkMode(false);
            document.documentElement.classList.remove("dark");
        } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
            setIsDarkMode(true);
            document.documentElement.classList.add("dark");
        }

        const handleThemeChange = () => {
            setIsDarkMode(document.documentElement.classList.contains("dark"));
        };

        window.addEventListener("themechange", handleThemeChange);
        return () => window.removeEventListener("themechange", handleThemeChange);
    }, []);

    const toggleTheme = () => {
        if (document.documentElement.classList.contains("dark")) {
            document.documentElement.classList.remove("dark");
            localStorage.setItem("theme", "light");
            setIsDarkMode(false);
        } else {
            document.documentElement.classList.add("dark");
            localStorage.setItem("theme", "dark");
            setIsDarkMode(true);
        }
        window.dispatchEvent(new Event("themechange"));
    };

    return { isDarkMode, toggleTheme };
};

/**
 * Dark/Light mode toggle button.
 *
 * Props:
 *   floating (boolean) — if true, shows as a fixed button in bottom-right corner (for Landing page).
 *                         if false (default), shows as an inline button (for Navbar).
 */
const ThemeToggle = ({ floating = false }) => {
    const { isDarkMode, toggleTheme } = useTheme();

    // Floating style (fixed bottom-right) — used on Landing page
    if (floating) {
        return (
            <button
                onClick={toggleTheme}
                className="fixed bottom-6 right-6 p-4 rounded-full shadow-lg border transition-all duration-300 z-50 bg-white border-gray-200 text-gray-800 hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100 dark:hover:bg-gray-700 cursor-pointer"
                aria-label="Toggle Theme"
            >
                {isDarkMode ? <Sun size={24} /> : <Moon size={24} />}
            </button>
        );
    }

    // Inline style — used in Navbar
    return (
        <button
            onClick={toggleTheme}
            className="p-2 rounded-lg border transition-all duration-200 bg-gray-100 border-gray-200 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200 dark:hover:bg-gray-700 cursor-pointer"
            aria-label="Toggle Theme"
        >
            {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
        </button>
    );
};

export default ThemeToggle;
