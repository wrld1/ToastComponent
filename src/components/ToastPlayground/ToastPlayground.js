import React, { useContext, useState } from "react";

import Button from "../Button";

import styles from "./ToastPlayground.module.css";
import ToastShelf from "../ToastShelf";
import { ToastContext } from "../ToastProvider/ToastProvider";

const VARIANT_OPTIONS = ["notice", "warning", "success", "error"];

function ToastPlayground() {
  const [variantValue, setVariantValue] = useState("notice");
  const [messageValue, setMessageValue] = useState("");
  const [showToast, setShowToast] = useState(false);

  const { toasts, createToast } = useContext(ToastContext);

  const handleSubmit = (event) => {
    event.preventDefault();
    createToast(messageValue, variantValue);
    setVariantValue("notice");
    setMessageValue("");
  };

  return (
    <div className={styles.wrapper}>
      <header>
        <img alt="Cute toast mascot" src="/toast.png" />
        <h1>Toast Playground</h1>
      </header>

      <form onSubmit={handleSubmit}>
        <div className={styles.controlsWrapper}>
          <div className={styles.row}>
            <label
              htmlFor="message"
              className={styles.label}
              style={{ alignSelf: "baseline" }}
            >
              Message
            </label>
            <div className={styles.inputWrapper}>
              <textarea
                id="message"
                className={styles.messageInput}
                value={messageValue}
                onChange={(e) => setMessageValue(e.target.value)}
              />
            </div>
          </div>

          <div className={styles.row}>
            <div className={styles.label}>Variant</div>
            <div className={`${styles.inputWrapper} ${styles.radioWrapper}`}>
              {VARIANT_OPTIONS.map((variant) => (
                <label htmlFor={`${variant}-notice`} key={variant}>
                  <input
                    id={`${variant}-notice`}
                    type="radio"
                    name={variant}
                    value={variant}
                    checked={variant === variantValue}
                    onChange={(e) => setVariantValue(e.target.value)}
                  />
                  {variant}
                </label>
              ))}

              {/* TODO Other Variant radio buttons here */}
            </div>
          </div>

          <div className={styles.row}>
            <div className={styles.label} />
            <div className={`${styles.inputWrapper} ${styles.radioWrapper}`}>
              <Button type="submit" onClick={() => setShowToast(true)}>
                Pop Toast!
              </Button>
            </div>
          </div>
        </div>
      </form>
      {showToast && <ToastShelf toasts={toasts} />}
    </div>
  );
}

export default ToastPlayground;
