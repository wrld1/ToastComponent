import React, { useContext } from "react";
import {
  AlertOctagon,
  AlertTriangle,
  CheckCircle,
  Info,
  X,
} from "react-feather";

import VisuallyHidden from "../VisuallyHidden";

import styles from "./Toast.module.css";
import { ToastContext } from "../ToastProvider/ToastProvider";

const ICONS_BY_VARIANT = {
  notice: Info,
  warning: AlertTriangle,
  success: CheckCircle,
  error: AlertOctagon,
};

function Toast({ variant, children, id }) {
  const Icon = ICONS_BY_VARIANT[variant];
  const { dismissToast } = useContext(ToastContext);

  return (
    <div className={`${styles.toast} ${styles[variant]}`}>
      <div className={styles.iconContainer}>
        <Icon size={24} />
      </div>
      <p className={styles.content}>
        {children} <VisuallyHidden>error - {variant}</VisuallyHidden>
      </p>
      <button
        aria-label="Dismiss message"
        aria-live="off"
        className={styles.closeButton}
        onClick={() => dismissToast(id)}
      >
        <X size={24} />
      </button>
    </div>
  );
}

export default Toast;
