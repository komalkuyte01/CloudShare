import axios from "axios";

export const getBackendBaseUrl = () => {
    const envUrl = import.meta.env.BACKEND_URL || import.meta.env.VITE_BACKEND_URL;

    // Running in browser over HTTPS (e.g. Vercel deployment)
    if (typeof window !== "undefined" && window.location.protocol === "https:") {
        if (envUrl && envUrl.startsWith("https://")) {
            return envUrl.replace(/\/+$/, "");
        }
        // Fallback: No VITE_BACKEND_URL set — this will fail, set it on Vercel!
        console.error("VITE_BACKEND_URL is not set! API calls will fail.");
        return "https://YOUR-AWS-BACKEND-URL/api/v1.0";
    }

    // Running in local development (http://localhost:5173)
    if (envUrl) {
        return envUrl.replace(/\/+$/, "");
    }
    return "http://localhost:8080/api/v1.0";
};

export const BASE_URL = getBackendBaseUrl();

// Bypass ngrok interstitial warning page only if connecting via ngrok tunnel (local dev)
if (BASE_URL.includes("ngrok")) {
    axios.defaults.headers.common["ngrok-skip-browser-warning"] = "true";
}

export const apiEndpoints = {
    // Files
    FETCH_FILES: `${BASE_URL}/files/my`,
    GET_CREDITS: `${BASE_URL}/users/credits`,
    TOGGLE_FILES: (id) => `${BASE_URL}/files/${id}/visibility`,
    DOWNLOAD_FILES: (id) => `${BASE_URL}/files/download/${id}`,
    DELETE_FILES: (id) => `${BASE_URL}/files/${id}`,
    UPLOAD_FILES: `${BASE_URL}/files/upload`,

    // Profile
    PROFILE_ME: `${BASE_URL}/profiles/me`,

    // Payments
    CREATE_ORDER: `${BASE_URL}/payments/create-order`,
    VERIFY_PAYMENT: `${BASE_URL}/payments/verify-payment`,
    FETCH_TRANSACTIONS: `${BASE_URL}/transactions`,

    // Public files
    PUBLIC_FILE_VIEW: (id) => `${BASE_URL}/files/public/${id}`,

    // Contact
    SUBMIT_CONTACT: `${BASE_URL}/contact`,
};
