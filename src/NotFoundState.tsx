import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

interface NotFoundStateProps {
  title?: string;
  message?: string;
  onReset?: () => void;
  resetText?: string;
}

export default function NotFoundState({
  message ,
}: NotFoundStateProps) {
  return (
    <div className="flex flex-col items-center justify-center p-8 text-center my-4 rounded-2xl bg-(--bg-searchInput)/50 border border-(--border) transition-all duration-300">
      <div className="relative mb-4 flex items-center justify-center w-16 h-16 rounded-full bg-(--bg-status) text-(--button)">
        <FontAwesomeIcon icon={faSearch} className="text-2xl" />
      </div>
      <p className="text-sm text-(--text-secondary) max-w-sm  leading-relaxed">
        {message}
      </p>
    </div>
  );
}
        {/* <span className="absolute -top-1 -right-1 flex h-4 w-4"> */}
          {/* <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-(--error-text) opacity-75"></span> */}
          {/* <span className="relative inline-flex rounded-full h-4 w-4 bg-(--error-text)"></span> */}
        {/* </span> */}