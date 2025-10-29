// @/components/ui/Modal/index.jsx

"use client";

import styles from "./Modal.module.scss";

const Modal = ({ children, toggleModal }) => {

  return (
    <div className={styles.overlay} onClick={toggleModal}>
      <div className={styles.content} onClick={(e) => e.stopPropagation()}>
        <button className={styles.close} onClick={toggleModal}>
          ×
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
