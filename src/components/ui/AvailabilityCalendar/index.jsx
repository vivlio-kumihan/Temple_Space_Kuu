// @/components/ui/AvailabilityCalendar/index.jsx

"use client";

import { useState, useEffect } from "react";
import { getAvailability } from "@/lib/availability";
import styles from "./AvailabilityCalendar.module.scss";

const AvailabilityCalendar = ({ templeId, onSelectDateTime }) => {
  const [availability, setAvailability] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);

  const timeSlots = [
    { value: "09:00", label: "9:00〜", key: "time_09" },
    { value: "11:00", label: "11:00〜", key: "time_11" },
    { value: "13:00", label: "13:00〜", key: "time_13" },
    { value: "15:00", label: "15:00〜", key: "time_15" },
  ];

  useEffect(() => {
    const loadAvailability = async () => {
      setLoading(true);
      const data = await getAvailability(templeId);
      setAvailability(data);
      setLoading(false);
    };
    loadAvailability();
  }, [templeId]);

  // 日付を選択
  const handleDateClick = (date) => {
    setSelectedDate(date);
    setSelectedTime(null); // 時間の選択をリセット
    if (onSelectDateTime) {
      onSelectDateTime(date, null);
    }
  };

  // 時間を選択
  const handleTimeClick = (time) => {
    setSelectedTime(time);
    if (onSelectDateTime) {
      onSelectDateTime(selectedDate, time);
    }
  };

  // 選択された日付の空き状況を取得
  const getAvailabilityForDate = (date) => {
    return availability.find((item) => item.date === date);
  };

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const dayOfWeek = ["日", "月", "火", "水", "木", "金", "土"][date.getDay()];
    return `${month}月${day}日（${dayOfWeek}）`;
  };

  if (loading) {
    return <div className={styles.calender}>読み込み中...</div>;
  }

  const availableDates = availability.map((item) => {
    const date = new Date(item.date);
    return {
      date: item.date,
      display: `${date.getMonth() + 1}/${date.getDate()}`,
      dayOfWeek: ["日", "月", "火", "水", "木", "金", "土"][date.getDay()],
    };
  });

  const selectedDateAvailability = selectedDate
    ? getAvailabilityForDate(selectedDate)
    : null;

  return (
    <div className={styles.calendar}>
      <h4 className={styles.calendar__title}>空き状況を確認</h4>

      {/* 選択中の日時を表示 */}
      {selectedDate && (
        <div className={styles.selectedInfo}>
          <div className={styles.selectedInfo__label}>選択中の予約</div>
          <div className={styles.selectedInfo__content}>
            <strong>{formatDate(selectedDate)}</strong>
            {selectedTime && (
              <>
                <span className={styles.selectedInfo__separator}>・</span>
                <strong>{selectedTime}〜</strong>
              </>
            )}
          </div>
        </div>
      )}

      {/* 日付選択 */}
      <div className={styles.calendar__dates}>
        {availableDates.map((dateObj) => (
          <button
            key={dateObj.date}
            type="button"
            className={`${styles.dateButton} ${
              selectedDate === dateObj.date ? styles.selected : ""
            } ${styles.available}`}
            onClick={() => handleDateClick(dateObj.date)}
          >
            <div className={styles.dateButton__month}>{dateObj.display}</div>
            <div className={styles.dateButton__day}>{dateObj.dayOfWeek}</div>
          </button>
        ))}
      </div>

      {/* 時間選択 */}
      {selectedDate && selectedDateAvailability && (
        <div className={styles.calendar__times}>
          <h5 className={styles.calendar__subtitle}>時間を選択してください</h5>
          <div className={styles.timeSlots}>
            {timeSlots.map((slot) => {
              const isAvailable =
                selectedDateAvailability[slot.key] === "available";

              return (
                <button
                  key={slot.value}
                  type="button"
                  className={`${styles.timeButton} ${
                    selectedTime === slot.value ? styles.selected : ""
                  } ${isAvailable ? styles.available : styles.booked}`}
                  onClick={() => handleTimeClick(slot.value)}
                  disabled={!isAvailable}
                >
                  {slot.label}
                  {!isAvailable && (
                    <span className={styles.timeButton__status}>予約済</span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default AvailabilityCalendar;