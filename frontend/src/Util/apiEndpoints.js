const BASE_URL = 'http://localhost:8080/api/v1.0';

 export const apiEndpoints = {
    FETCH_FILES: `${BASE_URL}/files/my`,
    TOGGLE_FILES:(id) => `${BASE_URL}/files/${id}/visibility`,
    DOWNLOAD_FILES:(id) => `${BASE_URL}/files/download/${id}`,
}