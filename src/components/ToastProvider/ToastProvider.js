import React, { useState } from "react";
import { useEscapeKey } from "../../hooks/useEscapeKey";

export const ToastContext = React.createContext();

function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const handleEscape = React.useCallback(() => {
    setToasts([]);
  }, []);

  useEscapeKey(handleEscape);

  function createToast(message, variant) {
    const nextToasts = [
      ...toasts,
      {
        id: crypto.randomUUID(),
        message,
        variant,
      },
    ];

    setToasts(nextToasts);
  }

  function dismissToast(id) {
    const nextToasts = toasts.filter((toast) => {
      return toast.id !== id;
    });
    setToasts(nextToasts);
  }

  return (
    <ToastContext.Provider
      value={{
        toasts,
        setToasts,
        createToast,
        dismissToast,
      }}
    >
      {children}
    </ToastContext.Provider>
  );
}

export default ToastProvider;
