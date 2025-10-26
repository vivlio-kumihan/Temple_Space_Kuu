// @/lib/availability.js

import { supabase } from "./supabase";

/**
 * 指定した寺院の予約可能状況を取得
 */
export async function getAvailability(templeId) {
  try {
    const { data, error } = await supabase
      .from("availability")
      .select("*")
      .eq("temple_id", templeId) // temple_idでフィルター
      .order("date", { ascending: true }); // 日付順に並び替え

    if (error) throw error;

    return data || [];
  } catch (error) {
    console.error("予約可能状況の取得エラー: ", error);
    return [];
  }
}

/**
 * 複数の時間枠を予約
 */
export async function createBooking(templeId, date, timeSlots) {
  try {
    // 時間枠とカラム名のマッピング
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

    // 該当するレコードを検索
    const { data: existingData, error: fetchError } = await supabase
      .from("availabilty")
      .select("*")
      .eq("temple_id", templeId)
      .eq("date", date);

    if (fetchError) throw fetchError;

    // データが見つからない場合
    if (!existingData || existingData.length === 0) {
      return {
        success: false,
        error: "該当する日付が見つかりません。",
      };
    }

    const record = existingData[0];

    // 選択された時間枠がすべて予約可能かチェック
    for (const time of timeSlots) {
      const timeColumn = timeColumnMap[time];
      if (!timeColumn) {
        return {
          success: false,
          error: `無効な時間です: ${time}`,
        };
      }
      if (record[timeColumn] === "booked") {
        return {
          success: false,
          error: `${time}は既に予約されています。`,
        };
      }
    }

    // すべての時間枠を 'booked' に変更
    const updateData = {};
    timeSlots.forEach((time) => {
      const timeColumn = timeColumnMap[time];
      updateData[timeColumn] = "booked";
    });

    const { error: updateError } = await supabase
      .from("availability")
      .update(updateData)
      .eq("id", record.id)
    
    if (updateError) throw updateError;

    return {
      success: true,
      message: "予約が完了しました。",
    }
  } catch (error) {
    console.error("予約エラー:", error);
    return {
      success: false,
      error: error.message,
    };
  }
}