const BASE_URL = 'http://localhost:8080/api/v1.0';

 export const apiEndpoints = {
    FETCH_FILES: `${BASE_URL}/files/my`,
    GET_CREDITS: `${BASE_URL}/users/credits`,
    TOGGLE_FILES:(id) => `${BASE_URL}/files/${id}/visibility`,
    DOWNLOAD_FILES:(id) => `${BASE_URL}/files/download/${id}`,
    DELETE_FILES:(id) => `${BASE_URL}/files/${id}`,
    PROFILE_ME: `${BASE_URL}/profiles/me`,
    UPLOAD_FILES: `${BASE_URL}/files/upload`,
    CREATE_ORDER: `${BASE_URL}/payments/create-order`,
    VERIFY_PAYMENT: `${BASE_URL}/payments/verify-payment`,
    FETCH_TRANSACTIONS: `${BASE_URL}/transactions`,
    PUBLIC_FILE_VIEW: (id) => `${BASE_URL}/files/public/${id}`,
}