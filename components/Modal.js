import { useEffect, useRef } from "react";

function Modal({show, onClose, children, className = ""}) {
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
    style={{
      transform: show ? "translateX(0%)" : "translateX(-200%)"
    }}
    aria-hidden={!show}
    className={`absolute top-0 left-0 w-full h-full z-10 transition-all duration-500 ${show ? "" : "pointer-events-none"}`}>

    <button
      type="button"
      aria-label="Close dialog"
      className="absolute inset-0 bg-black/40 cursor-default"
      onClick={() => onClose(false)}
      tabIndex={-1}
    />
    <div
      role="dialog"
      aria-modal="true"
      ref={dialogRef}
      className={`relative container py-6 px-4 mx-auto max-w-2xl max-h-[80vh] rounded-3xl bg-slate-800 overflow-y-auto ${className}`}
    >
      <button
        onClick={() => {
            onClose(false)
        }}
        ref={closeBtnRef}
        type="button"
        aria-label="Close dialog"
        className="w-10 h-10 mb-4 font-bold rounded-full bg-slate-600 min-h-[44px]">X</button>
      {children}

    </div>

  </div>
  )
}

export default Modal;