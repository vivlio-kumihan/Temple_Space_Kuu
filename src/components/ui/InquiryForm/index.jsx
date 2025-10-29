// @/components/ui/InquiryForm/index.jsx

"use client";

import { useState } from "react";
import { createInquiry } from "@/lib/contacts";
import styles from "./InquiryForm.module.scss";

const InquiryForm = ({
  templeId,
  templeName,
  onClose,
  onSuccess,
}) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // フォームの入力値を更新
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // フォームの送信
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // バリデーション
    if (!formData.name || !formData.email || !formData.message) {
      setError("必須項目を入力してください。");
      return;
    }

    setLoading(true);

    // 予約データを送信
    const result = await createInquiry({
      templeId,
      templeName,
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      message: formData.message,
    });

    setLoading(false);

    if (result.success) {
      onSuccess({
        message: result.message,
      });
      onClose();
    } else {
      setError(result.error);
    }
  }

  return (
    <div className={styles.form}>
      <h2 className={styles.form__title}>お問い合わせフォーム</h2>
      <h3 className={styles.form__subtitle}>{templeName}</h3>
      <p className={styles.form__description}>
        ご利用に関するご質問やご不明な点がございましたら、お気軽にお問い合わせください。
      </p>

      {error && <div className={styles.form__error}>{error}</div>}

      <form onSubmit={handleSubmit}>
        {/* 名前 */}
        <div className={styles.form__item}>
          <label htmlFor="name" className={styles.form__label}>
            お名前<span className={styles.form__required}>必須</span>
          </label>
          <input
            id="name"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={styles.form__input}
            placeholder="御堂レン太"
            required
          />
        </div>

        {/* メールアドレス */}
        <div className={styles.form__item}>
          <label htmlFor="email" className={styles.form__label}>
            メールアドレス<span className={styles.form__required}>必須</span>
          </label>
          <input
            id="email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={styles.form__input}
            placeholder="example@example.com"
            required
          />
        </div>

        {/* 電話番号 */}
        <div className={styles.form__item}>
          <label htmlFor="phone" className={styles.form__label}>
            電話番号（任意）
          </label>
          <input
            id="phone"
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className={styles.form__input}
            placeholder="090-12340-5678"
            required
          />
        </div>

        {/* お問い合わせ内容 */}
        <div className={styles.form__item}>
          <label htmlFor="message" className={styles.form__label}>
            お問い合わせ内容
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            className={styles.form__textarea}
            placeholder="ご質問内容をご記入ください。"
            rows={5}
            required
          />
        </div>

        {/* 送信ボタン */}
        <div className={styles.form__actions}>
          <button
            type="button"
            onClick={onClose}
            className={styles.form__cancelButton}
            disabled={loading}
          >
            キャンセル
          </button>
          <button
            type="submit"
            className={styles.form__submitButton}
            disabled={loading}
          >
            {loading ? "送信中..." : "問い合わせを送信"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default InquiryForm;