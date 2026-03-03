import { useEffect, useRef } from "react";

function Modal({ show, onClose, children, className = "" }) {
  const closeBtnRef = useRef(null);
  const previousFocusRef = useRef(null);
  const dialogRef = useRef(null);

  useEffect(() => {
    if (!show) return;

    previousFocusRef.current = document.activeElement;
    closeBtnRef.current?.focus();

    const onKeyDown = (e) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose(false);
        return;
      }

      if (e.key !== "Tab") return;

      const root = dialogRef.current;
      if (!root) return;

      const focusable = root.querySelectorAll(
        'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'
      );
      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      const active = document.activeElement;

      if (e.shiftKey) {
        if (active === first || active === root) {
          e.preventDefault();
          last.focus();
        }
      } else {
        if (active === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      const el = previousFocusRef.current;
      if (el && typeof el.focus === "function") el.focus();
    };
  }, [show, onClose]);

  return (
    <div
      aria-hidden={!show}
      className={`fixed inset-0 z-30 flex items-start justify-center px-4 pt-20 pb-10 transition-opacity duration-300 ${
        show ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
      }`}
    >
      <button
        type="button"
        aria-label="Close dialog"
        className="fixed inset-0 bg-black/60 backdrop-blur-sm cursor-default"
        onClick={() => onClose(false)}
        tabIndex={-1}
      />
      <div
        role="dialog"
        aria-modal="true"
        ref={dialogRef}
        className={`relative w-full max-w-2xl max-h-[80vh] overflow-y-auto overflow-x-hidden rounded-card bg-surface-elevated shadow-modal ring-1 ring-border transform transition-transform duration-300 p-6 sm:p-8 ${
          show ? "translate-y-0" : "translate-y-4"
        } ${className}`}
      >
        <button
          onClick={() => {
            onClose(false);
          }}
          ref={closeBtnRef}
          type="button"
          aria-label="Close dialog"
          className="absolute top-4 left-4 sm:top-6 sm:left-6 w-10 h-10 flex items-center justify-center font-bold rounded-full bg-surface text-white min-h-[44px]"
        >
          ×
        </button>
        <div className="pt-10 sm:pt-8">{children}</div>
      </div>
    </div>
  );
}

export default Modal;