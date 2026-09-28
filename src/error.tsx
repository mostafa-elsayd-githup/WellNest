import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTriangleExclamation,
  faRotateRight,
} from "@fortawesome/free-solid-svg-icons";

interface ErrorStateProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
}

export const ErrorState: React.FC<ErrorStateProps> = ({

  message,
  onRetry,
}) => {
    
  return (
    <div className="flex flex-col items-center justify-center p-8 text-center rounded-2xl transition-colors duration-200 bg-(--error-bg) ">
      <div className="w-20 h-20  flex items-center justify-center rounded-full bg-(--error-bg) text-(--error-text)  mb-4">
        <FontAwesomeIcon icon={faTriangleExclamation} className="text-5xl" />
      </div>
      <h3
        className={`text-2xl font-semibold mb-8 text-(--error-title)`}
      >
        {message}
      </h3>

      <button
        onClick={onRetry}
        className="cursor-pointer inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-medium transition-colors shadow-sm bg-(--error-btn-bg) text-(--error-btn-text) hover:bg-(--error-btn-hover)"
      >
        <FontAwesomeIcon icon={faRotateRight} />
        <span className="">Reload</span>
      </button>
    </div>
  );
};

export default ErrorState;
