import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * ScrollToTop component automatically scrolls the window to the top
 * whenever the React Router route changes.
 */
const ScrollToTop = () => {
    const { pathname, hash } = useLocation();

    useEffect(() => {
        if (!hash) {
            window.scrollTo(0, 0);
        } else {
            const id = hash.replace("#", "");
            const element = document.getElementById(id);
            if (element) {
                element.scrollIntoView({ behavior: "smooth" });
            }
        }
    }, [pathname, hash]);

    return null;
};

export default ScrollToTop;
