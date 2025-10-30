// @/components/ui/Button/index.jsx

"use client";

import { useState } from "react";
import styles from "./Button.module.scss";

/**
 * 汎用ボタンコンポーネント
 * @param {Object} props
 * @param {React.ReactNode} props.children - ボタン内のコンテンツ
 * @param {string} [props.variant="light"] - カラーバリエーション: "light" | "dark" | "outline" | "primary" | "secondary"
 * @param {string} [props.size="medium"] - サイズ: "small" | "medium" | "large"
 * @param {boolean} [props.rounded=false] - 丸ボタンにするか
 * @param {boolean} [props.fullWidth=false] - 幅100%にするか
 * @param {string} [props.className] - 追加のカスタムクラス
 * @param {Function} [props.onClick] - クリックハンドラー
 */

export const Button = ({
  children,
  className,
  variant = "light",
  size = "medium",
  rounded = false,
  fullWidth = false,
  onClick,
  ...props
}) => {
  // ボタンをクリックした時の状態管理
  const [isClicked, setIsClicked] = useState(false);
  const toggleHandler = (e) => {
    setIsClicked((prevState) => !prevState);
    // ボタンを配置している親から渡ってきたonClick属性を使って、親のイベントを発火させる。
    if (onClick) onClick(e); // onClick?.(e); <= こんな書き方もできる。
  };

  const buttonClasses = [
    styles.button,
    styles[variant],
    styles[size],
    rounded ? styles.rounded : "",
    fullWidth ? styles.fullWidth : "",
    isClicked ? styles.clicked : "",
    className || "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <button className={buttonClasses} onClick={toggleHandler} {...props}>
      {children}
    </button>
  );
};

/**
 * 動画コントロール用ボタン
 * @param {Object} props
 * @param {React.RefObject} props.videoRef - 動画要素のref
 */
export const MovieControlButton = ({
  videoRef,
  className,
  variant = "primary",
  ...props
}) => {
  const [isPlaying, setIsPlaying] = useState(false);

  const togglePlayback = () => {
    if (videoRef?.current) {
      if (isPlaying) {
        videoRef.current.myPause();
      } else {
        videoRef.current.myPlay();
      }
      setIsPlaying((prev) => !prev);
    }
  };

  const buttonClasses = [
    styles.button,
    styles[variant],
    styles.movieControl,
    className || "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <button className={buttonClasses} onClick={togglePlayback} {...props}>
      {isPlaying ? "⏸ 停止" : "▶ 再生"}
    </button>
  );
};