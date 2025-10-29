// @/lib/contacts.js

// 役割：データベースに保存して、メール送信を呼び出す。

import { supabase } from "./supabase";
import { sendReservationEmails } from "./email";
import { sendInquiryEmails } from "./email";

// 予約を作成する関数定義
export async function createReservation(reservationData) {
  try {
    // 1. 振込期限を計算する（3日後の23時59分59秒）
    const deadline = new Date();
    deadline.setDate(deadline.getDate() + 3);
    deadline.setHours(23, 59, 59);
    // 日付の形式を『0000年00月00日（曜日）』にフォーマットする関数の定義
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

    // 2. contacts テーブルに予約データを保存
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
          status: "reserved", // ← 仮押さえ
        },
      ])
      .select(); // ← 挿入したデータを取得

    if (contactError) throw contactError;

    // console.log("✅ contacts テーブルに保存完了");

    // 3. availabilityテーブルを更新する。
    //    選択された時間を "reserved" に変更する。
    // 時間とカラム名のマッピング
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
    // エラーがあったら即座に処理を中断して
    // catch ブロックでエラー処理をする。
    // 上の文章と一緒に書く定型文。
    if (availFetchError) throw availFetchError;

    // データが存在する場合、更新する。
    if (availData && availData.length > 0) {
      const record = availData[0];
      const updateData = {};
      // 選択された時間を "reserved" に変更する。
      reservationData.times.forEach((time) => {
        const timeColumn = timeColumnMap[time];
        if (timeColumn) {
          updateData[timeColumn] = "reserved";
        }
      });
      // 更新を実行
      const { error: updateError } = await supabase
        .from("availability")
        .update(updateData)
        .eq("id", record.id);

      if (updateError) throw updateError;

      // console.log("availability テーブルを reserved に変更完了");
    }

    // 4. メール送信
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
    // メール送信が失敗しても予約は成立させる。
    if (!emailResult.success) {
      console.warn(
        "⚠️ メール送信に失敗しましたが、予約は保存されました。: ",
        emailResult.error
      );
    }
    // 5. 成功を返す
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
