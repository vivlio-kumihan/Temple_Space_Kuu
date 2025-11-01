// @/components/ui/ModalPortal/index.jsx

"use client";

import { createPortal } from "react-dom";
import { useEffect, useState } from "react";

/**
 * モーダル用のポータルコンポーネント
 * body要素にモーダルをマウントする
 */
export const ModalPortal = ({ children }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  if (!mounted) return null;

  const target = document.querySelector("body");
  return createPortal(children, target);
};
