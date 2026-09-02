import { X } from "lucide-react";

const Modal = ({ isOpen, onClose, title, children, onConfirm, confirmText, cancelText, confirmButtonClass, size }) => {
    if (!isOpen) return null;

    const sizeClass = size === "sm" ? "max-w-sm" : size === "lg" ? "max-w-2xl" : "max-w-md";

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
            onClick={onClose}
        >
            <div
                className={`bg-white dark:bg-gray-800 rounded-xl shadow-xl w-full ${sizeClass} mx-4 p-6`}
                onClick={(e) => e.stopPropagation()}
            >

                {/* Header */}
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                        {title}
                    </h2>
                    <button
                        onClick={onClose}
                        className="p-1 rounded-full text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                    >
                        <X size={18} />
                    </button>
                </div>

                {/* Body */}
                <div className="mb-6">
                    {children}
                </div>

                {/* Footer */}
                <div className="flex justify-end gap-3">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                    >
                        {cancelText || "Close"}
                    </button>

                    {onConfirm && (
                        <button
                            onClick={onConfirm}
                            className={`px-4 py-2 text-sm font-medium text-white rounded-lg transition-colors ${confirmButtonClass || "bg-blue-600 hover:bg-blue-700"}`}
                        >
                            {confirmText || "Confirm"}
                        </button>
                    )}
                </div>

            </div>
        </div>
    );
};

export default Modal;