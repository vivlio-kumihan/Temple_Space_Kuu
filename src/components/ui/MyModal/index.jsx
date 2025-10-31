// @/components/ui/MyModal/index.jsx

"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/Button";
import styles from "./MyModal.module.scss";

const MyModal = ({ handleCloseClick, isClosing }) => {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  const handleOverlayClick = (e) => {
    // 背景クリック時の処理
    e.target === e.currentTarget && handleCloseClick();
  };

  return (
    <>
      {/* 背景全体 */}
      <div 
        className={`${styles.overlay} ${isClosing ? styles.closing : ""}`}
        onClick={handleOverlayClick}
      >
        {/* モーダルのコンテンツ */}
        <div 
          className={`${styles.modal} ${isClosing ? styles.closing : ""}`}
        >
            <Button
              type="button"
              onClick={handleCloseClick}
            >
              閉じる
            </Button>
            <div className={styles.modal__contents}>
              <h2>Modal</h2>
              <p>hello, hello, hello</p>
            </div>
        </div>
      </div>
    </>
  );
};

export default MyModal;