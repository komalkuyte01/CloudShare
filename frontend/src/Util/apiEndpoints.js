const BASE_URL = 'http://localhost:8080/api/v1.0';

 export const apiEndpoints = {
    FETCH_FILES: `${BASE_URL}/files/my`,
    GET_CREDITS: `${BASE_URL}/users/credits`,
    TOGGLE_FILES:(id) => `${BASE_URL}/files/${id}/visibility`,
    DOWNLOAD_FILES:(id) => `${BASE_URL}/files/download/${id}`,
    DELETE_FILES:(id) => `${BASE_URL}/files/${id}`,
    PROFILE_ME: `${BASE_URL}/profiles/me`,
    UPLOAD_FILES: `${BASE_URL}/files/upload`,

}