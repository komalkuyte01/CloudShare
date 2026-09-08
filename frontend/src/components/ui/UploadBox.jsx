import { useRef, useState } from "react";
import { UploadCloud, X, FileText, Image, Video, Music, File as FileIcon, Loader2 } from "lucide-react";

const UploadBox = ({ files, onFileChange, onUpload, uploading, onRemoveFile, remainingCredits, isUploadDisable }) => {
    const fileInputRef = useRef(null);
    const [isDragging, setIsDragging] = useState(false);

    // Get icon based on file extension
    const getFileIcon = (fileName) => {
        const ext = fileName?.split(".").pop().toLowerCase() || "";

        if (["jpg", "jpeg", "png", "gif", "svg", "webp"].includes(ext)) {
            return <Image size={20} className="text-blue-500" />;
        }
        if (["mp4", "webm", "mov", "avi", "mkv"].includes(ext)) {
            return <Video size={20} className="text-blue-500" />;
        }
        if (["mp3", "wav", "ogg", "flac", "m4a"].includes(ext)) {
            return <Music size={20} className="text-green-500" />;
        }
        if (["pdf", "doc", "docx", "txt", "rtf"].includes(ext)) {
            return <FileText size={20} className="text-amber-500" />;
        }
        return <FileIcon size={20} className="text-gray-500" />;
    };

    // Format file size
    const formatSize = (bytes) => {
        if (bytes < 1024) return bytes + " B";
        if (bytes < 1048576) return (bytes / 1024).toFixed(2) + " KB";
        return (bytes / 1048576).toFixed(2) + " MB";
    };

    // Drag and drop handlers
    const handleDragOver = (e) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = (e) => {
        e.preventDefault();
        setIsDragging(false);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setIsDragging(false);
        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            // Create a fake event to reuse onFileChange
            const fakeEvent = { target: { files: e.dataTransfer.files } };
            onFileChange(fakeEvent);
        }
    };

    const handleClick = () => {
        fileInputRef.current?.click();
    };

    return (
        <div className="w-full max-w-3xl mx-auto">
            {/* Header */}
            <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-2">
                    <UploadCloud size={22} className="text-blue-600" />
                    <h2 className="text-xl font-semibold text-gray-800 dark:text-white">Upload Files</h2>
                </div>
                <span className="text-sm text-gray-500 dark:text-gray-400 font-medium">
                    {remainingCredits} credits remaining
                </span>
            </div>

            {/* Drop Zone */}
            <div
                onClick={handleClick}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                className={`relative cursor-pointer border-2 border-dashed rounded-xl p-6 sm:p-10 flex flex-col items-center justify-center transition-all duration-300
                    ${isDragging
                        ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20 scale-[1.01]"
                        : "border-gray-300 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-800/50 hover:border-blue-400 hover:bg-blue-50/40 dark:hover:bg-blue-900/10"
                    }`}
            >
                <div className={`p-3 rounded-full mb-3 transition-colors duration-300 ${isDragging ? "bg-blue-200" : "bg-blue-100"}`}>
                    <UploadCloud size={28} className={`transition-colors duration-300 ${isDragging ? "text-blue-700" : "text-blue-500"}`} />
                </div>
                <p className="text-gray-700 dark:text-gray-300 font-medium text-base">
                    Drag and drop files here
                </p>
                <p className="text-gray-400 text-sm mt-1">
                    or click to browse ({remainingCredits} credits remaining)
                </p>

                {/* Hidden file input */}
                <input
                    type="file"
                    ref={fileInputRef}
                    onChange={onFileChange}
                    multiple
                    className="hidden"
                />
            </div>

            {/* Selected Files List */}
            {files.length > 0 && (
                <div className="mt-6">
                    <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                        Selected Files ({files.length})
                    </h3>

                    <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
                        {files.map((file, index) => (
                            <div
                                key={index}
                                className="flex items-center justify-between bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg px-4 py-3 group hover:border-blue-200 dark:hover:border-blue-800 hover:shadow-sm transition-all duration-200"
                            >
                                <div className="flex items-center gap-3 min-w-0">
                                    {getFileIcon(file.name)}
                                    <div className="min-w-0">
                                        <p className="text-sm font-medium text-gray-800 dark:text-gray-200 truncate max-w-xs">
                                            {file.name}
                                        </p>
                                        <p className="text-xs text-gray-400">
                                            {formatSize(file.size)}
                                        </p>
                                    </div>
                                </div>

                                <button
                                    onClick={() => onRemoveFile(index)}
                                    className="p-1 rounded-full text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors duration-200 cursor-pointer"
                                    title="Remove file"
                                >
                                    <X size={18} />
                                </button>
                            </div>
                        ))}
                    </div>

                    {/* Upload Button */}
                    <button
                        onClick={onUpload}
                        disabled={isUploadDisable || uploading}
                        className={`mt-5 w-full py-3 rounded-lg font-semibold text-white text-base flex items-center justify-center gap-2 transition-all duration-300 cursor-pointer
                            ${isUploadDisable || uploading
                                ? "bg-gray-300 cursor-not-allowed"
                                : "bg-blue-600 hover:bg-blue-700 active:scale-[0.98] shadow-md hover:shadow-lg"
                            }`}
                    >
                        {uploading ? (
                            <>
                                <Loader2 size={20} className="animate-spin" />
                                Uploading...
                            </>
                        ) : (
                            <>
                                <UploadCloud size={20} />
                                Upload
                            </>
                        )}
                    </button>
                </div>
            )}
        </div>
    );
};

export default UploadBox;
