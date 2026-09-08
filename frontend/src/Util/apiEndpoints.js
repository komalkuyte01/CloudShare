import axios from "axios";

const RAW_URL =
    import.meta.env.VITE_BACKEND_URL ||
    "http://localhost:8080/api/v1.0";

// Bypass ngrok interstitial warning page only if connecting via ngrok tunnel
if (RAW_URL.includes("ngrok")) {
    axios.defaults.headers.common["ngrok-skip-browser-warning"] = "true";
}

const BASE_URL = RAW_URL.replace(/\/+$/, "");

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