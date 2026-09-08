import axios from "axios";

export const getBackendBaseUrl = () => {
    const envUrl = import.meta.env.VITE_BACKEND_URL;

    // Running in browser over HTTPS (e.g. Vercel deployment)
    if (typeof window !== "undefined" && window.location.protocol === "https:") {
        // Use custom HTTPS URL if configured and not the unresponsive onrender URL
        if (envUrl && envUrl.startsWith("https://") && !envUrl.includes("cloudshare-backend.onrender.com")) {
            return envUrl.replace(/\/+$/, "");
        }
        // Live HTTPS tunnel fallback for deployed preview/production
        return "https://flavorful-retype-vengeful.ngrok-free.dev/api/v1.0";
    }

    // Running in local development (http://localhost)
    if (envUrl && !envUrl.includes("cloudshare-backend.onrender.com")) {
        return envUrl.replace(/\/+$/, "");
    }
    return "http://localhost:8080/api/v1.0";
};

const BASE_URL = getBackendBaseUrl();

// Bypass ngrok interstitial warning page only if connecting via ngrok tunnel
if (BASE_URL.includes("ngrok")) {
    axios.defaults.headers.common["ngrok-skip-browser-warning"] = "true";
}

export const apiEndpoints = {
    FETCH_FILES: `${BASE_URL}/files/my`,
    GET_CREDITS: `${BASE_URL}/users/credits`,
    TOGGLE_FILES: (id) => `${BASE_URL}/files/${id}/visibility`,
    DOWNLOAD_FILES: (id) => `${BASE_URL}/files/download/${id}`,
    DELETE_FILES: (id) => `${BASE_URL}/files/${id}`,
    PROFILE_ME: `${BASE_URL}/profiles/me`,
    UPLOAD_FILES: `${BASE_URL}/files/upload`,
    CREATE_ORDER: `${BASE_URL}/payments/create-order`,
    VERIFY_PAYMENT: `${BASE_URL}/payments/verify-payment`,
    FETCH_TRANSACTIONS: `${BASE_URL}/transactions`,
    PUBLIC_FILE_VIEW: (id) => `${BASE_URL}/files/public/${id}`,
    SUBMIT_CONTACT: `${BASE_URL}/contact`,
}