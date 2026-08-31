import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Download, FileText, Image, Video, Music, Archive, File, Loader2, ShieldCheck, AlertTriangle } from "lucide-react";
import toast from "react-hot-toast";
import { apiEndpoints } from "../Util/apiEndpoints.js";

const PublicFileView = () => {
    const { fileId } = useParams();
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [downloading, setDownloading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPublicFile = async () => {
            try {
                setLoading(true);
                const response = await axios.get(apiEndpoints.GET_PUBLIC_FILE(fileId));
                setFile(response.data);
                setError(null);
            } catch (err) {
                console.error("Error fetching public file:", err);
                setError("This file is not found, or it is no longer public.");
            } finally {
                setLoading(false);
            }
        };

        if (fileId) {
            fetchPublicFile();
        }
    }, [fileId]);

    const handleDownload = async () => {
        if (!file) return;
        try {
            setDownloading(true);
            const response = await axios.get(
                apiEndpoints.DOWNLOAD_FILES(file.id),
                { responseType: "blob" }
            );

            // Create a blob with explicit type
            const blob = new Blob([response.data], {
                type: response.headers["content-type"] || "application/octet-stream",
            });
            const url = window.URL.createObjectURL(blob);

            // Create download link
            const link = document.createElement("a");
            link.style.display = "none";
            link.href = url;
            link.setAttribute("download", file.fileName);
            document.body.appendChild(link);
            link.click();

            // Cleanup
            setTimeout(() => {
                document.body.removeChild(link);
                window.URL.revokeObjectURL(url);
            }, 1000);

            toast.success("Download started!");
        } catch (err) {
            console.error("Download failed:", err);
            toast.error("Error downloading file");
        } finally {
            setDownloading(false);
        }
    };

    const getFileIcon = (fileType) => {
        if (!fileType) return <File className="w-16 h-16 text-purple-500" />;
        const type = fileType.toLowerCase();
        if (type.includes("image")) return <Image className="w-16 h-16 text-blue-500" />;
        if (type.includes("video")) return <Video className="w-16 h-16 text-rose-500" />;
        if (type.includes("audio")) return <Music className="w-16 h-16 text-emerald-500" />;
        if (type.includes("pdf") || type.includes("word") || type.includes("text") || type.includes("document")) return <FileText className="w-16 h-16 text-amber-500" />;
        if (type.includes("zip") || type.includes("rar") || type.includes("tar") || type.includes("compressed")) return <Archive className="w-16 h-16 text-indigo-500" />;
        return <File className="w-16 h-16 text-purple-500" />;
    };

    const formatFileSize = (bytes) => {
        if (!bytes || bytes === 0) return "0 Bytes";
        const k = 1024;
        const sizes = ["Bytes", "KB", "MB", "GB"];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
    };

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 text-gray-700">
                <Loader2 className="animate-spin text-purple-600 mb-4" size={40} />
                <p className="text-lg font-medium">Loading file details...</p>
            </div>
        );
    }

    if (error || !file) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-6 text-center">
                <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 max-w-md w-full">
                    <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4 text-red-600">
                        <AlertTriangle size={32} />
                    </div>
                    <h2 className="text-xl font-bold text-gray-900 mb-2">File Access Error</h2>
                    <p className="text-gray-500 mb-6">{error || "File not found"}</p>
                    <a
                        href="/dashboard"
                        className="inline-block w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-6 rounded-xl transition duration-200 shadow-md animate-none"
                    >
                        Go to Dashboard
                    </a>
                </div>
            </div>
        );
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-tr from-purple-50 to-indigo-50 p-6">
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 max-w-md w-full transform transition-all duration-300 hover:scale-[1.01]">
                {/* Header */}
                <div className="flex items-center justify-center gap-2 mb-6">
                    <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
                        CloudShare Secure Link
                    </span>
                </div>

                {/* File Icon Container */}
                <div className="w-28 h-28 bg-purple-50 rounded-2xl flex items-center justify-center mx-auto mb-6 border border-purple-100 shadow-inner">
                    {getFileIcon(file.fileType)}
                </div>

                {/* File Name & Info */}
                <div className="text-center mb-8">
                    <h2 className="text-xl font-extrabold text-gray-950 break-all leading-tight mb-2 px-2">
                        {file.fileName}
                    </h2>
                    <div className="flex items-center justify-center gap-3 text-sm text-gray-500 font-medium mt-3">
                        <span>{formatFileSize(file.fileSize)}</span>
                        <span className="w-1.5 h-1.5 bg-gray-300 rounded-full"></span>
                        <span>{new Date(file.uploadedAt).toLocaleDateString()}</span>
                    </div>
                </div>

                {/* Download Button */}
                <button
                    onClick={handleDownload}
                    disabled={downloading}
                    className="w-full bg-purple-600 hover:bg-purple-700 disabled:bg-purple-400 text-white font-semibold py-3.5 px-6 rounded-xl transition duration-200 shadow-md flex items-center justify-center gap-2 cursor-pointer"
                >
                    {downloading ? (
                        <>
                            <Loader2 className="animate-spin" size={20} />
                            <span>Downloading...</span>
                        </>
                    ) : (
                        <>
                            <Download size={20} />
                            <span>Download File</span>
                        </>
                    )}
                </button>

                {/* Security Badge */}
                <div className="flex items-center justify-center gap-1.5 text-xs text-green-600 font-semibold mt-6 bg-green-50/50 py-2 rounded-lg border border-green-100/50">
                    <ShieldCheck size={16} />
                    <span>Securely scanned & verified by CloudShare</span>
                </div>
            </div>

            {/* Back link */}
            <p className="mt-6 text-sm text-gray-500 font-medium">
                Want to host files yourself?{" "}
                <a href="/dashboard" className="text-purple-600 hover:text-purple-700 underline">
                    Join CloudShare
                </a>
            </p>
        </div>
    );
};

export default PublicFileView;