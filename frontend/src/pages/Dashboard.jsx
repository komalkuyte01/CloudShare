import { useState, useEffect, useCallback } from "react";
import { useAuth } from "@clerk/clerk-react";
import axios from "axios";
import { Loader2 } from "lucide-react";
import DashboardLayout from "../layout/DashboardLayout.jsx";
import { apiEndpoints } from "../Util/apiEndpoints.js";
import { useCreditsContext } from "../context/UserCreditsContext.jsx";
import DashboardUpload from "../components/ui/DashboardUpload.jsx";
import RecentFiles from "../components/ui/RecentFiles.jsx";

const Dashboard = () => {
    const [files, setFiles] = useState([]);
    const [uploadFiles, setUploadFiles] = useState([]);
    const [uploading, setUploading] = useState(false);
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState('');
    const [messageType, setMessageType] = useState('');

    const { getToken } = useAuth();
    const { fetchUserCredits } = useCreditsContext();

    const MAX_FILES = 5;
    const remainingUploads = MAX_FILES - uploadFiles.length;

    const fetchRecentFiles = useCallback(async () => {
        try {
            setLoading(true);
            const token = await getToken();
            const res = await axios.get(apiEndpoints.FETCH_FILES, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            
            if (res.data && Array.isArray(res.data)) {
                // Sort by uploadedAt and take only the 5 most recent files
                const sortedFiles = [...res.data].sort((a, b) =>
                    new Date(b.uploadedAt) - new Date(a.uploadedAt)
                ).slice(0, 5);
                setFiles(sortedFiles);
            } else {
                setFiles([]);
            }
        } catch (error) {
            console.error("Error fetching recent files:", error);
        } finally {
            setLoading(false);
        }
    }, [getToken]);

    useEffect(() => {
        fetchRecentFiles();
        fetchUserCredits();
    }, [fetchRecentFiles, fetchUserCredits]);


    const handleFileChange = (e) => {
        const selectedFiles = Array.from(e.target.files);

        // Check if adding these files would exceed the limit
        if (uploadFiles.length + selectedFiles.length > MAX_FILES) {
            setMessage(`You can only upload a maximum of ${MAX_FILES} files at once`);
            setMessageType('error');
            return;
        }

        // Add the new files to the existing files
        setUploadFiles((prevFiles) => [...prevFiles, ...selectedFiles]);
        setMessage('');
        setMessageType('');
    };

    const handleRemoveFile = (index) => {
        setUploadFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
        setMessage('');
        setMessageType('');
    };

    const handleUpload = async () => {
        if (uploadFiles.length === 0) {
            setMessage('Please select at least one file to upload.');
            setMessageType('error');
            return;
        }

        if (uploadFiles.length > MAX_FILES) {
            setMessage(`You can only upload a maximum of ${MAX_FILES} files at once`);
            setMessageType('error');
            return;
        }

        try {
            setUploading(true);
            setMessage('Uploading files...');
            setMessageType('info');

            const formData = new FormData();
            uploadFiles.forEach(file => formData.append('files', file));

            const token = await getToken();
            await axios.post(
                apiEndpoints.UPLOAD_FILES,
                formData,
                {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                }
            );

            setMessage('Files uploaded successfully!');
            setMessageType('success');
            setUploadFiles([]);

            // Refresh the recent files list and user credits
            await fetchRecentFiles();
            await fetchUserCredits();
        } catch (error) {
            console.error("Upload failed:", error);
            setMessage('Upload failed. Please try again.');
            setMessageType('error');
        } finally {
            setUploading(false);
        }
    };

    return (
        <DashboardLayout activeMenu="Dashboard">
            <div className="p-6">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">My Drive</h1>
                <p className="text-gray-500 dark:text-gray-400 text-sm mb-6">Upload, manage, and share your files securely</p>
                
                {message && (
                    <div className={`mb-6 p-4 rounded-lg flex items-center gap-3 ${
                        messageType === 'error' ? 'bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400' :
                        messageType === 'success' ? 'bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400' :
                        'bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400'
                    }`}>
                        {message}
                    </div>
                )}

                <div className="flex flex-col md:flex-row gap-6">
                    {/* Left column */}
                    <div className="w-full md:w-[40%]">
                        <DashboardUpload
                            files={uploadFiles}
                            onFileChange={handleFileChange}
                            onUpload={handleUpload}
                            uploading={uploading}
                            onRemoveFile={handleRemoveFile}
                            remainingUploads={remainingUploads}
                        />
                    </div>

                    {/* Right column */}
                    <div className="w-full md:w-[60%]">
                        {loading ? (
                            <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg shadow-sm p-12 flex flex-col items-center">
                                <Loader2 size={40} className="text-blue-500 animate-spin mb-4" />
                                <p className="text-gray-500 dark:text-gray-400 font-medium">Loading your files...</p>
                            </div>
                        ) : (
                            <RecentFiles files={files} />
                        )}
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
};

export default Dashboard;