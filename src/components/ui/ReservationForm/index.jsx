// @/components/ui/ReservationForm/index.jsx

"use client";

import { useState } from "react";
import { createReservation } from "@/lib/contacts";
import styles from "./ReservationForm.module.scss";

const ReservationForm = ({
  templeId,
  templeName,
  selectedDate,
  selectedTimes,
  onClose,
  onSuccess,
}) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // フォームの入力値を更新
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev, [name]: value,
    }));
  };

  // フォームの送信
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // バリデーション
    if (!selectedDate || selectedTimes.length === 0) {
      setError("日時を選択してください。");
      return;
    }

    if (!formData.name || !formData.email || !formData.phone) {
      setError("必須項目を入力してください。");
      return;
    }

    setLoading(true);

    // 予約データを送信
    const result = await createReservation({
      templeId,
      templeName,
      date: selectedDate,
      times: selectedTimes,
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      address: formData.address,
      message: formData.message,
    });

    setLoading(false);

    if (result.success) {
      onSuccess({
        message: result.message,
        deadline: result.deadline,
      });
      onClose();
    } else {
      setError(result.error);
    }
  }

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const dayOfWeek = ["日", "月", "火", "水", "木", "金", "土"][
      date.getDay()
    ];

    return `${year}年${month}月${day}日（${dayOfWeek}）`;
  };  
  
  return (
    <div className={styles.form}>
      <h2 className={styles.form__title}>予約フォーム</h2>
      <h3 className={styles.form__subtitle}>{templeName}</h3>

      {/* 選択した日時を表示 */}
      {selectedDate && selectedTimes.length > 0 && (
        <div className={styles.form__selected}>
          <div className={styles.form__selectedLabel}>ご予約内容</div>
          <div className={styles.form__selectedContent}>
            <strong>{formatDate(selectedDate)}</strong>
            <br />
            <strong>{selectedTimes.join(", ")}</strong>
          </div>
        </div>
      )}

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
            電話番号<span className={styles.form__required}>必須</span>
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

        {/* 住所 */}
        <div className={styles.form__item}>
          <label htmlFor="address" className={styles.form__label}>
            住所（任意）
          </label>
          <input
            id="address"
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            className={styles.form__input}
            placeholder="大阪府平高市西山..."
          />
        </div>

        {/* ご要望・メッセージ */}
        <div className={styles.form__item}>
          <label htmlFor="message" className={styles.form__label}>
            ご要望・メッセージ（任意）
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            className={styles.form__textarea}
            placeholder="ご要望やご質問がございましたらご記入ください。"
            rows={5}
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
            {loading ? "送信中..." : "予約リクエストを送信"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ReservationForm;