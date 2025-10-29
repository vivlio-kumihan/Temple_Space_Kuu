// @/lib/contacts.js

import { supabase } from "./supabase";
import { sendReservationEmails } from "./email";
import { sendInquiryEmails } from "./email";

// 予約を作成
export async function createReservation(reservationData) {
  try {
    // 振込期限
    const deadline = new Date();
    deadline.setDate(deadline.getDate() + 3);
    deadline.setHours(23, 59, 59);

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

    const deadlineStr = formatDate(deadline.toISOString());

    // 1. contacts テーブルに保存
    const { data: contactData, error: contactError } = await supabase
      .from("contacts")
      .insert([
        {
          temple_id: reservationData.templeId,
          type: "reservation",
          date: reservationData.date,
          time: reservationData.times.join(", "),
          name: reservationData.name,
          email: reservationData.email,
          phone: reservationData.phone,
          address: reservationData.address,
          message: reservationData.message,
          status: "reserved", // 仮押さえ
        },
      ])
      .select();

    if (contactError) throw contactError;

    // console.log("✅ contacts テーブルに保存完了");

    // 2. availability テーブルを "reserved" に変更
    const timeColumnMap = {
      "09:00": "time_09",
      "10:00": "time_10",
      "11:00": "time_11",
      "12:00": "time_12",
      "13:00": "time_13",
      "14:00": "time_14",
      "15:00": "time_15",
      "16:00": "time_16",
      "17:00": "time_17",
    };

    const { data: availData, error: availFetchError } = await supabase
      .from("availability")
      .select("*")
      .eq("temple_id", reservationData.templeId)
      .eq("date", reservationData.date);

    if (availFetchError) throw availFetchError;

    if (availData && availData.length > 0) {
      const record = availData[0];
      const updateData = {};

      reservationData.times.forEach((time) => {
        const timeColumn = timeColumnMap[time];
        if (timeColumn) {
          updateData[timeColumn] = "reserved";
        }
      });

      const { error: updateError } = await supabase
        .from("availability")
        .update(updateData)
        .eq("id", record.id);

      if (updateError) throw updateError;

      // console.log("availability テーブルを reserved に変更完了");
    }

    // 3. メール送信
    const emailResult = await sendReservationEmails({
      templeName: reservationData.templeName,
      date: formatDate(reservationData.date),
      times: reservationData.times.join(", "),
      name: reservationData.name,
      email: reservationData.email,
      phone: reservationData.phone,
      address: reservationData.address,
      message: reservationData.message,
      deadline: deadlineStr,
    });

    if (!emailResult.success) {
      console.warn(
        "⚠️ メール送信に失敗しましたが、予約は保存されました。: ",
        emailResult.error
      );
    }

    return {
      success: true,
      data: contactData[0],
      deadline: deadlineStr,
      message:
        "予約を仮押さえしました。確認メールをお送りしましたのでご確認ください。",
    };
  } catch (error) {
    console.error("❌ 予約作成エラー: ", error);
    return {
      success: false,
      error: error.message,
    };
  }
}

// 問い合わせを作成
export async function createInquiry(inquiryData) {
  try {
    const { data, error } = await supabase
      .from("contacts")
      .insert([
        {
          temple_id: inquiryData.templeId,
          type: "inquiry",
          name: inquiryData.name,
          email: inquiryData.email,
          phone: inquiryData.phone || null,
          message: inquiryData.message,
          status: "inquiry",
        },
      ])
      .select();

    if (error) throw error;
    
    // console.log("✅ contacts テーブルに保存完了（問い合わせ）");

    const emailResult = await sendInquiryEmails({
      templeName: inquiryData.templeName,
      name: inquiryData.name,
      email: inquiryData.email,
      phone: inquiryData.phone,
      message: inquiryData.message,
    });

    if (!emailResult.success) {
      console.warn(
        "⚠️ メール送信に失敗しましたが、問い合わせは保存されました。: ",
        emailResult.error
      );
    }

    return {
      success: true,
      data: data[0],
      message: "お問い合わせを送信しました。ご返信までお待ちください。",
    };
  } catch (error) {
    console.error("お問い合わせ作成のエラー: ", error);
    return {
      success: false,
      error: error.message,
    };
  }
}
