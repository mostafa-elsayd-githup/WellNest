import type { Errortype } from "../../types/type";

function ToastErrorMessage({ error }: Errortype) {
  return (
    <>
      <div className="mt-1.5 flex flex-col gap-2">
        <p className="text-(--error-text) text-sm leading-relaxed font-medium">
          {error.message}
        </p>
        {error.InputError && (
          <div className="flex items-center gap-1.5 text-[11px] font-mono mt-1">
            <span className="text-(--text-secondary)">Field:</span>
            <span className="px-2 py-0.5 rounded-md bg-(--error-bg) text-(--error-text) border border-(--error-border) font-semibold uppercase tracking-wider">
              {String(error.InputError)}
            </span>
          </div>
        )}
      </div>
    </>
  );
}

export default ToastErrorMessage;
