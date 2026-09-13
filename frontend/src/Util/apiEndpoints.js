import axios from "axios";

export const getBackendBaseUrl = () => {
    return (import.meta.env.VITE_BACKEND_URL || "").replace(/\/+$/, "");
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
