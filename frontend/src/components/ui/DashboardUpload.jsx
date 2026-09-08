import { useRef } from "react";
import { UploadCloud, X, File, Loader2 } from "lucide-react";

const DashboardUpload = ({
    files,
    onFileChange,
    onUpload,
    uploading,
    onRemoveFile,
    remainingUploads,
}) => {
    const fileInputRef = useRef(null);

    const handleClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    const formatSize = (bytes) => {
        if (bytes === 0) return "0 Bytes";
        const k = 1024;
        const sizes = ["Bytes", "KB", "MB", "GB"];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
    };

    return (
        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 shadow-sm">
            <h3 className="font-bold text-gray-800 dark:text-white text-lg mb-4">Upload Files</h3>

            {/* Drop Zone Box */}
            <div
                onClick={handleClick}
                className="border-2 border-dashed border-gray-300 dark:border-gray-700 hover:border-blue-500 bg-gray-50/50 dark:bg-gray-800/50 hover:bg-blue-50/10 dark:hover:bg-blue-900/10 rounded-2xl p-5 sm:p-8 text-center cursor-pointer transition-colors duration-200"
            >
                <div className="flex justify-center mb-2">
                    <UploadCloud className="text-blue-500" size={32} />
                </div>
                <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">Click or drag files here</p>
                <p className="text-xs text-gray-400 mt-1">Remaining uploads: {remainingUploads}</p>

                <input
                    type="file"
                    ref={fileInputRef}
                    onChange={onFileChange}
                    multiple
                    className="hidden"
                    disabled={remainingUploads <= 0}
                />
            </div>

            {/* Selected files list */}
            {files.length > 0 && (
                <div className="mt-5 space-y-3">
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Selected ({files.length})</p>
                    <div className="max-h-48 overflow-y-auto space-y-2 pr-1">
                        {files.map((file, idx) => (
                            <div key={idx} className="flex items-center justify-between bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-3">
                                <div className="flex items-center gap-2 min-w-0">
                                    <File size={16} className="text-blue-500 shrink-0" />
                                    <div className="min-w-0">
                                        <p className="text-xs font-semibold text-gray-800 dark:text-gray-200 truncate max-w-[160px]">{file.name}</p>
                                        <p className="text-[10px] text-gray-400">{formatSize(file.size)}</p>
                                    </div>
                                </div>
                                <button
                                    onClick={() => onRemoveFile(idx)}
                                    className="p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg text-gray-400 hover:text-red-500 transition cursor-pointer"
                                >
                                    <X size={14} />
                                </button>
                            </div>
                        ))}
                    </div>

                    <button
                        onClick={onUpload}
                        disabled={uploading}
                        className="w-full mt-3 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold py-3 rounded-xl text-sm transition duration-200 shadow-md flex items-center justify-center gap-2 cursor-pointer"
                    >
                        {uploading ? (
                            <>
                                <Loader2 className="animate-spin" size={16} />
                                <span>Uploading...</span>
                            </>
                        ) : (
                            <>
                                <UploadCloud size={16} />
                                <span>Upload Files</span>
                            </>
                        )}
                    </button>
                </div>
            )}
        </div>
    );
};

export default DashboardUpload;
