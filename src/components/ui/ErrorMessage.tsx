import Button from "./Button";

interface ErrorMessageProps {
    message?: string | null;
    onRetry?: () => void;
  }
  
  export default function ErrorMessage({ message, onRetry }: ErrorMessageProps) {
    if (!message) return null;
  
    return (
      <div className="p-4 mb-4 bg-red-50 rounded-md">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <svg
              className="w-5 h-5 text-red-400"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <div className="ml-3">
            <p className="text-sm font-medium text-red-800">{message}</p>
            {onRetry && (
              <Button
                onClick={onRetry}
                className="mt-2 text-sm font-medium text-red-700 hover:text-red-600"
              >
                Retry →
              </Button>
            )}
          </div>
        </div>
      </div>
    );
  }