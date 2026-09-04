import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "@clerk/clerk-react";
import axios from "axios";
import { Download, File, CloudUpload, Copy, Info } from "lucide-react";
import toast from "react-hot-toast";
import { apiEndpoints } from "../Util/apiEndpoints.js";
import LinkShareModal from "../components/ui/LinkShareModal.jsx";

const PublicFileView = () => {
    const { fileId } = useParams();
    const [file, setFile] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [shareModal, setShareModal] = useState({
        isOpen: false,
        link: "",
    });
    const { getToken } = useAuth();

    useEffect(() => {
        const getFile = async () => {
            try {
                setIsLoading(true);
                // Re-added token fetching and authorization header
                const token = await getToken();
                const headers = token ? { Authorization: `Bearer ${token}` } : {};
                const res = await axios.get(
                    apiEndpoints.PUBLIC_FILE_VIEW(fileId),
                    { headers }
                );
                setFile(res.data);
                setError(null);
            } catch (err) {
                console.error("Error fetching file:", err);
                setError("Could not retrieve file. The link may be invalid or the file may have been removed.");
            } finally {
                setIsLoading(false);
            }
        };
        getFile();
    }, [fileId, getToken]);

    const handleDownload = async () => {
        try {
            // This endpoint might also require a token depending on your backend setup
            const token = await getToken();
            const headers = token ? { Authorization: `Bearer ${token}` } : {};
            const response = await axios.get(
                `http://localhost:8080/api/v1.0/files/download/${fileId}`,
                {
                    headers,
                    responseType: "blob",
                }
            );

            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement("a");
            link.href = url;
            link.setAttribute("download", file.fileName || file.name || "download");
            document.body.appendChild(link);
            link.click();
            link.remove();
            window.URL.revokeObjectURL(url);
        } catch (err) {
            console.error("Download error:", err);
            toast.error("Download failed");
        }
    };

    const openShareModal = () => {
        setShareModal({
            isOpen: true,
            link: window.location.href,
        });
    };

    const closeShareModal = () => {
        setShareModal({
            isOpen: false,
            link: "",
        });
    };

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-screen bg-gray-50 dark:bg-[#030712]">
                <p className="text-gray-600 dark:text-gray-400 font-medium">Loading file...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex justify-center items-center h-screen bg-gray-50 dark:bg-[#030712]">
                <div className="text-center p-8 bg-white dark:bg-gray-900 rounded-lg shadow-md">
                    <h2 className="text-xl font-semibold text-red-600">Error</h2>
                    <p className="text-gray-600 dark:text-gray-400 mt-2">{error}</p>
                </div>
            </div>
        );
    }

    if (!file) return null;

    return (
        <div className="bg-gray-50 dark:bg-[#030712] min-h-screen">
            <header className="p-4 border-b bg-white dark:bg-gray-900 dark:border-gray-800">
                <div className="container mx-auto flex justify-between items-center">
                    <div className="flex items-center gap-2">
                        <CloudUpload size={32} strokeWidth={1.8} />
                        <span className="font-bold text-xl text-gray-800 dark:text-white">CloudShare</span>
                    </div>
                    <button
                        onClick={openShareModal}
                        className="flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-lg cursor-pointer"
                    >
                        <Copy size={18} />
                        Share Link
                    </button>
                </div>
            </header>

            <main className="container mx-auto p-4 md:p-8 flex justify-center">
                <div className="w-full max-w-3xl">
                    <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg shadow-sm p-8 text-center">
                        <div className="flex justify-center mb-4">
                            <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center">
                                <File size={40} className="text-blue-500" />
                            </div>
                        </div>

                        <h1 className="text-2xl font-semibold text-gray-800 dark:text-white break-words">
                            {file.name || file.fileName}
                        </h1>

                        <p className="text-sm text-gray-500 mt-2">
                            {((file.size || file.fileSize) / 1024).toFixed(2)} KB
                            <span className="mx-2">&bull;</span>
                            Shared on {new Date(file.uploadedAt).toLocaleDateString()}
                        </p>

                        <div className="my-6">
                            <span className="inline-block bg-gray-100 text-gray-600 text-xs font-medium px-3 py-1 rounded">
                                {file.type || file.fileType || "File"}
                            </span>
                        </div>

                        <div className="flex justify-center gap-4 my-8">
                            <button
                                onClick={handleDownload}
                                className="flex items-center gap-2 px-6 py-3 bg-gray-800 hover:bg-gray-900 text-white rounded cursor-pointer transition-colors"
                            >
                                <Download size={18} />
                                Download File
                            </button>
                        </div>

                        {/* File Information Section */}
                        <div className="border-t border-gray-200 dark:border-gray-800 pt-6 mt-8 text-left">
                            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">File Information</h3>
                            <div className="space-y-3 text-sm">
                                <div className="flex justify-between">
                                    <span className="text-gray-500 dark:text-gray-400 font-medium">File Name:</span>
                                    <span className="text-gray-800 dark:text-gray-200 font-semibold break-all text-right max-w-[70%]">
                                        {file.fileName || file.name}
                                    </span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-500 font-medium">File Type:</span>
                                    <span className="text-gray-800 font-semibold text-right">
                                        {file.fileType || file.type || "File"}
                                    </span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-500 font-medium">File Size:</span>
                                    <span className="text-gray-800 font-semibold text-right">
                                        {((file.fileSize || file.size) / 1024).toFixed(2)} KB
                                    </span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-500 font-medium">Shared:</span>
                                    <span className="text-gray-850 font-semibold text-right">
                                        {new Date(file.uploadedAt).toLocaleDateString()}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Blue Info Alert Box */}
                    <div className="mt-6 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 text-blue-800 dark:text-blue-300 p-4 rounded-lg flex items-center gap-3">
                        <Info size={20} className="shrink-0" />
                        <p className="text-sm text-left">
                            This file has been shared publicly. Anyone with this link can view and download it.
                        </p>
                    </div>
                </div>
            </main>

            <LinkShareModal
                isOpen={shareModal.isOpen}
                onClose={closeShareModal}
                link={shareModal.link}
                title="Share File"
                file={file}
            />
        </div>
    );
};

export default PublicFileView;